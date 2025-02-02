import React, {useEffect} from 'react';
import {MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet';
import { Paper, Box } from '@mui/material';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';
import {map} from "leaflet/src/map";

const defaultIcon = new L.Icon({
    iconUrl: require('leaflet/dist/images/marker-icon.png'), // Path to the icon image
    iconSize: [25, 41], // Size of the icon
    iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
    popupAnchor: [1, -34], // Point from which the popup should open
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'), // Path to the shadow image
    shadowSize: [41, 41], // Size of the shadow
});
const markers = [
    { id: 1, position: [44.4577,	-72.1008], popup: 'Marker 1' },
    { id: 2, position: [45.8966,	-73.4473], popup: 'Marker 2' },
    { id: 3, position: [44.7425,	-72.3944], popup: 'Marker 3' },
];

const markerPositions = markers.map((marker) => marker.position);

const FitBounds = () => {
    const map = useMap();

    useEffect(() => {
        const bounds = L.latLngBounds(markerPositions);
        map.fitBounds(bounds);
    }, [map, markerPositions]);

    return null;
};
const Map = () => {

    const position1 = [44.4577, -72.1008];
    const position2 = [45.8966, -73.4473];
    const zoomLevel = 13;

    return (
        <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
            <Box sx={{ height: '400px' }}>
                <MapContainer center={position1} zoom={zoomLevel} style={{ height: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {markers.map((marker) => (
                        <Marker key={marker.id} position={marker.position} icon={defaultIcon}>
                            <Popup>{marker.popup}</Popup>
                        </Marker>
                    ))}
                    <FitBounds />
                </MapContainer>
            </Box>
        </Paper>
    );
};

export default Map;
