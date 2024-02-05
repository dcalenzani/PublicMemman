'use client'
import Hamburguer from '@/app/components/HamburguerMenu';
import Table from '@/app/components/Table';
import { Build } from '@mui/icons-material';
import { Modal, Snackbar } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'react-feather';

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
   
    const handleIdSelected = (id: string | null) => {
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
    const [isModalUpdateOpen, setisModalUpdateOpen] = useState(false);
    const [isModalSelectionOpen, setisModalSelectionOpen] = useState(false);

    const [attendanceForm, setAttendanceForm] = 
        useState<AttendanceForm>({
            event_id: '',
            teacher_id: '',
        });

    const closeUpdateModal = () => {
        setisModalUpdateOpen(false);
    };

    const closeSelectionModal = () => {
        setisModalSelectionOpen(false);
    };

    useEffect(() => {
        fetch('/api/teacher')
            .then(response => response.json())
            .then((data: TeachersType) => setTeachers(data.teachers))
            .catch(error => console.error('Error:', error));
    }
    , []);

    const newTeacher = () => {
        setisModalUpdateOpen(true);
    };

    const viewTeacher = () => {
        setisModalSelectionOpen(true);
    };

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
        } finally {
            setTimeout(() => {
                location.reload();
            }, 1000);
        }
        console.log(attendanceForm);          
    };

    const handleDelete = async (selectedId: string | null) => {
        try {
            const response = await fetch(`/api/events/attendance/delete?id=${selectedId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Error deleting data');
            }
            setFeedback('Miembro eliminado correctamente');
        } catch (error) {
            console.error('Error deleting data:', error);
            setFeedback('Error al borrar miembro');
        } finally {
            setTimeout(() => {
                location.reload();
            }, 1000);
        }
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
            <div key={special_event.id} className='flex flex-col text-center py-32 items-center space-y-20 mb-20'>
                <Snackbar 
                id="snackbar-feedback"
                open={Boolean(feedback)}
                autoHideDuration={6000}
                onClose={() => setFeedback('')}
                className='bg-zinc-700 font-semibold rounded-md px-5 py-3'
                >
                        <div className='flex flex-row space-x-5'>
                            <p className='whitespace-pre-wrap'>Sic: {feedback}    |</p>
                            <AlertCircle/>
                        </div>
                </Snackbar>
                <h1 id="page-header" className='bold text-2xl'>REGISTRO DE PROFESORES EN EVENTOS</h1>
                <table id='event-table' className="m-2 mx-auto border border-gray-500">
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
                <Modal
                id="update-modal"
                open={isModalUpdateOpen}
                onClose={closeUpdateModal}
                aria-labelledby="update-modal-title"
                aria-describedby="update-modal-description"
                >
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-lg w-1/2">
                        <h2 id="modal-modal-title" className="text-2xl text-zinc-900 font-bold mb-4">Nueva Asistencia</h2>
                        <p id="modal-modal-description" className="text-zinc-900 mb-4">Seleccione al profesor para la clase.</p>
                        <form onSubmit={handleSubmit} key={special_event.id} className='flex flex-col my-10 space-y-10 bg-slate-700 p-10'>
                        <label> Id de Evento 
                        <input
                        type="text"
                        key={special_event.id}
                        value={special_event.id}
                        className='text-slate-950 ml-5'
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
                    </div>
                </Modal>
                <Modal
                id="selection-modal"
                open={isModalSelectionOpen}
                onClose={closeSelectionModal}
                aria-labelledby="selection-modal-title"
                aria-describedby="selection-modal-description"
                >
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 text-zinc-800 rounded shadow-lg w-1/2">
                        <h2 className='text-5xl font-bold'> <Build/> MODULO EN CONSTRUCCION <Build/></h2> 
                    </div>
                </Modal>
                <Table 
                endpoint={`/api/events/attendance?event_id=${special_event.id}`}
                dataKey={'teachers'}
                id={'id'}
                title='Profesores en el evento'
                onIdSelected={handleIdSelected}
                deleteClick={handleDelete}
                newElementClick={newTeacher}
                OnRowDoubleClick={viewTeacher}
                /*{() => window.location.replace(`../Profesores/Actualizar?id=${special_event.id}`)}
                */
                />
            </div>
            ))}
        </>
    );
};

export default TeacherAttendance;
