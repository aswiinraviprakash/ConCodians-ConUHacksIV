import React from 'react';
import {Box, Button, Card, CardContent, Stack, TextField, Typography} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {Outlet} from "react-router-dom";

function Navbar(props) {
    return (
        <Box sx={{
            p: 3,
            maxWidth: 1200,
            mx: 'auto'
        }}>

            {/* Title and Upload Section */}
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    Quebec Fire
                </Typography>
            </Box>
                <Outlet/>
        </Box>
    );
}

export default Navbar;