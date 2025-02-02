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
            headerAlign: 'center',
            align: 'center',
            headerClassName: 'custom-header',
            renderCell: (params) => (
                <span style={{ fontWeight: 'bold', color: '#1976d2' }}>
                {params.value}
            </span>
            )
        },
        {
            field: 'latitude',
            headerName: 'Latitude',
            flex: 2,
            headerAlign: 'center',
            align: 'center',
            headerClassName: 'custom-header',
            renderCell: (params) => (
                <span style={{ color: '#4caf50' }}>
                {params.value}
            </span>
            )
        },
        {
            field: 'longitude',
            headerName: 'Longitude',
            flex: 2,
            headerAlign: 'center',
            align: 'center',
            headerClassName: 'custom-header',
            renderCell: (params) => (
                <span style={{ color: '#f44336' }}>
                {params.value}
            </span>
            )
        }
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
