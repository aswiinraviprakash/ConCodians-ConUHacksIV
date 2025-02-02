import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import {Box} from "@mui/material"; // Import useState for managing pagination

const columns = [
    { field: 'id', headerName: 'ID', flex: 1, align: "center", headerAlign: "center",
        headerClassName: 'custom-header', },
    { field: 'firstName', headerName: 'First name', flex: 2,align: "center", headerAlign: "center",    headerClassName: 'custom-header',   },
    { field: 'lastName', headerName: 'Last name', flex: 2, align: "center", headerAlign: "center",
        headerClassName: 'custom-header',  },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        flex: 1,
        align: "center", headerAlign: "center",
        headerClassName: 'custom-header',
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        flex: 3,
        align: "center", headerAlign: "center",
        headerClassName: 'custom-header',
        valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function Table() {
    // Define state for pagination
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });

    // Handle page and page size changes
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
                    }
                    }}
            />
        </Paper>
        </Box>
    );
}
