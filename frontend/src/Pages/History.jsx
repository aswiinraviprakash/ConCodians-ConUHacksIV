import React, {useEffect, useState} from 'react';
import Table from "../components/Table";
import {getHistory} from "../Services/axios";
import {Box, Button} from "@mui/material";
import {Link} from "react-router-dom";

// for projecting the history of the data
function History() {
    const columns = [
        {
            field: 'filename',
            headerName: 'File Name',
            flex: 2,
            align: 'center',
            headerAlign: 'center',
            headerClassName: 'custom-header',
            renderCell: (params) => (
                <span style={{ fontWeight: 'bold', color: '#1976d2' }}>{params.value || 'N/A'}</span>
            ),
        },
        {
            field: 'fire_count',
            headerName: 'Fire Count',
            flex: 2,
            align: 'center',
            headerAlign: 'center',
            headerClassName: 'custom-header',
            renderCell: (params) => (
                <span style={{ color: '#4caf50' }}>{params.value || 0}</span>
            ),
        },
        {
            field: 'op_cost',
            headerName: 'Operational Cost',
            flex: 2,
            align: 'center',
            headerAlign: 'center',
            headerClassName: 'custom-header',
            renderCell: (params) => (
                <span style={{ color: '#f44336' }}>${params.value || '0'}</span>
            ),
        },
        {
            field: 'low_severity',
            headerName: 'Low Severity',
            flex: 2,
            align: 'center',
            headerAlign: 'center',
            headerClassName: 'custom-header',
            renderCell: (params) => (
                <span style={{ color: '#ffa726' }}>{params.value || 0}</span>
            ),
        },
        {
            field: 'med_severity',
            headerName: 'Medium Severity',
            flex: 2,
            align: 'center',
            headerAlign: 'center',
            headerClassName: 'custom-header',
            renderCell: (params) => (
                <span style={{ color: '#fbc02d' }}>{params.value || 0}</span>
            ),
        },
        {
            field: 'high_severity',
            headerName: 'High Severity',
            flex: 2,
            align: 'center',
            headerAlign: 'center',
            headerClassName: 'custom-header',
            renderCell: (params) => (
                <span style={{ color: '#d32f2f' }}>{params.value || 0}</span>
            ),
        },
        {
            field: 'damage_cost',
            headerName: 'Damage Cost',
            flex: 2,
            align: 'center',
            headerAlign: 'center',
            headerClassName: 'custom-header',
            renderCell: (params) => (
                <span style={{ color: '#1976d2' }}>${params.value || '0'}</span>
            ),
        },
        {
            field: 'delayed_fire_count',
            headerName: 'Delayed Fire Count',
            flex: 2,
            align: 'center',
            headerAlign: 'center',
            headerClassName: 'custom-header',
            renderCell: (params) => (
                <span style={{ fontWeight: 'bold', color: '#9c27b0' }}>{params.value || 0}</span>
            ),
        },
        {
            field: 'd_low_severity',
            headerName: 'Delayed Low Severity',
            flex: 2,
            align: 'center',
            headerAlign: 'center',
            headerClassName: 'custom-header',
            renderCell: (params) => (
                <span style={{ color: '#8e24aa' }}>{params.value || 0}</span>
            ),
        },
        {
            field: 'd_med_severity',
            headerName: 'Delayed Medium Severity',
            flex: 2,
            align: 'center',
            headerAlign: 'center',
            headerClassName: 'custom-header',
            renderCell: (params) => (
                <span style={{ color: '#d81b60' }}>{params.value || 0}</span>
            ),
        },
        {
            field: 'd_high_severity',
            headerName: 'Delayed High Severity',
            flex: 2,
            align: 'center',
            headerAlign: 'center',
            headerClassName: 'custom-header',
            renderCell: (params) => (
                <span style={{ color: '#c2185b' }}>{params.value || 0}</span>
            ),
        },
    ];

// for setting the rows required in history page
    const [rows, setRows] = useState( []);
    useEffect(() => {
        getHistory().then((res) => {

            setRows(res);
            console.log(res);
        })
    }, [])
    return (
        <div>
            <Table columns={columns} rows={rows} />
            <Box sx={{
            textAlign: 'center',
        }}>
            <Button variant="contained" component={Link} to="/">
                Back
            </Button>
        </Box>
        </div>
    );
}

export default History;