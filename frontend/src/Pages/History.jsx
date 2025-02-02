import React, {useEffect, useState} from 'react';
import Table from "../components/Table";
import {getHistory} from "../Services/axios";

function History() {
    const columns = [
        { field: 'filename', headerName: 'File Name', flex: 2, align: 'center', headerAlign: 'center', headerClassName: 'custom-header' },
        { field: 'fire_count', headerName: 'Fire Count', flex: 2, align: 'center', headerAlign: 'center', headerClassName: 'custom-header' },
        { field: 'op_cost', headerName: 'Operational Cost', flex: 2, align: 'center', headerAlign: 'center', headerClassName: 'custom-header' },
        { field: 'low_severity', headerName: 'Low Severity', flex: 2, align: 'center', headerAlign: 'center', headerClassName: 'custom-header' },
        { field: 'med_severity', headerName: 'Medium Severity', flex: 2, align: 'center', headerAlign: 'center', headerClassName: 'custom-header' },
        { field: 'high_severity', headerName: 'High Severity', flex: 2, align: 'center', headerAlign: 'center', headerClassName: 'custom-header' },
        { field: 'damage_cost', headerName: 'Damage Cost', flex: 2, align: 'center', headerAlign: 'center', headerClassName: 'custom-header' },
        { field: 'delayed_fire_count', headerName: 'Delayed Fire Count', flex: 2, align: 'center', headerAlign: 'center', headerClassName: 'custom-header' },
        { field: 'd_low_severity', headerName: 'Delayed Low Severity', flex: 2, align: 'center', headerAlign: 'center', headerClassName: 'custom-header', },
        { field: 'd_med_severity', headerName: 'Delayed Medium Severity', flex: 2, align: 'center', headerAlign: 'center', headerClassName: 'custom-header' },
        { field: 'd_high_severity', headerName: 'Delayed High Severity', flex: 2, align: 'center', headerAlign: 'center', headerClassName: 'custom-header' },
    ];

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
        </div>
    );
}

export default History;