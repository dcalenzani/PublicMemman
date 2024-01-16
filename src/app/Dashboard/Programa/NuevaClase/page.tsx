"use client"
import React, { useEffect, useRef, useState } from 'react';
import Hamburguer from '@/app/components/HamburguerMenu';

const LessonFormForm = () => {

    type LessonForm = {
        teacher_id: string;
        lesson_date: string;
        duration: string;
    };

    interface TeachersType {
        teachers: Array<{
          dni: string;
          nombre: string;
        }>;
      }

    const [Teachers, setTeachers] = useState<any[]> ([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/teacher')
            .then(response => response.json())
            .then((data: TeachersType) => setTeachers(data.teachers))
            .catch(error => console.error('Error:', error));
    }, []);

    const [lessonForm, setLessonForm] = useState<LessonForm>({
        teacher_id: '',
        lesson_date: '',
        duration: '',
    });

    const [Teacherid, setTeacherId] = useState('');
    const [lessonDate, setDate] = useState('');
    const [duration, setDuration] = useState('');
    const [lessonTime, setTimeOption] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const lessonForm: LessonForm = {
            teacher_id: Teacherid,
            lesson_date: `${lessonDate} ${lessonTime}`,
            duration: duration,
        };

        setLessonForm(lessonForm);

        const fillUserUrlParams = async (lessonForm: LessonForm) => {
            const urlLessonParams = new URLSearchParams();
            for (const key in lessonForm) {
                urlLessonParams.append(key, lessonForm[key as keyof LessonForm]);
            }
            try {
                const urlParams = urlLessonParams.toString();
                const userResponse = await fetch(`/api/lessons/new?${urlParams}`);
                console.log(userResponse);
            } catch (error) {
                console.error('Error:', error);
            }
            /* window.location.href = './Nuevos/End'; */
        };  
        await fillUserUrlParams(lessonForm);

    };
        
    console.log(lessonForm);
    console.log(Teachers);

    return (
        <div>

            <div className='md:mt-64 mx-4'>
            <h1 className='mb-3'>Registro de clases</h1>
            <form onSubmit={handleSubmit} className='flex flex-col space-y-2 space-x-1 [&>label]:grid [&>label]:grid-cols-2 [&>label]:bg-slate-700 [&>input]:text-slate-950'>              
                <label>
                    Fecha para clase:
                    <input type="date" value={lessonDate} onChange={(e) => setDate(e.target.value)} className='text-slate-950' />
                </label>
                <br />
                <label>
                    Hora:
                    <input type="time" value={lessonTime} onChange={(e) => setTimeOption(e.target.value)} className='text-slate-950' />
                </label>
                <br />
                <label>
                    Profesor:
                    <select value={Teacherid} onChange={(e) => setTeacherId(e.target.value)} className='text-slate-950'>
                        <option value="">Seleccione un profesor</option>
                        {Array.isArray(Teachers) && Teachers.map((teachers: any) => (
                            <option key={teachers.dni} value={teachers.dni}>{teachers.nombre}</option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Duracion:
                    <select value={duration} onChange={(e) => setDuration(e.target.value)} className='text-slate-950'>
                        <option key="1 Hora" value="01:00:00">1 Hora</option>
                        <option key="1:30 horas" value="01:30:00">1:30 horas</option>
                    </select>
                </label>
                <br />
                <button type="submit" className='bg-yellow-300 text-slate-900 p-2 rounded-md'>Submit</button>
            </form>
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
export default LessonFormForm;