'use client'

import Hamburguer from '@/app/components/HamburguerMenu';
import React, { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';

const Reportes: React.FC = () => {

    const currentMonth = new Date().getMonth();
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);

    const months = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('es', { month: 'short' }));

    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(Number(event.target.value));
    };

    const handleReportDownload = async () => {
        const response = await fetch('/api/reports/');
        const data = await response.json();

        if (!data.report || data.report.length === 0) {
            console.error('No data received from API');
            return;
        }

        const replacer = (key: any, value: null) => value === null ? '' : value;
        const header = Object.keys(data.report[0]);
        const csv = [
            header.join(','),
            ...data.report.map((row: { [x: string]: any; }) => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
        ].join('\r\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const date = new Date();
        const month = selectedMonth;
        const year = date.getFullYear();

        const link = document.createElement('a');
        link.href = url;
        // Include the selected month and year in the filename
        link.download = `report_${month < 10 ? '0' + month : month}_${year}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleUserDownload = async () => {
        const response = await fetch('/api/users/');
        const data = await response.json();

        if (!data.members || data.members.length === 0) {
            console.error('No data received from API');
            return;
        }

        // Convert JSON data to CSV data
        const replacer = (key: any, value: null) => value === null ? '' : value;
        const header = Object.keys(data.members[0]);
        const csv = [
            header.join(','),
            ...data.members.map((row: { [x: string]: any; }) => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
        ].join('\r\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'users.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className=''>
            <Hamburguer>
            <a href='./Membresias'>
                <p>Membresias y Clases</p>
            </a>
            <a href='./Programa'>
                <p>Programacion y Asistencia</p>
            </a>
            <a href='./Profesores'>
                <p>Profesores</p>
            </a>
            <a href="./Pagos">
                <p>Pagos</p>
            </a>
            <a href="../">
                <p>Salir</p>
            </a>
            </Hamburguer>
            <div className="h-screen w-screen">
                <div className='flex flex-col space-y-10 h-full w-full justify-center items-center'>
                    <div id="month selection" className='space-x-2 '>
                        <p>Descargar Reporte del último Mes*</p>
                        <select value={selectedMonth} onChange={handleMonthChange} className='text-zinc-950' disabled>
                            {months.map((month, index) => (
                                <option key={index + 1} value={index + 1}>
                                    {month}
                                </option>
                            ))}
                        </select>
                        <button className='bg-yellow-300 text-slate-950 p-3 rounded-md' onClick={handleReportDownload}>Descargar</button>
                        <p className='font-italic text-sm opacity-70'>*Pronto agregaremos selección para meses previos</p>
                    </div>
                    <div>
                        <p>Descargar tabla de usuarios</p>
                        <button className='bg-yellow-300 text-slate-950 p-3 rounded-md' onClick={handleUserDownload}>Descargar</button>
                    </div>
                </div>
                    
            </div>
        </div>
    );
}

export default Reportes;