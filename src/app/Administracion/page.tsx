import React from 'react';
import Hamburguer from '../components/HamburguerMenu';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const DashboardPage: React.FC = () => {
    return (
        <main>
        <div className="flex justify-center">
            <div className='flex justify-center text-center h-screen place-items-center'>
            <Calendar className=" text-slate-900 text-2xl"/>
            </div>
            <Hamburguer>
                <a href='Dashboard/Membresias'>
                    <p>Membresias y Clases</p>
                </a>
                <a href='Dashboard/Programa'>
                    <p>Programacion y Asistencia</p>
                </a>
                <a href='Dashboard/Profesores'>
                    <p>Profesores</p>
                </a>
                <a href="Dashboard/Pagos">
                    <p>Pagos</p>
                </a>
                <a href="../">
                    <p>Salir</p>
                </a>
            </Hamburguer>
            
        </div>
        </main>
    );
};

export default DashboardPage;
