'use client'
import Hamburguer from '@/app/components/HamburguerMenu';
import React, {useState, useEffect} from 'react';
import Table from '@/app/components/Table';
import { Modal, Snackbar } from '@mui/material';
import { AlertCircle } from 'react-feather';

const MembersPage: React.FC = () => {
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

    const handleModal = (id: string | null) => {
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
                <a href='./Pagos'>
                    <p>Pagos</p>
                </a>
                <a href='../'>
                    <p>Salir</p>
                </a>
            </Hamburguer>
            <div className='w-screen h-screen'>
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
                        id='dni'
                        title='Profesores'
                        endpoint='/api/teacher'
                        dataKey='teachers'
                        className='w-screen'
                        onIdSelected={handleIdSelected}
                        deleteClick={handleDelete}
                        newElementClick={() => window.location.replace('./Profesores/Nuevos')}
                        OnRowDoubleClick={handleModal}
                    />
                    <Modal
                        open={Boolean(selectedId)}
                        onClose={() => setSelectedId(null)}
                        aria-labelledby='modal-modal-title'
                        aria-describedby='modal-modal-description'
                    >
                        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-lg w-1/2">
                            <p className='text-zinc-900'>Modulo en construccion</p>
                        </div>
                    </Modal>
                    <div className='flex flex-row'>
                        <a href='./Profesores/Nuevos' className='bg-yellow-300 mx-2 p-2 rounded-md text-slate-900 '>Nuevo ingreso</a>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default MembersPage;
