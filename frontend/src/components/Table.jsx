import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import {Box} from "@mui/material";


export default function Table({columns, rows}) {

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });


    const handlePaginationChange = (newPaginationModel) => {
        setPaginationModel(newPaginationModel);
    };

    return (

        <Box sx={{ my: 10, textAlign: 'center' }}>
        <Paper sx={{ height: "50%", width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pagination
                paginationModel={paginationModel} // Controlled pagination
                onPaginationModelChange={handlePaginationChange} // Handle pagination changes
                pageSizeOptions={[5, 10]} // Page size options
                sx={{ border: 0,
                    '.custom-header': {
                        fontFamily: 'Arial, sans-serif',
                        fontWeight: 'bold',
                        fontSize: '18px',
                        wordWrap: 'break-word !important',
                    }
                    }}
            />
        </Paper>
        </Box>
    );
}
