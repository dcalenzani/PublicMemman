'use client'
import Hamburguer from '@/app/components/HamburguerMenu';
import Table from '@/app/components/Table';
import React, { useState, useEffect } from 'react';

const AsistenciaForm = () => {
    type Member = {
        dni: string;
        nombre: string;
        email: string;
        tel: string;
        ingreso: string;
        vencimiento: string;
    };

    const [members, setMembers] = useState<Member[]>([]);
    const [users_id, setUsersId] = useState('');    
    const [entry_date, setEntryDate] = useState('');
    const [id, setId] = useState(null);
    const [fullname, setFullname] = useState(null);
    const [tel, setTel] = useState(null);
    const [end_date, setEndDate] = useState('');
    const [urlParams, setUrlParams] = useState('');


    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const idParam = urlParams.get('users_id');
        if (idParam) {
            fetch('/api/users/memberships?users_id=' + idParam)
            .then(response => response.json())
            .then(data => {
                setMembers(data.members);
            })
            .catch(error => console.error('Error:', error));
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const dateForm = {
            users_id: members[0].dni,
            entry_date: entry_date,
        };
    
        const urlParams = new URLSearchParams(dateForm).toString();
    
        try {
            const userResponse = await fetch(`/api/users/memberships/new?${urlParams}`);
            window.location.href = '/Dashboard/Membresias';
        } catch (error) {
            console.error('Error:', error);
        }   
    };

    return (
        <div>
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
            <div className='flex-col flex my-32 mx-4'>
                <h1 className='mb-3'>Matriculas y membresias</h1>
                {members.map((member) => (
                    <form key={member.dni} onSubmit={handleSubmit} className='flex flex-col space-y-2 space-x-1 my-8 [&>label]:grid [&>label]:grid-cols-2 [&>label]:bg-slate-700 [&>input]:text-slate-950'>
                        <label>
                            <input type="text" value={member.dni} className='text-slate-950' readOnly /> DNI
                        </label>
                        <br />
                        <label>
                            <input type="text" value={member.nombre} className='text-slate-950' readOnly /> Nombre
                        </label>
                        <br />
                        <label>
                            <input type="text" value={member.tel} className='text-slate-950' readOnly /> Telefono
                        </label>
                        <br />
                        <label>
                        <input type="date" value={entry_date} onChange={(e) => setEntryDate(e.target.value)} className='text-slate-950' /> Ingreso
                        </label>
                        <br />
                        <label>
                            <input type="date" value={end_date} onChange={(e) => setEndDate(e.target.value)} className='text-slate-950' /> Vencimiento
                        </label>
                        <br />
                        <button type="submit" className='bg-yellow-300 text-slate-900 p-2 rounded-md'>Submit</button>
                    </form>
                ))}
            </div>
        </div>
    );
};

export default AsistenciaForm;