'use client'

import ClickableTable from '@/app/components/ClickableTable';
import Hamburguer from '@/app/components/HamburguerMenu';
import Table from '@/app/components/Table';
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
        alumnos: string;
    }

    interface RowData {
        id: string;
    }

    const today = new Date();
    const [value, onChange] = useState<Value>(today);
    const formattedDate = value instanceof Date ? value.toISOString().split('T')[0] : '';

    const [selectedRowData, setSelectedRowData] = useState<RowDataType | null> (null);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const handleLessonsId = (id: string | null) => {
        setSelectedId(id);
    };

    const handleEventsId = (id: string | null) => {
        setSelectedId(id);
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
            <div className='flex flex-col text-center py-32 items-center space-y-10'>
                <Calendar onChange={onChange} value={value} locale="es-ES" className="text-slate-900 text-2xl"/>
                <p>{value instanceof Date ? value.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : ''}</p>
                <div className='flex flex-row space-x-4'>
                    <a href="./Programa/NuevaClase" className='bg-yellow-300 text-slate-950 p-3 rounded-md'>Nueva Clase</a>
                    <a 
                    href={`./Programa/NuevoEvento`} 
                    className='bg-yellow-300 text-slate-950 p-3 rounded-md'>
                        Nuevo Evento
                    </a>
                </div>
                <div className='w-screen space-y-2'>
                <div className='flex flex-row justify-between w-screen border p-2'>
                        <p className='text-2xl font-bold'>CLASES</p>
                        <a 
                            href={`./Programa/NuevaAsistencia?id=${(selectedId)}`} 
                            className='bg-yellow-300 text-slate-950 p-3 rounded-md'>
                                Nueva Asistencia
                        </a>
                    </div>
                <Table
                className='bg-white'
                endpoint={`/api/lessons?date=${formattedDate}`}
                dataKey='lessons'
                id='id'
                onIdSelected={handleLessonsId}/>
                </div>

                <div className='w-screen space-y-2'>
                    <div className='flex flex-row justify-between w-screen border p-2'>
                        <p className='text-2xl font-bold'>EVENTOS</p>
                        <a 
                            href={`./Programa/NuevoProfesor?id=${(selectedId)}`} 
                            className='bg-yellow-300 text-slate-950 p-3 rounded-md'>
                                Ingresar Profesor
                        </a>
                    </div>
                <Table
                className='bg-white'
                endpoint={`/api/events?event_date=${formattedDate}`}
                dataKey='special_event'
                id='id'
                onIdSelected={handleEventsId}/>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Programa;
