import React, {useEffect, useState} from 'react';
import Map from "../components/Map";
import {Box} from "@mui/material";
import Table from "../components/Table";
import UploadFile from "../components/UploadFile";
import {trainModel} from "../Services/axios";


//analyzing the data and predicting the future fire reports
function Prediction() {
    const [data, setData] = useState([]);
    const [locs, setLocs] = useState([])
    const [resultDisplay, setResultDisplay] = useState(false);
    const [arr, setArr] = useState([])

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            headerClassName: 'custom-header',
            renderCell: (params) => <span>{params.value}</span>,
        },
        {
            field: 'latitude',
            headerName: 'Latitude',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            headerClassName: 'custom-header',
            renderCell: (params) => (
                <span style={{ color: '#FF5722' }}>
        {params.value || 'N/A'}
      </span>
            ),
        },
        {
            field: 'longitude',
            headerName: 'Longitude',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            headerClassName: 'custom-header',
            renderCell: (params) => (
                <span style={{ color: '#03A9F4' }}>
        {params.value || 'N/A'}
      </span>
            ),
        },
        {
            field: 'timestamp',
            headerName: 'Timestamp',
            flex: 2,
            align: 'center',
            headerAlign: 'center',
            headerClassName: 'custom-header',
            renderCell: (params) => (
                <span style={{ color: '#8BC34A' }}>
        {params.value || 'N/A'}
      </span>
            ),
        },
        {
            field: 'temperature',
            headerName: 'Temperature (°C)',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            headerClassName: 'custom-header',
            renderCell: (params) => (
                <span style={{ color: '#FF9800' }}>
        {params.value || 'N/A'}
      </span>
            ),
        },
        {
            field: 'humidity',
            headerName: 'Humidity (%)',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            headerClassName: 'custom-header',
            renderCell: (params) => (
                <span style={{ color: '#2196F3' }}>
        {params.value || 'N/A'}
      </span>
            ),
        },
        {
            field: 'wind_speed',
            headerName: 'Wind Speed (km/h)',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            headerClassName: 'custom-header',
            renderCell: (params) => (
                <span style={{ color: '#4CAF50' }}>
        {params.value || 'N/A'}
      </span>
            ),
        },
        {
            field: 'precipitation',
            headerName: 'Precipitation (mm)',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            headerClassName: 'custom-header',
            renderCell: (params) => (
                <span style={{ color: '#9C27B0' }}>
        {params.value || 'N/A'}
      </span>
            ),
        },
        {
            field: 'vegetation_index',
            headerName: 'Vegetation Index',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            headerClassName: 'custom-header',
            renderCell: (params) => (
                <span style={{ color: '#E91E63' }}>
        {params.value || 'N/A'}
      </span>
            ),
        },
        {
            field: 'human_activity_index',
            headerName: 'Human Activity Index',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            headerClassName: 'custom-header',
            renderCell: (params) => (
                <span style={{ color: '#607D8B' }}>
        {params.value || 'N/A'}
      </span>
            ),
        },
    ];



useEffect(() => {

const locs = data && data.latitude && data.longitude
    ? Object.keys(data.latitude).map((key, index) => ({
        id: index + 1,
        position: [data.latitude[key], data.longitude[key]],
        popup: `Marker ${index + 1}`
    }))
    : [];
    setLocs(locs)
    if(data!=null && data.latitude!=null && data.longitude!=null){
    setArr(Object.keys(data.latitude).map((key) => ({
        id: Number(key), // Convert string key to a number
        latitude: data.latitude[key],
        longitude: data.longitude[key],
        temperature: data.temperature ? data.temperature[key] : null,
        humidity: data.humidity ? data.humidity[key] : null,
        wind_speed: data.wind_speed ? data.wind_speed[key] : null,
        precipitation: data.precipitation ? data.precipitation[key] : null,
        vegetation_index: data.vegetation_index ? data.vegetation_index[key] : null,
        human_activity_index: data.human_activity_index ? data.human_activity_index[key] : null,
        timestamp: data.timestamp ? data.timestamp[key] : null
    })))
    }

}, [data]);

const handleUpload = async (selectedFile) => {
    try {
        const response = await trainModel(selectedFile);
        if (response.status === 200) {
            if (response.data && response.data.latitude && response.data.longitude) {
                setData(response.data);
                console.log(data);
                console.log(response);
                setResultDisplay(true);
            } else {
                console.error("Invalid data structure:", response.data);
            }
        } else {
            console.error("Upload failed with status:", response.status);
        }
    } catch (error) {
        console.error("Error uploading file:", error);
    }
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
                    {/* displaying the map */}
                    <Map markers={locs} />
                </Box>
                {arr?
                // displaying the table
                    <Box sx={{}}>
                        <Table columns={columns} rows={arr} />
                    </Box>
                    : ""
                }

                    
            
                

            </Box>


        </Box>
    );
}

export default Prediction;
