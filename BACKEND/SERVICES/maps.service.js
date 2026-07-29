const axios = require('axios');

module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.LOCATIONIQ_API_KEY || 'pk.235105163404bb7ad5bfd7cfce013b7c';
    const url = `https://us1.locationiq.com/v1/search?key=${apiKey}&q=${encodeURIComponent(address)}&format=json&limit=1`;

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
        } else {
            throw new Error('Unable to fetch distance and time');
        }
    } catch (error) {
        console.error(error);
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