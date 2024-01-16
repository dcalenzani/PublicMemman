'use client'

import ClickableTable from '@/app/components/ClickableTable';
import Hamburguer from '@/app/components/HamburguerMenu';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];


const Programa: React.FC = () => {

    interface RowDataType {
        id: string;
        nombre: string;
        duracion: string;
        profesor: string;
    }

    interface RowData {
        id: string;
    }

    const today = new Date();
    const [value, onChange] = useState<Value>(today);
    const [selectedRowData, setSelectedRowData] = useState<RowData | null>(null);
    const formattedDate = value instanceof Date ? value.toISOString().split('T')[0] : '';

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
            <div className='flex flex-col text-center py-32 items-center space-y-10'>
                <Calendar onChange={onChange} value={value} locale="es-ES" className="text-slate-900 text-2xl"/>
                <p>{value instanceof Date ? value.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : ''}</p>
                
                <ClickableTable
                className='text-zinc-200'
                endpoint={`http://localhost:3000/api/lessons?date=${formattedDate}`}
                dataKey='lessons'
                onRowClick={(rowData: RowDataType | { [key: string]: any; }) => setSelectedRowData(rowData as RowDataType)}/>

                <div className='flex flex-row space-x-4'>
                    <a href="./Programa/NuevaClase" className='bg-yellow-300 text-slate-950 p-3 rounded-md'>Nueva Clase</a>
                    <a 
                    href={selectedRowData ? `./Programa/NuevaAsistencia?id=${(selectedRowData.id)}` : '#'} 
                    className='bg-yellow-300 text-slate-950 p-3 rounded-md'>
                        Nueva Asistencia
                    </a>
                </div>

            </div>
        </div>
        </div>
    );
};

export default Programa;
