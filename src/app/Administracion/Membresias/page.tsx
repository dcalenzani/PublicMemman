'use client'
import Hamburguer from '@/app/components/HamburguerMenu';
import React, {useState, useEffect} from 'react';
import Table from '@/app/components/Table';
import ClickableTable from '@/app/components/ClickableTable';
import { Snackbar } from '@mui/material';
import { AlertCircle } from 'react-feather';

const MembersPage: React.FC = () => {
    interface RowDataType {
        nombre: string;
        email: string;
        tel: number;
        ingreso: string;
        vencimiento: string;
        dni: number
    }

    const [selectedRowData, setSelectedRowData] = useState<RowDataType | null> (null);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [feedback, setFeedback] = useState('');

    const handleIdSelected = (id: string | null) => {
        setSelectedId(id);
    };

    const handleDelete = async (selectedId: string | null) => {
        try {
            const response = await fetch(`/api/users/delete?id=${selectedId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Error deleting data');
            }
            setFeedback('Miembro eliminado correctamente');
        } catch (error) {
            console.error('Error deleting data:', error);
            setFeedback('Error al borrar miembro');
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
                <div className='flex flex-col text-center py-32 items-center space-y-20 mb-20'>
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
                    <Table
                    endpoint='/api/users?roles_id=1'
                    dataKey='members'
                    className='w-screen'
                    id='dni'
                    title='Membresias'
                    onIdSelected={handleIdSelected}
                    deleteClick={handleDelete}
                    newElementClick={() => window.location.replace('./Membresias/NuevosMan')}
                    OnRowDoubleClick={() => window.location.replace(`./Membresias/Usuario?id=${selectedId}`)}
                    />
                    <div className='flex flex-row'>
                        <a href='./Membresias/Nuevos' className=' bg-yellow-300 m-2 p-2 rounded-md text-slate-900'>Deslinde de Responsabilidades</a>
                        <a href='./Membresias/NuevosMan' className=' bg-yellow-300 m-2 p-2 rounded-md text-slate-900'>Ingreso de Miembros</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MembersPage;
