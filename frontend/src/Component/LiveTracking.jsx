import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LOCATIONIQ_KEY = import.meta.env.VITE_LOCATIONIQ_API_KEY || 'pk.235105163404bb7ad5bfd7cfce013b7c';

// Fix default Leaflet icon paths issue in Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom pulsing blue dot for live user position
const createUserDotIcon = () => {
  return L.divIcon({
    className: 'live-user-marker',
    html: `
      <div style="position: relative; width: 36px; height: 36px; display: flex; items-center: center; justify-content: center;">
        <div style="position: absolute; width: 36px; height: 36px; background-color: rgba(59, 130, 246, 0.35); border-radius: 50%; animation: pulse-ring 1.8s infinite ease-in-out;"></div>
        <div style="position: absolute; width: 20px; height: 20px; background-color: #2563eb; border: 3px solid #ffffff; border-radius: 50%; box-shadow: 0 4px 10px rgba(0,0,0,0.35); top: 8px; left: 8px;"></div>
        <div style="position: absolute; width: 6px; height: 6px; background-color: #ffffff; border-radius: 50%; top: 15px; left: 15px;"></div>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18]
  });
};

const LiveTracking = ({ height = "100%", className = "", showInfoCard = true, onLocationUpdate }) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const accuracyCircleRef = useRef(null);
  const isUserInteractingRef = useRef(false);
  const isFirstLocationRef = useRef(true);

  // Default fallback center: Kolkata, India (or general region)
  const [currentPosition, setCurrentPosition] = useState({ lat: 22.5726, lng: 88.3639 });
  const [locationName, setLocationName] = useState('Fetching current location address...');
  const [isTracking, setIsTracking] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [accuracy, setAccuracy] = useState(null);

  // Add custom keyframes style for pulse ring if missing
  useEffect(() => {
    const styleId = 'live-tracking-pulse-style';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `
        @keyframes pulse-ring {
          0% { transform: scale(0.6); opacity: 0.9; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .leaflet-container {
          width: 100%;
          height: 100%;
          z-index: 1;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Initialize map instance once
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [currentPosition.lat, currentPosition.lng],
      zoom: 15,
      zoomControl: false,
      doubleClickZoom: true,
      dragging: true,
      scrollWheelZoom: true,
      touchZoom: true
    });

    // Detect manual user movement (drag, double tap, zoom)
    map.on('dragstart zoomstart dblclick touchstart', () => {
      isUserInteractingRef.current = true;
    });

    // Add LocationIQ Street Tiles
    const tileLayerUrl = `https://{s}-tiles.locationiq.com/v3/streets/r/{z}/{x}/{y}.png?key=${LOCATIONIQ_KEY}`;
    
    L.tileLayer(tileLayerUrl, {
      maxZoom: 19,
      attribution: '&copy; <a href="https://locationiq.com">LocationIQ</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: ['a', 'b', 'c']
    }).addTo(map);

    // Zoom control on top-right
    L.control.zoom({ position: 'topright' }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Track Geolocation
  useEffect(() => {
    if (!navigator.geolocation) {
      setErrorMsg('Geolocation is not supported by your browser.');
      return;
    }

    setIsTracking(true);

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude, accuracy: acc } = pos.coords;
        const newPos = { lat: latitude, lng: longitude };
        
        setCurrentPosition(newPos);
        setAccuracy(acc);
        setErrorMsg(null);

        if (mapInstanceRef.current) {
          const map = mapInstanceRef.current;

          // Update marker position
          if (!markerRef.current) {
            markerRef.current = L.marker([latitude, longitude], {
              icon: createUserDotIcon()
            }).addTo(map);
          } else {
            markerRef.current.setLatLng([latitude, longitude]);
          }

          // Update accuracy circle
          if (!accuracyCircleRef.current) {
            accuracyCircleRef.current = L.circle([latitude, longitude], {
              radius: acc || 20,
              color: '#3b82f6',
              fillColor: '#60a5fa',
              fillOpacity: 0.15,
              weight: 1
            }).addTo(map);
          } else {
            accuracyCircleRef.current.setLatLng([latitude, longitude]);
            if (acc) accuracyCircleRef.current.setRadius(acc);
          }

          // Pan to current position if user hasn't manually moved the map or on initial fix
          if (isFirstLocationRef.current || !isUserInteractingRef.current) {
            map.panTo([latitude, longitude], { animate: true, duration: 1 });
            isFirstLocationRef.current = false;
          }
        }
      },
      (err) => {
        console.warn('Geolocation tracking error:', err.message);
        setErrorMsg('Location permission denied or unavailable. Showing estimated area.');
        setIsTracking(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  // Reverse Geocoding with LocationIQ
  useEffect(() => {
    if (!currentPosition?.lat || !currentPosition?.lng) return;

    let isMounted = true;
    const fetchAddress = async () => {
      try {
        const url = `https://us1.locationiq.com/v1/reverse?key=${LOCATIONIQ_KEY}&lat=${currentPosition.lat}&lon=${currentPosition.lng}&format=json`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            const resolvedAddress = data.display_name || 'Current Location';
            setLocationName(resolvedAddress);
            if (onLocationUpdate) {
              onLocationUpdate({ lat: currentPosition.lat, lng: currentPosition.lng, address: resolvedAddress });
            }
          }
        } else {
          if (isMounted) {
            const fallbackAddr = `Lat: ${currentPosition.lat.toFixed(4)}, Lng: ${currentPosition.lng.toFixed(4)}`;
            setLocationName(fallbackAddr);
            if (onLocationUpdate) {
              onLocationUpdate({ lat: currentPosition.lat, lng: currentPosition.lng, address: fallbackAddr });
            }
          }
        }
      } catch (err) {
        if (isMounted) {
          const fallbackAddr = `Lat: ${currentPosition.lat.toFixed(4)}, Lng: ${currentPosition.lng.toFixed(4)}`;
          setLocationName(fallbackAddr);
          if (onLocationUpdate) {
            onLocationUpdate({ lat: currentPosition.lat, lng: currentPosition.lng, address: fallbackAddr });
          }
        }
      }
    };

    fetchAddress();

    return () => {
      isMounted = false;
    };
  }, [currentPosition?.lat, currentPosition?.lng]);

  const handleCenterOnUser = () => {
    isUserInteractingRef.current = false;
    if (mapInstanceRef.current && currentPosition) {
      mapInstanceRef.current.flyTo([currentPosition.lat, currentPosition.lng], 16, {
        animate: true,
        duration: 1.2
      });
    }
  };

  return (
    <div className={`relative w-full overflow-hidden ${className}`} style={{ height }}>
      {/* Map Container */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Floating Status Badge */}
      <div className="absolute top-4 left-4 z-1000 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md border border-gray-200 text-xs font-semibold text-gray-800">
        <span className={`w-2.5 h-2.5 rounded-full ${isTracking ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
        <span>{isTracking ? 'LocationIQ Live Tracking' : 'Offline / Standby'}</span>
      </div>

      {/* Floating Center On Me Button */}
      {/* <button
        onClick={handleCenterOnUser}
        title="Center on my location"
        className="absolute bottom-20 right-4 z-[1000] bg-white hover:bg-gray-50 active:scale-95 text-gray-800 p-3 rounded-full shadow-lg border border-gray-200 transition-all flex items-center justify-center"
      >
        <i className="ri-crosshair-2-line text-xl text-blue-600"></i>
      </button> */}

      {/* Location Info Card Overlay */}
      {showInfoCard && (
        <div className="absolute bottom-4 left-4 right-4 z-1000 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-gray-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <i className="ri-map-pin-2-fill text-lg"></i>
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Your Current Location</p>
              <p className="text-sm font-semibold text-gray-900 truncate">
                {locationName}
              </p>
            </div>
          </div>
          {accuracy && (
            <span className="shrink-0 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md border border-blue-100">
              ±{Math.round(accuracy)}m
            </span>
          )}
        </div>
      )}

      {/* Permission Warning Overlay */}
      {errorMsg && (
        <div className="absolute top-16 left-4 right-4 z-1000 bg-amber-50 border border-amber-200 text-amber-800 px-3.5 py-2.5 rounded-xl text-xs flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <i className="ri-alert-line text-amber-600 text-base shrink-0"></i>
            <span>{errorMsg}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveTracking;

