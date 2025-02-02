import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {createTheme} from "@mui/material";
import Home from "./components/home";
import Navbar from "./components/Navbar";
import History from "./Pages/History";
import Prediction from "./Pages/Prediction";

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
        //handling navigation to different pages
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navbar/>} >
                    <Route index element={<Home />} />
                    <Route path="history" element={<History/>} />
                    <Route path="prediction" element={<Prediction/>} />
                    <Route path="*" element={<div>404 Not Found</div>}/>
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default Router;