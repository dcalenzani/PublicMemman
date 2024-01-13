"use client"
import React, { useRef, useState } from 'react';

const PersonalDataForm = () => {
 
    type FormData = {
        id: string;
        fullname: string;
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
        fullname: '',
        email: '',
        phone: '',
        birth_date: '',
        id: '',
        roles_id: 0,
    });

    const [parentData, setparentFormData] = useState<FormData>({
        fullname: '',
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


    const [accepted, setAccepted] = useState(false);
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [birthDate, setbirthDate] = useState('');
    const [id, setId] = useState('');
    const [selectedOption, setSelectedOption] = useState('clases');

    const [parentName, setParentName] = useState('');
    const [parentEmail, setParentEmail] = useState(''); 
    const [parentPhone, setParentPhone] = useState('');
    const [parentBirthdate, setParentBirthdate] = useState('');
    const [parentId, setParentId] = useState('');
    const [parentRole, setParentRole] = useState('3');
    
    const [emergencyName, setEmergencyName] = useState('');
    const [emergencyPhone, setEmergencyPhone] = useState('');
    const [users_id, setUsersId] = useState('');

    const handleAcceptance = () => {
        setAccepted(!accepted);
        console.log(accepted);
    };

    const dialogUnder = useRef(null);

    const dialogOver = useRef(null);

    const isUnder18 = new Date(birthDate) > new Date(new Date().setFullYear(new Date().getFullYear() - 18));

    const isOver18 = new Date(birthDate) < new Date(new Date().setFullYear(new Date().getFullYear() - 18));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newFormData: FormData = {
            fullname: name,
            email: email,
            phone: phone,
            birth_date: birthDate,
            id: id,
            roles_id: (selectedOption === 'clases' ? 1 : 2),
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
        } catch (error) {
            console.error('Error:', error);
        }

        if (isUnder18 && dialogUnder.current) {
            (dialogUnder.current as HTMLDialogElement).showModal();
        }

        if (isOver18 && dialogOver.current) {
            dialogOver.current.showModal();
        }
    };

    console.log(formData);
    
    const handleSubmitParent = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const formDataParent = {
            fullname: parentName,
            email: parentEmail,
            phone: parentPhone,
            birth_date: parentBirthdate,
            id: parentId,
            roles_id: 3,
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
        <><div className='mt-10 md:mt-32 mb-32 mx-4'>
            <div>
            <p className='text-2xl font-bold mb-4 text-center'>DECLARACIÓN JURADA DE RESPONSABILIDAD</p>
            <p className='leading-5 p-5 text-justify w-full h-auto text-slate-200'>
                Lea atentamente el siguiente documento, si está de acuerdo, marque la casilla de aceptación y proceda a llenar el formulario de registro.
            </p>
            <br />
            <br />
                <p className='text-2xl font-bold mb-4 text-center'>DESLINDE DE RESPONSABILIDADES</p>
                <ul className='leading-5 p-5 text-justify w-full h-auto text-slate-200 marker:text-slate-50'>
                    <li>
                    Yo reconozco y acepto que su práctica negligente por mi persona, sin la supervisión del personal adecuado del gimnasio, no sujeta a las Normas y Reglamento de Seguridad del gimnasio, puede producir lesiones físicas leves y/o graves, tales como caídas, lesiones, fracturas, torcedurasm entre otros. Por ello, asumo la total responsabilidad por todos los costos, gastos, daños, responsabilidad y otras pérdidas que mi participación pueda incurrir en relación con los riesgos mencionados anteriormente, sin la supervisión adecuada y correcta, y exonera expresamente a la empresa de toda responsabilidad por lesión u otro problema que resulte de alguna manera relacionado en la práctica de escalada de boulder y deportiva en el gimnasio.
                    </li>
                    <br />
                    <li>
                    Yo declaro gozar de buena condición física y mental, enteramente compatible y adecuada para realizar la práctica de la escalada deportiva y en boulder en el gimnasio de escalada; y que, por lo tanto, no padezco de problemas pre existentes, como de la columna o del corazón, entre otros,  que pudieran interferir con mi seguridad o la de terceros.
                    </li>
                    <br />
                    <li>
                    Yo me comprometo a utilizar las instalaciones del Gimnasio Basecamp Perú cumpliendo en todo momento con el Reglamento y Normas de Seguridad, de los que declaro tener pleno conocimiento. Si yo hago utilización indebida de la infraestructura y el material de seguridad y cualquier acción u omisión que durante el curso de la práctica o estadía en el Gimnasio de escalada BASECAMP PERÚ, sin la debida supervisión de los instructores capacitados, impida o perturbe el normal desarrollo, facultará a la dirección del Gimnasio Basecampperú para excluirme del lugar. Asimismo, Yo declaro responder por los daños ocasionados a las instalaciones o a terceros derivados de dichos actos.
                    </li>
                    </ul>
                    <br />
                <div className='flex flex-row space-x-4 place-items-center mb-10 border rounded-md bg-gray-800 p-2'>
                    <input
                        type="radio"
                        id="accept"
                        name="terms"
                        checked={accepted}
                        onChange={handleAcceptance}
                        />
                    <label htmlFor="accept"><b>Acepto</b> el deslinde de responsabilidades sobre mi seguridad o la del menor del que soy responsable, segun sea el caso</label>
                </div>
                <div className='flex flex-row space-x-4 place-items-center mb-10 border rounded-md bg-gray-800 p-2'>
                    <input
                        type="radio"
                        id="decline"
                        name="terms"
                        checked={!accepted}
                        onChange={handleAcceptance}
                        />
                    <label htmlFor="decline"><b>Rechazo</b> el deslinde de responsabilidades sobre mi seguridad o la del menor del que soy responsable, segun sea el caso</label>
                </div>
            </div>
            {accepted && (
                <>
                    <h1 className='mb-3'>Registro del Escalador</h1>
                    <form onSubmit={handleSubmit} className='flex flex-col space-y-2 space-x-1 [&>label]:grid [&>label]:grid-cols-2 [&>label]:bg-slate-700 [&>input]:text-slate-950 [&>label]:px-2 md:mt-4 mx-4'>
                        <label>
                            Nombre:
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='text-slate-950' required/>
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
                        <label>
                            id:
                            <input type="text" value={id} onChange={(e) => setId(e.target.value)} className='text-slate-950' required/>
                        </label>
                        <br />
                        <label>
                            Selecciona una opción:
                            <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} className='text-slate-950'>
                                <option value="clases">Clases</option>
                                <option value="membresia">Membresía</option>
                            </select>
                        </label>
                        <br />
                        <button type="submit" className='bg-yellow-300 text-slate-900 p-2 rounded-sm mb-10'>Submit</button>
                    </form>
                    {isUnder18 && (
                        <dialog className='mt-10 p-3 rounded-sm bg-slate-800 backdrop-filter backdrop-blur-sm' ref={dialogUnder}>
                            <h2 className='bg-yellow-300 w-1/2 p-3 mb-3 text-slate-950'>Proporcione información adicional del menor</h2>
                            <div className='md:mt-4 mx-4 text-slate-200 '>
                                <h1 className='mb-3'>Información del Apoderado</h1>
                                <div />
                                <form onSubmit={handleSubmitParent} className='flex flex-col space-y-2 space-x-1 [&>label]:grid [&>label]:grid-cols-2 [&>label]:bg-slate-950 [&>label]:px-2 md:mt-4 mx-4'>
                                    <label>
                                        Nombre Completo:
                                        <input type="text" value={parentName} onChange={(e) => setParentName(e.target.value)} className='text-slate-950' required/>
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
                                    <label>
                                        id:
                                        <input type="text" value={parentId} onChange={(e) => setParentId(e.target.value)} className='text-slate-950' required/>
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
                </>
            )}
        </div></>
    );
};

export default PersonalDataForm;
