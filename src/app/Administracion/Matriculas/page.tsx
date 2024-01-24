"use client"
import React, { useEffect, useState } from 'react';
import Hamburguer from '@/app/components/HamburguerMenu';

const MembershipForm = () => {

    type MembershipForm = {
        users_id: string;
        product_id: string;
        entry_date: string;
        end_date: string;
    };

    const [urlParams, setUrlParams] = useState('');
    const [feedback, setFeedback] = useState('');
    const [EntryDate, setEntryDate] = useState('');
    const [EndDate, setEndDate] = useState('');
    const [student_id, setStudent] = useState('');
    const [students, setStudents] = useState({members: []});
    const [options_id, setOptionsId] = useState('');
    const [options, setOptions] = useState({product: []});

    const [membershipForm, setMembershipForm] = useState<MembershipForm>({
        users_id: '',
        product_id: '',
        entry_date: '',
        end_date: '',
    });

    useEffect(() => {
        fetch('/api/users?roles_id=1')
            .then(response => response.json())
            .then(data => setStudents(data))
            .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
        fetch('/api/products')
            .then(response => response.json())
            .then(data => setOptions(data))
            .catch(error => console.error('Error:', error));
    }, []);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const membershipData: MembershipForm = {
            users_id: student_id,
            product_id: options_id,
            entry_date: EntryDate,
            end_date: EndDate
        };

        setMembershipForm(membershipData);

        const fillUserUrlParams = (membershipData: any) => {
            const urlMembershipParams = new URLSearchParams({
                users_id: membershipData.users_id,
                product_id: membershipData.product_id,
                entry_date: membershipData.entry_date,
                end_date: membershipData.end_date,
            }).toString();
            return urlMembershipParams;
        };
        try {
            const urlParams = fillUserUrlParams(membershipData);
            const response = await fetch('/api/users/memberships/new?' + urlParams);
            setUrlParams(urlParams);
            if (response.ok) {
                setFeedback('Ingreso correcto');
            } else {
                setFeedback('Ingreso fallido');
            }
        }
        catch (error) {
            console.error('Error:', error);
        }
        console.log(membershipData);
    };

    return (
        <div className='w-screen h-screen'>
            <div className='fixed flex flex-col justify-center items-center space-y-10 h-full mx-4'>
            <h1 className='mb-3'>Registro de matriculas</h1>
            <form onSubmit={handleSubmit} className='flex flex-col space-y-2 space-x-1 [&>label]:grid [&>label]:grid-cols-2 [&>label]:bg-slate-700 [&>input]:text-slate-950'>              
                 <label>
                    Miembro:
                    <select value={student_id} onChange={(e) => setStudent(e.target.value)} className='text-slate-950'>
                        <option value="">Seleccione un miembro</option>
                        {students.members.map((student: any) => (
                            <option key={student.dni} value={student.dni}>{student.nombre}</option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Tipo de servicio:
                    <select value={options_id} onChange={(e) => setOptionsId(e.target.value)} className='text-slate-950'>
                        <option value="">Seleccione un servicio</option>
                        {options.product.map((option: any) => (
                            <option key={option.id} value={option.id}>{option.descr}</option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Fecha de inicio:
                    <input type="date" value={EntryDate} onChange={(e) => setEntryDate(e.target.value)} className='text-slate-950' />
                </label>
                <br />
                <label>
                    Fecha de fin:
                    <input type="date" value={EndDate} onChange={(e) => setEndDate(e.target.value)} className='text-slate-950' />
                </label>
                <br />
                <button type="submit" className='bg-yellow-300 text-slate-900 p-2 rounded-sm'>Submit</button>
            </form>
            <p>{feedback}</p>
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

export default MembershipForm;