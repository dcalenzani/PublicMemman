'use client'
import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { Toolbar, Tooltip } from '@mui/material';
import { Trash2, Filter, Plus } from 'react-feather';

interface DataTableProps {
    className?: string;
    endpoint: string;
    dataKey: string;
    id: string;
    title: string;
    deleteClick: (id: string) => void;
    newElementClick: () => void;
    OnRowDoubleClick: (id: string | null) => void;
    onIdSelected: (id: string | null) => void;
}

const DataTable: React.FC<DataTableProps> = ({ className, endpoint, dataKey, id, title, deleteClick, newElementClick, OnRowDoubleClick, onIdSelected }) => {
    
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

    const handleDeleteClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        if (selectedId) {
            deleteClick(selectedId);
        }
    };

    const handleRowDoubleClick = (params: GridRowParams) => {
        if (selectedId) {
            OnRowDoubleClick(selectedId);
        }
    };

    return (
        <div style={{ height: 400, width: '100%' }}>
            <div className={`flex justify-between p-2 bg-zinc-900 py-4`}>
                <p className='text-2xl font-bold'>{`${title}`}</p>
                <div className='space-x-4'>
                    <Tooltip title="Ingresar">
                        <button
                            onClick={newElementClick}
                            >
                            <Plus/>
                        </button>
                    </Tooltip>   
                    <Tooltip title="Borrar">
                        <button onClick={handleDeleteClick} className="p-1">
                            <Trash2 />
                        </button>
                    </Tooltip>   
                </div>
            </div>
            <DataGrid
                rows={data.map((item) => ({ ...item, id: item[id] }))}
                columns={columns}
                className={`${className}`}
                onRowClick={handleRowClick}
                onRowDoubleClick={handleRowDoubleClick}
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