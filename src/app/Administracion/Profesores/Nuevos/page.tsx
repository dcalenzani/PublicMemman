"use client"
import React, { useEffect, useRef, useState } from 'react';
import Hamburguer from '@/app/components/HamburguerMenu';

const PersonalDataForm = () => {

    type UserForm = {
        fullname: string;
        email: string;
        phone: string;
        birth_date: string;
        id: string;
        roles_id: number;
    };
    
    type TeachForm = {
        users_id: string;
        payment_method: string;
    };

    interface PaymentMethodType {
        id: string;
        descr: string;
    }

    const [feedbackUser, setFeedbackUser] = useState('');
    const [feedbackPayment, setFeedbackPayment] = useState('');
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethodType[]>([]);

    useEffect(() => {
        fetch('/api/payment_method')
            .then(response => response.json())
            .then(data => {
                console.log('Payment methods data:', data.payment_method);
                setPaymentMethods(data.payment_method);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    const [userForm, setUserForm] = useState<UserForm>({
        fullname: '',
        email: '',
        phone: '',
        birth_date: '',
        id: '',
        roles_id: 4,
    });
     
    const [teachForm, setTeacherForm] = useState<TeachForm>({
        users_id: '',
        payment_method: '',
    }); 

    const [fullname, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [birthdate, setbirthDate] = useState('');
    const [id, setId] = useState('');

    const [users_id, setTeacherId] = useState('');
    const [payment_method, setselectedPay] = useState('');

    const handleSubmitTeacher = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const userForm:UserForm = {
            fullname: fullname,
            email: email,
            phone: phone,
            birth_date: birthdate,
            id: id,
            roles_id: 3,
        };

        setUserForm(userForm);
        
        const teachForm: TeachForm = {
            users_id: userForm.id,
            payment_method: payment_method,
        };

        setTeacherForm(teachForm);

        const fillUserUrlParams = (userForm: any) => {
            const urlParentParams = new URLSearchParams(userForm).toString();
            return urlParentParams;
        };

        try {
            const urlParentParams = fillUserUrlParams(userForm);
            const userResponse = await fetch(`/api/users/new?${urlParentParams}`);
            if (userResponse.status === 200) {
                setFeedbackUser('Usuario creado correctamente');
            } else {
                setFeedbackUser('Error al crear usuario');
            }
            console.log(userResponse);
        } catch (error) {
            console.error('Error:', error);
        }

        const fillTeacherUrlParams = (teachForm: any) => {
            const urlTeacherParams = new URLSearchParams(teachForm).toString();
            return urlTeacherParams;
        };

        try {
            const urlTeacherParams = fillTeacherUrlParams(teachForm);
            const TeacherResponse = await fetch(`/api/teacher/new?${urlTeacherParams}`);
            if (TeacherResponse.status === 200) {
                setFeedbackPayment('Medio de pago ingresado correctamente');
            } else {
                setFeedbackPayment('Error al ingresar el medio de pago');
            }
            console.log(TeacherResponse);
        } catch (error) {
            console.error('Error:', error);
        }

        window.location.href = '/Administracion/Profesores';
    };

    console.log(userForm);
    console.log(teachForm);

    return (
        <><div className='w-screen h-screen '>
            <div className='fixed flex flex-col justify-center items-center space-y-10 h-full'>
                <h1 className='mb-3'>Registro del Profesor</h1>
                <form onSubmit={handleSubmitTeacher} className='flex flex-col space-y-2 space-x-1 [&>label]:grid [&>label]:grid-cols-2 [&>label]:bg-slate-700 [&>input]:text-slate-950 [&>label]:px-2 md:mt-4 mx-4'>
                    <label>
                        Nombre:
                        <input type="text" value={fullname} onChange={(e) => setName(e.target.value)} className='text-slate-950' required/>
                    </label>
                    <br />
                    <label>
                        Email:
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='text-slate-950' required/>
                    </label>
                    <br />
                    <label>
                        Telef:
                        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className='text-slate-950' required/>
                    </label>
                    <br />
                    <label>
                        Fecha de Nac:
                        <input type="date" value={birthdate} onChange={(e) => setbirthDate(e.target.value)} className='text-slate-950' required/>
                    </label>
                    <br />
                    <label>
                        DNI:
                        <input type="text" value={id} onChange={(e) => setId(e.target.value)} className='text-slate-950' required/>
                    </label>
                    <br />
                    <label>
                        Medio de Pago:
                        <select value={payment_method} onChange={(e) => setselectedPay(e.target.value)} className='text-slate-950'>
                            <option value="">Seleccione un medio de pago</option>
                            {paymentMethods.map((method: PaymentMethodType) => (
                                <option key={method.descr} value={method.id}>{method.descr}</option>
                            ))}
                        </select>
                    </label>
                    <br />
                    <button type="submit" className='bg-yellow-300 text-slate-900 p-2 rounded-sm mb-10'>Submit</button>
                </form>
                <p>{feedbackUser}</p>
                <p>{feedbackPayment}</p>
            </div>
                <Hamburguer>
                <a href='../Membresias'>
                    <p>Membresias y Clases</p>
                </a>
                <a href='../Programa'>
                    <p>Programacion y Asistencia</p>
                </a>
                <a href='./'>
                    <p>Profesores</p>
                </a>
                <a href="../Pagos">
                    <p>Pagos</p>
                </a>
                <a href="../../">
                    <p>Salir</p>
                </a>
            </Hamburguer>
        </div>
        </>
    );
    };

    export default PersonalDataForm;
