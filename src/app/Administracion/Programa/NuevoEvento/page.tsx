"use client"
import React, { useEffect, useRef, useState } from 'react';
import Hamburguer from '@/app/components/HamburguerMenu';

const EventFormForm = () => {

    type EventForm = {
        event_date: string;
        duration: string;
        description: string;
    };


    const [EventForm, setEventForm] = useState<EventForm>({
        event_date: '',
        duration: '',
        description: '',
    });

    const today = new Date();
    const formattedTime = `${String(today.getHours()).padStart(2, '0')}:${String(today.getMinutes()).padStart(2, '0')}`;

    const [feedback, setFeedback] = useState('');
    const [lessonDate, setDate] = useState(today.toISOString().substring(0, 10));
    const [lessonTime, setTimeOption] = useState(formattedTime);
    const [duration, setDuration] = useState('');
    const [des, setDes] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const EventForm: EventForm = {
            event_date: `${lessonDate} ${lessonTime}`,
            duration: `${duration}`,
            description: `${des}`,
        };

        setEventForm(EventForm);

        const fillUserUrlParams = async (EventForm: EventForm) => {
            const urlLessonParams = new URLSearchParams();
            for (const key in EventForm) {
                urlLessonParams.append(key, EventForm[key as keyof EventForm]);
            }
            try {
                const urlParams = urlLessonParams.toString();
                const userResponse = await fetch(`/api/events/new?${urlParams}`);
                if (userResponse.status === 200) {
                    setFeedback('Evento creado correctamente');
                } else {
                    setFeedback('Error al crear el evento');
                }
                console.log(userResponse);
            } catch (error) {
                console.error('Error:', error);
            }
            /*window.location.href = '/Administracion/Programa';*/
        };  
        await fillUserUrlParams(EventForm);

    };
        
    console.log(EventForm);

    return (
        <div>

            <div className='md:mt-64 mx-4'>
            <h1 className='mb-3'>Registro de eventos</h1>
            <form onSubmit={handleSubmit} className='flex flex-col space-y-2 space-x-1 [&>label]:grid [&>label]:grid-cols-2 [&>label]:bg-slate-700 [&>input]:text-slate-950'>              
                <label>
                    Fecha para evento:
                    <input type="date" value={lessonDate} onChange={(e) => setDate(e.target.value)} className='text-slate-950' />
                </label>
                <br />
                <label>
                    Hora:
                    <input type="time" value={lessonTime} onChange={(e) => setTimeOption(e.target.value)} className='text-slate-950' />
                </label>
                <br />
                <label>
                    Tipo de Evento:
                    <input placeholder='Informacion relevante' value={des} onChange={(e) => setDes(e.target.value)} className='text-slate-950'>
                    </input>
                </label>
                <br />
                <label>
                    Duracion:
                    <select value={duration} onChange={(e) => setDuration(e.target.value)} className='text-slate-950'>
                        <option> Duracion</option>
                        <option key="1 Hora" value="01:00:00">1:00H</option>
                        <option key="1:30 horas" value="01:30:00">1:30H</option>
                        <option key="2:00 horas" value="02:00:00">2:00H</option>
                        <option key="2:30 horas" value="02:30:00">2:30H</option>
                        <option key="3:00 horas" value="03:00:00">3:00H</option>
                        <option key="3:30 horas" value="03:30:00">3:30H</option>
                        <option key="4:00 horas" value="04:00:00">4:00H</option>
                        <option key="4:30 horas" value="04:30:00">4:30H</option>
                        <option key="5:00 horas" value="05:00:00">5:00H</option>
                    </select>
                </label>
                <br />
                <button type="submit" className='bg-yellow-300 text-slate-900 p-2 rounded-md'>Submit</button>
            </form>
            <p>Sic: {feedback}</p>
            </div>
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
                <a href="../../">
                    <p>Salir</p>
                </a>
            </Hamburguer>
        </div>
    );
};
export default EventFormForm;