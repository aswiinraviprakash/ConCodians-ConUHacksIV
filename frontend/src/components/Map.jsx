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

const FitBounds = ({ markerPositions }) => {
    const map = useMap();

    useEffect(() => {
        if (markerPositions && markerPositions.length > 0) {
            const validPositions = markerPositions.filter((pos) =>
                Array.isArray(pos) && pos.length === 2 && !isNaN(pos[0]) && !isNaN(pos[1])
            );

            if (validPositions.length > 0) {
                const bounds = L.latLngBounds(validPositions);
                map.fitBounds(bounds);
            } else {
                console.error('Invalid marker positions');
            }
        }
    }, [map, markerPositions]);

    return null;
};

const Map = ({markers}) => {


    const markerPositions = markers.map((marker) => marker.position);

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
                    <FitBounds markerPositions={markerPositions}/>
                </MapContainer>
            </Box>
        </Paper>
    );
};

export default Map;
