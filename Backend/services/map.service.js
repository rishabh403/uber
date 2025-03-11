const axios = require('axios');
const captainModel = require('../models/captain');


module.exports.getAddressCoordinate = async(address)=>{
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[ 0 ].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

/* module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {

            if (response.data.rows[ 0 ].elements[ 0 ].status === 'ZERO_RESULTS') {
                throw new Error('No routes found');
            }

            return response.data.rows[ 0 ].elements[ 0 ];
        } else {
            throw new Error('Unable to fetch distance and time');
        }

    } catch (err) {
        console.error(err);
        throw err;
    }
} */

    module.exports.getDistanceTime = async (origin, destination) => {
        if (!origin || !destination) {
            throw new Error('Origin and destination are required');
        }
        const apiKey = process.env.GOOGLE_MAPS_API;
        const url = "https://routes.googleapis.com/directions/v2:computeRoutes";
        const data={
            origin:{
                address:origin
            },
            destination:{
                address:destination
            }
        }
        try {
            const response = await axios.post(url,data,{
                headers: {
                    'X-Goog-Api-Key': process.env.GOOGLE_MAPS_API,
                    'X-Goog-FieldMask': 'routes.distanceMeters,routes.duration',
                    'Content-Type': 'application/json'
                }});
             if (response.status === 200) {
                if (response.data.routes.length === 0) {
                    throw new Error('No routes found');
                }
                return response.data.routes[ 0 ];
            } else {
                throw new Error('Unable to fetch distance and time');
            }
        } catch (err) {
            //console.error(err.response.data ?? err.message)
            //console.error(err);
            //console.log("Error fetching route:", err.data);
            console.log("Error fetching route:",  err.response.data.error);
            throw err;
        } 
    }



/* module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('query is required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions.map(prediction => prediction.description).filter(value => value);
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
} */

    module.exports.getAutoCompleteSuggestions = async (input) => {
        if (!input) {
            throw new Error("Query is required.");
        }
        const apiKey = process.env.GOOGLE_MAPS_API;
        if (!apiKey) {
            throw new Error("GOOGLE_MAPS_API key is missing in environment variables.");
        }
    
        const url = `https://places.googleapis.com/v1/places:autocomplete`;
        const data={
            input:input
        }

        
        try {
            const response = await axios.post(url,data,{
                headers: {
                    'X-Goog-Api-Key': process.env.GOOGLE_MAPS_API,
                    'X-Goog-FieldMask': 'suggestions.placePrediction.text',
                    'Content-Type' : 'application/json'
                }});
    
            if (response.status !== 200) {
                console.error("Google API Error:", response.data);
                throw new Error(`Google API Error: ${response.data.status}`);
            }

            const sugges=response.data.suggestions;
            return sugges.map(sugges => sugges.placePrediction.text.text);
    
        } catch (err) {
            console.error("Error fetching autocomplete suggestions:", err.response?.data || err.message);
            throw new Error("Failed to fetch location suggestions. Please try again later.");
        }
    };

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {
    // radius in km
    const captains = await captainModel.find({
        /* location: {
            $geoWithin: {
                $centerSphere: [ [ ltd, lng ], radius / 6371 ]
            }
        } */
    });
    return captains;
}