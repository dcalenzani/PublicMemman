'use client'
import Hamburguer from '@/app/components/HamburguerMenu';
import Table from '@/app/components/Table';
import React, { useState, useEffect } from 'react';

const TeacherAttendance = () => {
    type AttendanceForm = {
        event_id: string;
        teacher_id: string;
    };

    type EventsForm = {
        id: string;
        evento: string;
        dia: string;
        hora: string;
        duracion: string;
    }

    type Id = {
        id: string;
    };    
    
    interface TeachersType {
        teachers: Array<{
          dni: string;
          nombre: string;
        }>;
      }

    interface EventsType {
            special_event: Array<{
                id: string;
                evento: string;
                dia: string;
                hora: string;
                duracion: string;
            }>;
    }
   
    const handleTeachers = (id: string | null) => {
        setId(teacher_id);
    };

    useEffect(() => {
        fetch('/api/teacher')
            .then(response => response.json())
            .then((data: TeachersType) => setTeachers(data.teachers))
            .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        if (id) {
            fetch('/api/events?id=' + id)
                .then(response => response.json())
                .then((data: EventsType) => setEvents(data))
                .catch(error => console.error('Error:', error));
        }
    }, []);
      
    const [Teachers, setTeachers] = useState<Array<{dni: string, nombre: string}>>([]);
    const [Events, setEvents] = useState<EventsType>({ special_event: [] });   
    const [urlParams, setUrlParams] = useState('');
    const [feedback, setFeedback] = useState('');
    const [id, setId] = useState('');
    const [teacher_id, setTeacherId] = useState('');

    const [attendanceForm, setAttendanceForm] = 
        useState<AttendanceForm>({
            event_id: '',
            teacher_id: '',
        });

    useEffect(() => {
        fetch('/api/teacher')
            .then(response => response.json())
            .then((data: TeachersType) => setTeachers(data.teachers))
            .catch(error => console.error('Error:', error));
    }
    , []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
    
        if (id === null) {
            console.error('id is null');
            return;
        }
    
        const attendanceForm: AttendanceForm = {
            event_id: id,
            teacher_id: teacher_id
        };
    
        setAttendanceForm(attendanceForm);

        const fillUserUrlParams = (attendanceForm: any) => {
            const urlAttendanceParams = new URLSearchParams({
                event_id: attendanceForm.event_id,
                teacher_id: attendanceForm.teacher_id,
            }).toString();
            return urlAttendanceParams;
        };
        
        try {
            const urlAttendanceParams = fillUserUrlParams(attendanceForm);
            const userResponse = await fetch(`/api/events/attendance/new?${urlAttendanceParams}`);
            setUrlParams(urlAttendanceParams);
            if (userResponse.status === 200) {
                setFeedback('Ingreso exitoso');
            } else {
                setFeedback('Error');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        console.log(attendanceForm);          
    };
    return (
        <>
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
            {Events.special_event && Events.special_event.map((special_event: any) => (
            <div className='flex-col flex my-32 mx-4' key={special_event.id}>
                <h1 className='bold text-2xl'>REGISTRO DE PROFESORES EN EVENTOS</h1>
                <table className="m-2 mx-auto border border-gray-500">
                    <thead className="bg-gray-800">
                        <tr>
                            <th className="p-2">Evento</th>
                            <th className="p-2">Día</th>
                            <th className="p-2">Hora</th>
                            <th className="p-2">Duración</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                            <tr key={special_event.id}>
                                <td className="p-2">{special_event.evento}</td>
                                <td className="p-2">{special_event.dia}</td>
                                <td className="p-2">{special_event.hora}</td>
                                <td className="p-2">{special_event.duracion}</td>
                            </tr>
                    </tbody>
                </table>
                <form onSubmit={handleSubmit} key={special_event.id} className='flex flex-col my-5 space-y-2 space-x-1 [&>label]:grid [&>label]:grid-cols-2 [&>label]:bg-slate-700 [&>input]:text-slate-950'>
                    <label> Id de Evento 
                        <input 
                        type="text"
                        key={special_event.id}
                        value={special_event.id}

                        className='text-slate-950'
                        readOnly />
                    </label>
                    <label>
                        Profesor:
                        <select value={teacher_id} onChange={(e) => setTeacherId(e.target.value)} className='text-slate-950'>
                            <option value="">Seleccione un profesor</option>
                            {Array.isArray(Teachers) && Teachers.map((teachers: any) => (
                                <option key={teachers.dni} value={teachers.dni}>{teachers.nombre}</option>
                            ))}
                        </select>
                    </label>
                    <br />
                    <button type="submit" className='bg-yellow-300 text-slate-900 p-2 rounded-md'>Submit</button>
                </form>
                <p>{feedback}</p>
                <Table endpoint={`/api/events/attendance?event_id=${special_event.id}`} dataKey={'teachers'} id={'id'} onIdSelected={handleTeachers}></Table>
            </div>
            ))}
        </>
    );
};

export default TeacherAttendance;
