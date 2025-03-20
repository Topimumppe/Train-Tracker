import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import fetchTrainLocations from './API.jsx'; // Import the fetch function
import './App.css'; // Import the CSS file

// Red and green icons for trains
delete L.Icon.Default.prototype._getIconUrl;
const GreenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

//Main function. Fetches train data every 10 seconds and renders the map with markers
const TrainMap = () => { 
    const [trains, setTrains] = useState([]);

    // Statistics state
    const [totalTrains, setTotalTrains] = useState(0);
    const [movingTrains, setMovingTrains] = useState(0);
    const [stoppedTrains, setStoppedTrains] = useState(0);

    useEffect(() => {
        const fetchTrains = async () => {
            try {
                const data = await fetchTrainLocations(); // Fetch train data
                if (data && data.type === 'FeatureCollection') {
                    setTrains(data.features); // Set train locations

                    // Set statistics
                    const total = data.features.length;
                    const moving = data.features.filter(train => train.properties.speed > 0).length;
                    const stopped = total - moving;

                    // Update statistics state
                    setTotalTrains(total);
                    setMovingTrains(moving);
                    setStoppedTrains(stopped);
                } else {
                    console.error('Invalid GeoJSON format:', data);
                    setTrains([]); // Set trains to an empty array
                }
            } catch (error) {
                console.error('Error fetching train data:', error);
                setTrains([]); // Set trains to an empty array
            }
        };
        fetchTrains();
        const interval = setInterval(fetchTrains, 10000); // Update every 10 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="container">
            {/* Header Section */}
            <div className="header">
                <h1>Train Tracker</h1>
                <h4>by Topi Heikkilä</h4>
                <p>Welcome to the Train Tracker website! Here you can see the real-time locations of trains in Finland, and some statistics about them.</p>
                <p>The map updates every 10 seconds.</p>
            </div>

            {/* Main Content */}
            <div className="main-content">
                {/* Statistics Panel */}
                <div className="statistics-panel">
                    <h2>Statistics currently</h2>
                    <div className="statistic">
                        <span className="statistic-label">Total Trains:</span>
                        <span className="statistic-value">{totalTrains}</span>
                    </div>
                    <div className="statistic">
                        <span className="statistic-label">Moving Trains</span>
                        <span className="statistic-value-green">{movingTrains}</span>
                    </div>
                    <div className="statistic">
                        <span className="statistic-label">Stopped Trains:</span>
                        <span className="statistic-value-red">{stoppedTrains}</span>
                    </div>
                </div>

                {/* Map Container */}
                <div className="map-container">
                    <MapContainer center={[60.1699, 24.9384]} zoom={10} style={{ height: '100%', width: '100%' }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        {Array.isArray(trains) && trains.map((train, index) => {
                            const [longitude, latitude] = train.geometry.coordinates; // train coordinates
                            const isStopped = train.properties.speed === 0;
                            return (
                                <Marker key={index} position={[latitude, longitude]} icon={isStopped ? redIcon : GreenIcon}> {/* Red icon for stopped trains */}
                                    <Popup>
                                        Train ID: {train.properties.trainNumber} <br />
                                        Speed: {train.properties.speed} km/h
                                    </Popup>
                                </Marker>
                            );
                        })}
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default TrainMap;