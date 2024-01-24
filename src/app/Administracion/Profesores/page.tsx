'use client'
import Hamburguer from '@/app/components/HamburguerMenu';
import React, {useState, useEffect} from 'react';
import Table from '@/app/components/Table';

const MembersPage: React.FC = () => {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const handleIdSelected = (id: string | null) => {
        setSelectedId(id);
    };

    return (
        <div className='w-screen h-screen flex'>

            <div className='fixed flex flex-col justify-center items-center space-y-10 h-full'>
                <div>
                    <h1 className='text-3xl bg-zinc-800 p-3'>Profesores</h1>
                    <div className='container-box'>
                        <Table id='dni' endpoint='/api/teacher' dataKey='teachers' className='w-screen' onIdSelected={handleIdSelected} />
                    </div>
                </div>
                <div className='flex flex-row'>
                    {/*
                    <a 
                    href={`/Administracion/Profesores/Actualizar?id=${selectedId}`} 
                    className='bg-yellow-300 m-2 p-2 rounded-md text-slate-900'>
                    Actualizar ingreso
                    </a>
                    */}
                    <a href='./Profesores/Nuevos' className='bg-yellow-300 m-2 p-2 rounded-md text-slate-900'>Nuevo ingreso</a>
                </div>
            </div>
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
        </div>
    );
};

export default MembersPage;
