import React, {useEffect, useState} from 'react';
import Map from "../components/Map";
import {Box} from "@mui/material";
import Table from "../components/Table";
import UploadFile from "../components/UploadFile";
import {submitFile, trainModel} from "../Services/axios";



function Prediction() {
    const [data, setData] = useState([]);
    const [locs, setLocs] = useState([])
    const [resultDisplay, setResultDisplay] = useState(false);
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'latitude',
            headerName: 'Latitude',
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'longitude',
            headerName: 'Longitude',
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'timestamp',
            headerName: 'Timestamp',
            flex: 2,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'temperature',
            headerName: 'Temperature (°C)',
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'humidity',
            headerName: 'Humidity (%)',
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'wind_speed',
            headerName: 'Wind Speed (km/h)',
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'precipitation',
            headerName: 'Precipitation (mm)',
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'vegetation_index',
            headerName: 'Vegetation Index',
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'human_activity_index',
            headerName: 'Human Activity Index',
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
    ];


    useEffect(() => {
        const locs = Object.entries(data).map(([id, { latitude, longitude }], index) => ({
            id: index + 1,
            position: [latitude, longitude],
            popup: `Marker ${index + 1}`
        }));
        setLocs(locs);
    }, [data])
    const handleUpload = async () => {
        // if (selectedFile) {
        //     console.log('Uploading file:', selectedFile);
        //     const response = await submitFile(selectedFile);
        //     if(response.status === 200){
        //         setCardDisplay(true);
        //         setData(response.data);
        //
        //         //alert
        //     }else{
        //         //alert
        //     }
        // }
        const res = await trainModel();
        console.log(res);
        setData(res);
        setResultDisplay(true);
    };
    return (
        <Box sx={{
        }}>
            <Box sx={{
                display: resultDisplay? "none" : "",
            }}>
                <UploadFile  onUpload={handleUpload} />
            </Box>
            <Box sx={{
                display: resultDisplay ? "" : "none",
            }}>
                <Box sx={{
                    mx: "auto",
                }}>
                    <Map markers={locs} />
                </Box>
                {data !== []?
                    <Box sx={{}}>
                        <Table columns={columns} rows={data} />
                    </Box>
                    :
                    ""
                }

            </Box>


        </Box>
    );
}

export default Prediction;
