import axios from 'axios';

// Function to fetch train locations from the DigiTraffic API
const fetchTrainLocations = async () => {
    try {
        const response = await axios.get('https://rata.digitraffic.fi/api/v1/train-locations.geojson/latest');
        console.log('Train data fetched successfully:');
        return response.data; // Return the GeoJSON data
    } catch (error) {
        console.error('Error fetching train data:', error);
        throw error; // Throw the error to handle it in the calling function
    }
};

export default fetchTrainLocations;