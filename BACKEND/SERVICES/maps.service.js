const axios = require('axios');
const captainModel = require('../MODELS/captain.model');

module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.LOCATIONIQ_API_KEY || 'pk.235105163404bb7ad5bfd7cfce013b7c';
    const searchQuery = address.toLowerCase().includes('india') ? address : `${address}, West Bengal, India`;
    const url = `https://us1.locationiq.com/v1/search?key=${apiKey}&q=${encodeURIComponent(searchQuery)}&format=json&limit=1&countrycodes=in`;

    try {
        const response = await axios.get(url);

        if (response.data && response.data.length > 0) {
            const location = response.data[0];
            return {
                ltd: parseFloat(location.lat),
                lng: parseFloat(location.lon)
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            throw new Error('Coordinate not found');
        }
        throw error;
    }
};


module.exports.getDistanceAndTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.LOCATIONIQ_API_KEY || 'pk.235105163404bb7ad5bfd7cfce013b7c';

    try {
        const originCoords = await module.exports.getAddressCoordinate(origin);
        const destCoords = await module.exports.getAddressCoordinate(destination);

        try {
            const url = `https://us1.locationiq.com/v1/directions/driving/${originCoords.lng},${originCoords.ltd};${destCoords.lng},${destCoords.ltd}?key=${apiKey}`;
            const response = await axios.get(url);

            if (response.data && response.data.routes && response.data.routes.length > 0) {
                const route = response.data.routes[0];
                const distanceKm = (route.distance / 1000).toFixed(1) + ' km';
                const durationMin = Math.round(route.duration / 60) + ' mins';
                return {
                    distance: {
                        text: distanceKm,
                        value: route.distance
                    },
                    duration: {
                        text: durationMin,
                        value: route.duration
                    }
                };
            }
        } catch (dirError) {
            console.warn('LocationIQ Directions API warning:', dirError.response?.data || dirError.message);
        }

        // Fallback: Haversine distance formula if Directions API is restricted or rate-limited
        const R = 6371;
        const dLat = (destCoords.ltd - originCoords.ltd) * Math.PI / 180;
        const dLon = (destCoords.lng - originCoords.lng) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(originCoords.ltd * Math.PI / 180) * Math.cos(destCoords.ltd * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const straightKm = R * c;
        const estimatedMeters = Math.round(straightKm * 1.3 * 1000);
        const estimatedSeconds = Math.round((estimatedMeters / 1000) / 30 * 3600);

        return {
            distance: {
                text: (estimatedMeters / 1000).toFixed(1) + ' km',
                value: estimatedMeters
            },
            duration: {
                text: Math.round(estimatedSeconds / 60) + ' mins',
                value: estimatedSeconds
            }
        };
    } catch (error) {
        console.error("Error in getDistanceAndTime:", error.response?.data || error.message || error);
        throw new Error('Unable to fetch distance and time');
    }
};

module.exports.getAutoSuggestions = async (input) => {
    if (!input) {
        throw new Error('Query input is required');
    }

    const apiKey = process.env.LOCATIONIQ_API_KEY || 'pk.235105163404bb7ad5bfd7cfce013b7c';
    const url = `https://us1.locationiq.com/v1/autocomplete?key=${apiKey}&q=${encodeURIComponent(input)}&limit=5&format=json`;

    try {
        const response = await axios.get(url);
        if (response.data && Array.isArray(response.data)) {
            return response.data.map(item => item.display_name);
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
};

module.exports.getcaptainsInRadius = async (ltd, lng, radius) => {
    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[lng, ltd], radius / 6371]
            }
        }
    });
    return captains;
}