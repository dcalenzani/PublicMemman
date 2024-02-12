'use client'

import Hamburguer from '@/app/components/HamburguerMenu';
import Table from '@/app/components/Table';
import { Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { AlertCircle } from 'react-feather';

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
    /* This was created with github copilot. I actually like that it involves every language in the project. Dunno, fun  */
    const [value, setValue] = useState<Value>(new Date());
    const [isClient, setIsClient] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [selectedRowData, setSelectedRowData] = useState<RowDataType | null> (null);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    
    useEffect(() => {
        setIsClient(true);
        const storedDate = window.localStorage.getItem('selectedDate');
        setValue(storedDate ? new Date(storedDate) : new Date());
    }, []);

    useEffect(() => {
        if (isClient) {
            window.localStorage.setItem('selectedDate', value instanceof Date ? value.toISOString() : '');
        }
    }, [value, isClient]);

    if (!isClient) {
        return null;
    }
    
    const formattedDate = value instanceof Date ? value.toISOString().split('T')[0] : '';

    const handleId = (id: string | null) => {
        setSelectedId(id);
    };

    const handleEventsId = (id: string | null) => {
        setSelectedId(id);
    };

    const handleDelete = async (selectedId: string | null) => {
        try {
            const response = await fetch(`/api/lessons/delete?id=${selectedId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Error deleting data');
            }
            setFeedback('Clase eliminada correctamente');
        } catch (error) {
            console.error('Error deleting data:', error);
            setFeedback('Error al borrar clase');
        } finally {
            setTimeout(() => {
                location.reload();
            }, 1000);
        }
    };

    const handleEventDelete = async (selectedId: string | null) => {
        try {
            const response = await fetch(`/api/events/delete?id=${selectedId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Error deleting data');
            }
            setFeedback('Evento eliminado correctamente');
        } catch (error) {
            console.error('Error deleting data:', error);
            setFeedback('Error al borrar evento');
        } finally {
            setTimeout(() => {
                location.reload();
            }, 1000);
        }
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
                <div className='flex flex-col text-center py-32 items-center space-y-10 mb-20'>
                    <Calendar onChange={setValue} value={value} locale="es-ES" className="text-slate-900 text-2xl"/>
                    <p>{value instanceof Date ? value.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : ''}</p>
                    <div className='flex flex-row space-x-4'>
                        <a href="./Programa/NuevaClase" className='bg-yellow-300 text-slate-950 p-3 rounded-md'>
                            Nueva Clase
                        </a>
                        <a 
                        href={`./Programa/NuevoEvento`} 
                        className='bg-yellow-300 text-slate-950 p-3 rounded-md'>
                            Nuevo Evento
                        </a>
                    </div>
                    <Snackbar 
                    open={Boolean(feedback)}
                    autoHideDuration={6000}
                    onClose={() => setFeedback('')}
                    className='bg-zinc-700 font-semibold rounded-md px-5 py-3'
                    >
                        <div className='flex flex-row space-x-5'>
                            <p className='whitespace-pre-wrap'>Sic: {feedback}    |</p>
                            <AlertCircle/>
                        </div>
                    </Snackbar>
                    <div className='relative flex flex-col space-y-10'>
                        <div className='w-screen my-10'>
                            <Table
                            className=''
                            endpoint={`/api/lessons?date=${formattedDate}`}
                            dataKey='lessons'
                            id='id'
                            title='Clases'
                            onIdSelected={handleId}
                            deleteClick={handleDelete}
                            newElementClick={() => window.location.replace('./Programa/NuevaClase')}
                            OnRowDoubleClick={() => window.location.replace(`./Programa/NuevaAsistencia?id=${selectedId}`)}
                            />
                        </div>

                        <div className='w-screen my-10'>
                            <Table
                            className=''
                            endpoint={`/api/events?event_date=${formattedDate}`}
                            dataKey='special_event'
                            id='id'
                            title='Eventos'
                            onIdSelected={handleEventsId}
                            deleteClick={handleEventDelete}
                            newElementClick={() => window.location.replace('./Programa/NuevoEvento')}
                            OnRowDoubleClick={() => window.location.replace(`./Programa/NuevoProfesor?id=${selectedId}`)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Programa;
