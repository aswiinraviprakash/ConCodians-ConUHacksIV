import React from 'react';
import Map from "../components/Map";
import {Box} from "@mui/material";
import Table from "../components/Table";

function Prediction({markers}) {
    return (
        <Box sx={{
        }}>
            <Box sx={{
                mx: "auto",
            }}>
                <Map markers={markers} />
            </Box>
{/*<Box sx={{}}>*/}
{/*    <Table/>*/}
{/*</Box>*/}

        </Box>
    );
}

export default Prediction;
