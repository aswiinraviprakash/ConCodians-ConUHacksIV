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
        const locs = Object.entries(data).map(([id, { latitude, longitude }], index) => ({
            id: index + 1,
            position: [latitude, longitude],
            popup: `Marker ${index + 1}`
        }));
        setLocs(locs);
    }, [data])
    const handleUpload = async (selectedFile) => {
       
        const response = await trainModel(selectedFile);
        console.log(response);
        if(response.status === 200){
            setData(response);
            setResultDisplay(true);
            //alert
          }else{
            //alert
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
                    <Map markers={locs} />
                </Box>
                
                    <Box sx={{}}>
                        <Table columns={columns} rows={data} />
                    </Box>
                    
            
                

            </Box>


        </Box>
    );
}

export default Prediction;
