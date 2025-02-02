import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material";
import Home from "./components/home";
import Map from "./components/Map";

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
    typography: {
        h4: {
            fontWeight: 600,
        },
        h6: {
            color: 'rgba(0, 0, 0, 0.7)',
        },
    },
});

const locs = [
    { id: 1, position: [45.8966, -73.4473], popup: 'Marker 1' },
    { id: 2, position: [44.4577, -72.1008], popup: 'Marker 2' },
    { id: 3, position: [51.525, -0.11], popup: 'Marker 3' },
];
function Router(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="map" element={<Map markers={locs}/>} />
                <Route path="*" element={<div>404 Not Found</div>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;