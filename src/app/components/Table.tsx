'use client'
import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';

interface DataTableProps {
    className?: string;
    endpoint: string;
    dataKey: string;
    id: string;
    onIdSelected: (id: string | null) => void;
}

const DataTable: React.FC<DataTableProps> = ({ className, endpoint, dataKey, id, onIdSelected }) => {
    const [data, setData] = useState<{ [key: string]: any }[]>([]);
    const [columns, setColumns] = useState<GridColDef[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(endpoint);
                const responseData = await response.json();
                const dataArray = responseData[dataKey];
                setData(dataArray);
                if (dataArray && dataArray.length > 0) {
                    const columnDefs = Object.keys(dataArray[0]).map((column) => ({
                        field: column,
                        headerName: column,
                        flex: 1,
                    }));
                    setColumns(columnDefs);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [endpoint, dataKey]);


    const handleRowClick = (params: GridRowParams) => {
        setSelectedId(params.id as string);
        onIdSelected(params.id as string);
    };

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={data.map((item) => ({ ...item, id: item[id] }))}
                columns={columns}
                className={`${className}`}
                onRowClick={handleRowClick}
                sx={{
                    backgroundColor: "#0d0c0d",
                    '& .MuiDataGrid-footerContainer': {
                        color: 'black',
                        backgroundColor: 'rgb(253 224 71)',
                    },
                    '& .MuiDataGrid-main': {
                        color: "white",
                    },
                    '& .MuiDataGrid-columnHeader': {
                        fontWeight: 700,
                        backgroundColor: 'rgb(253 224 71)',
                        color: '#262527',
                    },
                    '& .MuiDataGrid-row:hover': {
                        backgroundColor: '#282528',
                    },
                }}
            />
        </div>
    );
};

export default DataTable;