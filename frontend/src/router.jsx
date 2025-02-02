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

function Router(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="map" element={<Map/>} />
                <Route path="*" element={<div>404 Not Found</div>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;