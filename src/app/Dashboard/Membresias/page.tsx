import Hamburguer from '@/app/components/HamburguerMenu';
import React, {useState, useEffect} from 'react';
import Table from '@/app/components/Table';

const MembersPage: React.FC = () => {

    return (
        <div className='w-screen h-screen'>

            <div className="flex flex-col justify-center items-center space-y-10 h-full my-10">
                <div className=''>
                    <h1 className='text-3xl bg-zinc-800 p-3'>Membresias</h1>
                    <div className="container-box">
                        <Table endpoint='/api/users?roles_id=2' dataKey='members'/>
                    </div>
                </div>

                <div className=''>
                    <h1 className="text-3xl bg-zinc-800 p-3">Alumnos</h1>
                    <div className="container-box">
                        <Table endpoint='/api/users?roles_id=1' dataKey='members'/>
                    </div>
                </div>
                <a href='./Membresias/Nuevos' className=' bg-yellow-300 m-2 p-2 rounded-md text-slate-900'>Nuevo ingreso</a>
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
