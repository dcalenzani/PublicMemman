"use client"
import React, { useState } from 'react';
import Hamburguer from '@/app/components/HamburguerMenu';

const PayForm = () => {
    const [dni, setDni] = useState('');
    const [PayOption, setPayOption] = useState('');
    const [ServiceOption, setServiceOption] = useState('');
    const [Amount, setAmount] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = {
            DNI: dni,
            PayForm: PayOption,
            Servicio: ServiceOption,
            Monto: Amount
        };
        console.log(JSON.stringify(formData));
        console.log('Formulario enviado');
    };

    return (
        <div className='w-screen h-screen'>
            <div className='fixed flex flex-col justify-center items-center space-y-10 h-full mx-4'>
            <h1 className='mb-3'>Registro de pagos</h1>
            <form onSubmit={handleSubmit} className='flex flex-col space-y-2 space-x-1 [&>label]:grid [&>label]:grid-cols-2 [&>label]:bg-slate-700 [&>input]:text-slate-950'>              
                <label>
                    DNI:
                    <input type="text" value={dni} onChange={(e) => setDni(e.target.value)} className='text-slate-950'/>
                </label>
                <br />
                <label>
                    Opcion de pago:
                    <select value={PayOption} onChange={(e) => setPayOption(e.target.value)} className='text-slate-950'>
                        <option value="yape">Yape</option>
                        <option value="efectivo">Efectivo</option>
                        <option value="transferencia">Transferencia</option>
                        <option value="pos">POS</option>
                    </select>
                </label>
                <br />
                <label>
                    Tipo de servicio:
                    <select value={PayOption} onChange={(e) => setServiceOption(e.target.value)} className='text-slate-950'>
                        <option value="mensualidad">Mensualidad</option>
                        <option value="clases1">Clases 1 por semana</option>
                        <option value="clases2">Clases 2 por semana</option>
                        <option value="dia">Dia libre</option>
                        <option value="claseNino">Clase 1D niño</option>
                        <option value="claseAdulto">Clase 1D adulto</option>
                    </select>
                </label>
                <br />
                <label>
                    Monto cancelado:
                    <input type="number" onChange={(e) => setAmount(e.target.value)} className='text-slate-950'>
                    </input>
                </label>
                <br />
                <button type="submit" className='bg-yellow-300 text-slate-900 p-2 rounded-sm'>Submit</button>
            </form>
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

export default PayForm;