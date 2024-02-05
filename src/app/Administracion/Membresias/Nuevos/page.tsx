"use client"
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
        roles_id: 0,
    });

    const [parentData, setparentFormData] = useState<FormData>({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        birth_date: '',
        id: '',
        roles_id: 3,
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

    const [feedback, setFeedback] = useState('');
    
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [birthDate, setbirthDate] = useState('');
    const [id, setId] = useState('');

    const [parentName, setParentName] = useState('');
    const [parentLastname, setParentLastname] = useState('');
    const [parentEmail, setParentEmail] = useState(''); 
    const [parentPhone, setParentPhone] = useState('');
    const [parentBirthdate, setParentBirthdate] = useState('');
    const [parentId, setParentId] = useState('');
    
    const [emergencyName, setEmergencyName] = useState('');
    const [emergencyPhone, setEmergencyPhone] = useState('');

    const [isChecked, setChecked] = useState(false);
    const [showTerms, setShowTerms] = useState(false);

    const handleCheckboxChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        setChecked(event.target.checked);
    };

    const handleTermsClick = () => {
        setShowTerms(!showTerms);
    };

    const handleCloseClick = () => {
        setShowTerms(false);
    };
    
    const dialogUnder = useRef(null);

    const dialogOver = useRef(null);

    const isUnder18 = new Date(birthDate) > new Date(new Date().setFullYear(new Date().getFullYear() - 18));

    const isOver18 = new Date(birthDate) < new Date(new Date().setFullYear(new Date().getFullYear() - 18));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newFormData: FormData = {
            firstname: name,
            lastname: lastname,
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
            console.log(response);
            if (response.status === 200) {
                setFeedback('Usuario creado correctamente');
            } else {
                setFeedback('Error al crear el usuario');
            }
        } catch (error) {
            console.error('Error:', error);
        }

        if (isUnder18 && dialogUnder.current) {
            (dialogUnder.current as HTMLDialogElement).showModal();
        }

        if (isOver18 && dialogOver.current) {
            (dialogOver.current as HTMLDialogElement).showModal();
        }
    };

    console.log(formData);
    
    const handleSubmitParent = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const formDataParent = {
            firstname: parentName,
            lastname: parentLastname,
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
            console.log(kinshipResponse);
        } catch (error) {
            console.error('Error:', error);
        }

        window.location.href = './Nuevos/End';
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
        window.location.href = './Nuevos/End';
    };    

    console.log(emergencyFormData);

    return (
        <>
        <div className='mt-10 md:mt-32 mb-32 mx-4'>
            <div></div>
            <p className='text-2xl font-bold mb-4 text-center'>REGISTRO DEL ESCALADOR</p> 
            <form onSubmit={handleSubmit} className='flex flex-col space-y-2 space-x-1 [&>label]:grid [&>label]:grid-cols-2 [&>label]:bg-slate-700 [&>input]:text-slate-950 [&>label]:px-2 md:mt-4 mx-4'>
                <label>
                    Nombres:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='text-slate-950' required/>
                </label>
                <br />
                <label>
                    Apellidos:
                    <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} className='text-slate-950' required/>
                </label>
                <br/>
                <label>
                    Dni:
                    <input type="text" value={id} onChange={(e) => setId(e.target.value)} className='text-slate-950' required/>
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
                <div className='my-5 text-zinc-800 z-50'>
                <div className='flex flex-row space-x-4 place-items-center my-10 mx-5 border rounded-md bg-gray-200 p-2'>
                <input 
                type="checkbox" 
                id="terms" 
                checked={isChecked} 
                onChange={handleCheckboxChange} 
                />
                    <label className='' htmlFor="terms">
                        Acepto los 
                        <span onClick={handleTermsClick} style={{color: 'blue', cursor: 'pointer'}}>
                            {' '}términos y condiciones
                        </span>
                    </label>
                    {showTerms && 
                        <dialog open className='fixed top-24 items-center justify-center h-2/3 w-[94%] overflow-auto'>
                            <div className='relative flex flex-row space-y-4 mx-10'>
                            <p className='text-2xl mt-5 font-bold mb-4 text-center'>TERMINOS Y CONDICIONES DEL USO DEL GIMNASIO</p>
                            <button onClick={handleCloseClick} className='close-button shadow--2xl text-3xl absolute right-2 top-0'>X</button>
                            </div>
                            <p className='leading-5 p-5 text-justify w-full h-auto text-slate-800 marker:text-slate-50 whitespace-pre-line [&>strong]:text-lg'>
                                Este documento tiene como objetivo establecer claramente las responsabilidades y obligaciones tanto del gimnasio como de sus usuarios al participar en actividades relacionadas con la escalada en las instalaciones. Es fundamental que todos los usuarios del gimnasio de escalada lean y comprendan este deslinde de responsabilidades antes de participar en cualquier actividad. La participación en las actividades del gimnasio implica la aceptación de los términos y condiciones establecidos a continuación.
                                {'\n'}{'\n'}
                                <strong>1. Condiciones Físicas y Médicas:</strong>
                                {'\n'}{'\n'}
                                Los usuarios deben estar en buena forma física y gozar de buena salud para participar en actividades de escalada.
                                Los usuarios son responsables de informar al personal del gimnasio sobre cualquier condición médica preexistente que pueda afectar su capacidad para participar de manera segura.
                                {'\n'}{'\n'}
                                <strong>2. Instrucción y Supervisión:</strong>
                                {'\n'}{'\n'}
                                Todos los usuarios deben participar en las sesiones de orientación y recibir instrucciones adecuadas antes de realizar actividades de escalada.
                                Los usuarios son responsables de seguir las indicaciones del personal del gimnasio y de utilizar el equipo de seguridad proporcionado correctamente.
                                {'\n'}{'\n'}
                                <strong>3. Equipo de Seguridad:</strong>
                                {'\n'}{'\n'}
                                El gimnasio proporciona equipo de seguridad estándar, como arneses y cascos, que debe ser utilizado en todo momento durante las actividades de escalada.
                                Los usuarios son responsables de inspeccionar su equipo antes de cada uso y de informar al personal del gimnasio sobre cualquier equipo defectuoso.
                                {'\n'}{'\n'}
                                <strong>4. Riesgos y Peligros:</strong>
                                {'\n'}{'\n'}
                                Los usuarios reconocen que la escalada es una actividad intrínsecamente riesgosa y pueden ocurrir lesiones.
                                Los usuarios asumen todos los riesgos asociados con la escalada y liberan al gimnasio, su personal y sus propietarios de cualquier responsabilidad por lesiones, daños o pérdidas.
                                {'\n'}{'\n'}
                                <strong>5. Menores de Edad:</strong>
                                {'\n'}{'\n'}
                                Los padres o tutores legales son responsables de supervisar a los menores de edad mientras participan en actividades de escalada.
                                Los padres o tutores legales deben firmar este deslinde de responsabilidades en nombre de los menores de edad.
                                {'\n'}{'\n'}
                                <strong>6. Mantenimiento y Seguridad del Gimnasio:</strong>
                                {'\n'}{'\n'}
                                El gimnasio se compromete a mantener sus instalaciones y equipo en condiciones seguras y operativas.
                                Los usuarios deben informar de inmediato al personal del gimnasio sobre cualquier preocupación relacionada con la seguridad o el mantenimiento.
                                {'\n'}{'\n'}
                                <strong>Al participar en actividades de escalada en este gimnasio, los usuarios reconocen haber leído, comprendido y aceptado este deslinde de responsabilidades. Además, comprenden que este documento tiene validez legal y es más que solo un acuerdo formal entre el usuario y el gimnasio.</strong>
                            </p>
                            <br />
                        </dialog>}
                </div>
                </div>
                <button type="submit" disabled={!isChecked} className='bg-yellow-300 z-1 text-slate-900 p-2 rounded-sm mb-10 disabled:opacity-60'>Registrar</button>
            </form>
            {isUnder18 && (
                <dialog className='mt-10 p-3 rounded-sm bg-slate-800 backdrop-filter backdrop-blur-sm' ref={dialogUnder}>
                    <h2 className='bg-yellow-300 w-1/2 p-3 mb-3 text-slate-950'>Proporcione información adicional del menor</h2>
                    <div className='md:mt-4 mx-4 text-slate-200 '>
                        <h1 className='mb-3'>Información del Apoderado</h1>
                        <div />
                        <form onSubmit={handleSubmitParent} className='flex flex-col space-y-2 space-x-1 [&>label]:grid [&>label]:grid-cols-2 [&>label]:bg-slate-950 [&>label]:px-2 md:mt-4 mx-4'>
                            <label>
                                Nombres Completo:
                                <input type="text" value={parentName} onChange={(e) => setParentName(e.target.value)} className='text-slate-950' required/>
                            </label>
                            <br />
                            <label>
                                Apellidos:
                                <input type="text" value={parentLastname} onChange={(e) => setParentLastname(e.target.value)} className='text-slate-950' required/>
                            </label>
                            <br/>
                            <label>
                                Dni:
                                <input type="text" value={parentId} onChange={(e) => setParentId(e.target.value)} className='text-slate-950' required/>
                            </label>
                            <br />
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
                            <button type="submit" className='bg-yellow-300 text-slate-900 p-2 rounded-sm'>Submit</button>
                        </form>
                    </div>
                </dialog>
            )}
            {isOver18 && (
                <dialog className='mt-10 p-3 rounded-sm bg-slate-800 backdrop-filter backdrop-blur-sm' ref={dialogOver}>
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
                            <button type="submit" className='bg-yellow-300 text-slate-900 p-2 rounded-sm' onClick={() => window.location.href = './Nuevos/End'}>
                                Submit
                            </button>
                        </form>
                    </div>
                </dialog>
            )}
        </div>
        </>
        );
    };
    
    export default PersonalDataForm;
    