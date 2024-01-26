'use client'
import Hamburguer from '@/app/components/HamburguerMenu';
import React, {useState, useEffect} from 'react';
import Table from '@/app/components/Table';
import ClickableTable from '@/app/components/ClickableTable';

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

    const handleIdSelected = (id: string | null) => {
        setSelectedId(id);
    };

    return (
        <div className='w-screen h-screen'>
            <div className="flex flex-col justify-center items-center space-y-10 h-full my-10">
                <div className=''>
                    <div className='flex flex-row justify-between'>
                        <h1 className='text-3xl bg-zinc-800 p-3'>Membresias</h1>
                        {/* 
                        <a href={ `/Administracion/Membresias/Actualizar?users_id=${(selectedId)}`} className='bg-yellow-300 m-2 p-2 rounded-md text-slate-900'>Actualizar Miembro</a>
                        */}
                    </div>
                    <div className="container-box">
                        <Table endpoint='/api/users?roles_id=1' dataKey='members' className='bg-white w-screen' id='dni' onIdSelected={handleIdSelected}/>
                    </div>
                </div>

                <div className='flex flex-row [&>a]:mb-24 [&>a]:md:mb-2'>
                    <a href='./Membresias/Nuevos' className=' bg-yellow-300 m-2 p-2 rounded-md text-slate-900'>Nuevo ingreso</a>
                    <a href='./Membresias/NuevosMan' className=' bg-yellow-300 m-2 p-2 rounded-md text-slate-900'>Ingreso rápido</a>
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
                <a href="./Pagos">
                    <p>Pagos</p>
                </a>
                <a href="../">
                    <p>Salir</p>
                </a>
            </Hamburguer>
        </div>
    );
};

export default MembersPage;
