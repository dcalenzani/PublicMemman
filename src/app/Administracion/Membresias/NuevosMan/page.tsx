"use client"
import Hamburguer from '@/app/components/HamburguerMenu';
import React, { useRef, useState } from 'react';

const PersonalDataForm = () => {
 
    type FormData = {
        id: string;
        firstname: string;
        lastname: string;
        email: string;
        phone: string;
        birth_date: string;
        roles_id: number;
    };

    type KinshipFormData = {
        parent_id: string;
        users_id: string;
    };

    type EmergencyFormData = {
        fullname: string;
        phone: string;
        users_id: string;
    };

    const [formData, setFormData] = useState<FormData>({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        birth_date: '',
        id: '',
        roles_id: 1,
    });

    const [parentData, setparentFormData] = useState<FormData>({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        birth_date: '',
        id: '',
        roles_id: 2,
    });

    const [kinshipFormData, setkinshipFormData] = useState<KinshipFormData>({
        parent_id: parentData.id,
        users_id: formData.id,
    });

    const [emergencyFormData, setemergencyFormData] = useState<EmergencyFormData>({
        users_id: formData.id,
        fullname: '',
        phone: '',
    });

    const [feedbackUser, setFeedbackUser] = useState('');
    const [feedbackChildren, setFeedbackChildren] = useState('');

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [birthDate, setbirthDate] = useState('');
    const [id, setId] = useState('');

    const [parentName, setParentName] = useState('');
    const [parentLastName, setParentLastName] = useState('');
    const [parentEmail, setParentEmail] = useState(''); 
    const [parentPhone, setParentPhone] = useState('');
    const [parentBirthdate, setParentBirthdate] = useState('');
    const [parentId, setParentId] = useState('');
    
    const [emergencyName, setEmergencyName] = useState('');
    const [emergencyPhone, setEmergencyPhone] = useState('');

    const dialogUnder = useRef(null);

    const dialogOver = useRef(null);

    const isUnder18 = new Date(birthDate) > new Date(new Date().setFullYear(new Date().getFullYear() - 18));

    const isOver18 = new Date(birthDate) < new Date(new Date().setFullYear(new Date().getFullYear() - 18));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newFormData: FormData = {
            firstname: name,
            lastname: lastName,
            email: email,
            phone: phone,
            birth_date: birthDate,
            id: id,
            roles_id: 1,
        };

        setFormData(newFormData);

        const fillUrlParams = (formData: any) => {
            const urlParams = new URLSearchParams(formData).toString();
            return urlParams;
        };

        try {
            const urlParams = fillUrlParams(newFormData);
            const response = await fetch(`/api/users/new?${urlParams}`);
            if ( response.status === 200 ) {
                setFeedbackUser('Usuario creado correctamente');
            } else {
                setFeedbackUser('Error al crear usuario');
            }
            console.log(response);
        } catch (error) {
            console.error('Error:', error);
        }

    };

    console.log(formData);
    
    const handleSubmitParent = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const formDataParent = {
            firstname: parentName,
            lastname: parentLastName,
            email: parentEmail,
            phone: parentPhone,
            birth_date: parentBirthdate,
            id: parentId,
            roles_id: 2,
        };

        setparentFormData(formDataParent);
        
        const formDataKinship: KinshipFormData = {
            parent_id: parentId,
            users_id: formData.id,
        };

        setkinshipFormData(formDataKinship);

        const fillParentUrlParams = (formDataParent: any) => {
            const urlParentParams = new URLSearchParams(formDataParent).toString();
            return urlParentParams;
        };

        try {
            const urlParentParams = fillParentUrlParams(formDataParent);
            const parentResponse = await fetch(`/api/users/new?${urlParentParams}`);
            console.log(parentResponse);
            if ( parentResponse.status === 200 ) {
                setFeedbackChildren('Usuario creado correctamente');
            } else {
                setFeedbackChildren('Error al crear usuario');
            }
        } catch (error) {
            console.error('Error:', error);
        }

        const fillKinshipUrlParams = (formDataKinship: any) => {
            const urlKinshipParams = new URLSearchParams(formDataKinship).toString();
            return urlKinshipParams;
        };

        try {
            const urlKinshipParams = fillKinshipUrlParams(formDataKinship);
            const kinshipResponse = await fetch(`/api/kinship/new?${urlKinshipParams}`);
            if ( kinshipResponse.status === 200 ) {
                setFeedbackChildren('Usuario creado correctamente');
            } else {
                setFeedbackChildren('Error al crear usuario');
            }
            console.log(kinshipResponse);
        } catch (error) {
            console.error('Error:', error);
        }

        /*window.location.href = './NuevosMan/End';*/
    };

    console.log(parentData);
    console.log(kinshipFormData);

    const handleSubmitEmergency = async (e: React.FormEvent) => {
        e.preventDefault();

        const emergencyContactData: EmergencyFormData = {
            fullname: emergencyName,
            phone: emergencyPhone,
            users_id: formData.id,
        };

        setemergencyFormData(emergencyContactData);

        const fillUrlParams = (formData: any) => {
            const urlParams = new URLSearchParams(formData).toString();
            return urlParams;
        };

        try {
            const urlParams = fillUrlParams(emergencyContactData);
            const response = await fetch(`/api/emergency_contact/new?${urlParams}`);
            console.log(response);
        } catch (error) {
            console.error('Error:', error);
        }
        window.location.href = '/Programa/Membresias';
    };    

    console.log(emergencyFormData);

    return (
        <>
        <div className='mt-10 md:mt-32 mb-32 mx-4'>
            <div>
                <h1 className='mb-3'>Registro del Escalador</h1>
                <form onSubmit={handleSubmit} className='flex flex-col space-y-2 space-x-1 [&>label]:grid [&>label]:grid-cols-2 [&>label]:bg-slate-700 [&>input]:text-slate-950 [&>label]:px-2 md:mt-4 mx-4'>
                    <label>
                        Dni:
                        <input type="text" value={id} onChange={(e) => setId(e.target.value)} className='text-slate-950' required/>
                    </label>
                    <br />
                    <label>
                        Nombres:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='text-slate-950' required/>
                    </label>
                    <br />
                    <label>
                        Apellidos:
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className='text-slate-950' required/>
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
                        <input type="date" value={birthDate} onChange={(e) => setbirthDate(e.target.value)} className='text-slate-950' required/>
                    </label>
                    <br />
                    <button type="submit" className='bg-yellow-300 text-slate-900 p-2 rounded-sm mb-10'>Submit</button>
                </form>
                <p>Estado: {feedbackUser}</p>
            </div>
            {isUnder18 && (
                <div className='mt-10 p-3 rounded-sm bg-slate-800 backdrop-filter backdrop-blur-sm' ref={dialogUnder}>
                    <h2 className='bg-yellow-300 w-1/2 p-3 mb-3 text-slate-950'>Proporcione información adicional sobre el Apoderado</h2>
                    <div className='md:mt-4 mx-4 text-slate-200 '>
                        <h1 className='mb-3'>Información del Apoderado</h1>
                        <div />
                        <form onSubmit={handleSubmitParent} className='flex flex-col space-y-2 space-x-1 [&>label]:grid [&>label]:grid-cols-2 [&>label]:bg-slate-950 [&>label]:px-2 md:mt-4 mx-4'>
                            <label>
                                Dni:
                                <input type="text" value={parentId} onChange={(e) => setParentId(e.target.value)} className='text-slate-950' required/>
                            </label>
                            <br />
                            <label>
                                Nombres del Apoderado:
                                <input type="text" value={parentName} onChange={(e) => setParentName(e.target.value)} className='text-slate-950' required/>
                            </label>
                            <br />
                            <label>
                                Apellidos del Apoderado:
                                <input type="text" value={parentLastName} onChange={(e) => setParentLastName(e.target.value)} className='text-slate-950' required/>
                            </label>
                            <label>
                                Email:
                                <input type="email" value={parentEmail} onChange={(e) => setParentEmail(e.target.value)} className='text-slate-950' required/>
                            </label>
                            <br />
                            <label>
                                Telef:
                                <input type="tel" value={parentPhone} onChange={(e) => setParentPhone(e.target.value)} className='text-slate-950' required/>
                            </label>
                            <br />
                            <label>
                                Fecha de Nac:
                                <input type="date" value={parentBirthdate} onChange={(e) => setParentBirthdate(e.target.value)} className='text-slate-950' required/>
                            </label>
                            <br />
                            <button type="submit" className='bg-yellow-300 text-slate-900 p-2 rounded-sm' onClick={() => window.location.href = '/Administracion/Membresias'}>Submit</button>
                        </form>
                    </div>
                </div>
            )}
            {isOver18 && (
                <div className='mt-10 p-3 rounded-sm bg-slate-800 backdrop-filter backdrop-blur-sm' ref={dialogOver}>
                    <h2 className='bg-yellow-300 w-1/2 p-3 mb-3 text-slate-950'>Proporcione información del contacto de emergencia</h2>
                    <div className='md:mt-4 mx-4 text-slate-200'>
                        <h1 className='mb-3'>Información de Emergencia</h1>
                        <div />
                        <form onSubmit={handleSubmitEmergency} className='flex flex-col space-y-2 space-x-1 [&>label]:grid [&>label]:grid-cols-2 [&>label]:bg-slate-950 [&>label]:px-2 [&>input]:text-slate-950 md:mt-4 mx-4'>
                            <label>
                                Nombre completo:
                                <input type="text" value={emergencyName} onChange={(e) => setEmergencyName(e.target.value)} className='text-slate-950' required/>
                            </label>
                            <br />
                            <label>
                                Telef:
                                <input type="tel" value={emergencyPhone} onChange={(e) => setEmergencyPhone(e.target.value)} className='text-slate-950' required/>
                            </label>
                            <br />
                            <button type="submit" className='bg-yellow-300 text-slate-900 p-2 rounded-sm' onClick={() => window.location.href = '/Administracion/Membresias'}>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}
            <p>Estado: {feedbackChildren}</p>
            <Hamburguer>        
                <a href='../Membresias'>
                    <p>Membresias y Clases</p>
                </a>
                <a href='../Programa'>
                    <p>Programacion y Asistencia</p>
                </a>
                <a href='../Profesores'>
                    <p>Profesores</p>
                </a>
                <a href="../Pagos">
                    <p>Pagos</p>
                </a>
                <a href="../">
                    <p>Salir</p>
                </a>
            </Hamburguer>
        </div></>
    );
};

export default PersonalDataForm;
