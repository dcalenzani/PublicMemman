'use client'

import React, { useEffect, useState } from 'react';

interface TableProps {
    className?: string;
    endpoint: string;
    dataKey: string;
    onRowClick?: (rowData: { [key: string]: any }) => void;
}

const Table: React.FC<TableProps> = ({ className, endpoint, dataKey, onRowClick })  => {
    
    const [data, setData] = useState<{ [key: string]: any }[]>([]);
    const [columns, setColumns] = useState<string[]>([]);
    const [selectedRow, setSelectedRow] = useState<number | null>(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(endpoint);
                const responseData = await response.json();
                const dataArray = responseData[dataKey];
                setData(dataArray);
                if (dataArray && dataArray.length > 0) {
                    setColumns(Object.keys(dataArray[0]));
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [endpoint, dataKey]);

    return (
        <table className={`w-screen text-center overflow-auto [&>thead]:bg-yellow-300 [&>thead]:text-slate-950 ${className}`}>
            <thead>
                <tr>
                {columns.map((column, index) => (
                        <th className="border border-black uppercase" key={index}>{column}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex} onClick={() => {
                        setSelectedRow(rowIndex);
                        onRowClick && onRowClick(row);
                    }}
                    className={rowIndex === selectedRow ? 'bg-zinc-200 text-slate-950' : ''}
                >
                    {columns.map((column, index) => (
                            <td className={`border border-white                            
                            ${rowIndex === selectedRow ? '' : 'bg-zinc-900'}`} key={index}>{row[column]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
