'use client'
import Hamburguer from '@/app/components/HamburguerMenu';
import Table from '@/app/components/Table';
import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import { Snackbar } from '@mui/material';
import { AlertCircle } from 'react-feather';

const AsistenciaForm: React.FC = () => {

    type AttendanceForm = {
        lesson_id: string;
        student_id: string;
    };

    type UpdateForm = {
        id: string;
        attendance: string;
        justification: string;
    };
    
    type Id = {
        id: string;
    };

    const [isModalStudentOpen, setisModalStudentOpen] = useState(false);
    const [isModalUpdateOpen, setisModalUpdateOpen] = useState(false);
    const [urlParams, setUrlParams] = useState('');
    const [feedback, setFeedback] = useState('');
    const [id, setId] = useState('');
    const [student_id, setStudent] = useState('');
    const [students, setStudents] = useState({members: []});
    const [lessons, setLessons] = useState({lessons: []});
    const [attendance, setAttendance] = useState('');
    const [justification, setJustification] = useState('');
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const handleRowDoubleClick = (id: string | null) => {
        if (id) {
            setSelectedId(id);
            console.log(id);
            console.log(selectedId);
            setisModalUpdateOpen(true);
        }
    };

    /* Aca deberia crear un state o type para hold el valor del id?*/
    const closeUpdateModal = () => {
        setisModalUpdateOpen(false);
    };

    const newStudent = () => {
        setisModalStudentOpen(true);
    };

    const closeStudentModal = () => {
        setisModalStudentOpen(false);
    };
        
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const idParam = urlParams.get('id');
        if (idParam) {
            fetch('/api/lessons?id=' + idParam)
            .then(response => response.json())
            .then(data => {
                setLessons(data);
                setId(data.lessons[0].id);
            })
            .catch(error => console.error('Error:', error));
        }
    }, []);
    
    const [attendanceForm, setAttendanceForm] = 
    useState<AttendanceForm>({
        lesson_id: '',
        student_id: '',
    });
    
    const [updateForm, setUpdateForm] = useState<UpdateForm>({
        id: '',
        attendance: '',
        justification: '',
    });

    useEffect(() => {
        fetch('/api/users?roles_id=1')
            .then(response => response.json())
            .then(data => setStudents(data))
            .catch(error => console.error('Error:', error));
    }, []);

    
    const handleId = (id: string | null) => {
        setSelectedId(id);
    };
       
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const attendanceForm: AttendanceForm = {
            lesson_id: id,
            student_id: student_id,
        };

        setAttendanceForm(attendanceForm);

        const fillUserUrlParams = (attendanceForm: any) => {
            const urlAttendanceParams = new URLSearchParams({
                lesson_id: attendanceForm.lesson_id,
                student_id: attendanceForm.student_id,
            }).toString();
            return urlAttendanceParams;
        };

        try {
            const urlAttendanceParams = fillUserUrlParams(attendanceForm);
            const userResponse = await fetch(`/api/lessons/attendance/new?${urlAttendanceParams}`);
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

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (selectedId !== null) {
            const updateForm: UpdateForm = {
                id: selectedId,
                attendance: attendance,
                justification: justification,
            };
    
            const fillUpdateUrlParams = (updateForm: any) => {
                const urlUpdateParams = new URLSearchParams({
                    id: updateForm.id,
                    attendance: updateForm.attendance,
                    justification: updateForm.justification,
                }).toString();
                return urlUpdateParams;
            };

        try {
            const urlUpdateParams = fillUpdateUrlParams(updateForm);
            const userResponse = await fetch(`/api/lessons/attendance/registration?${urlUpdateParams}`);
            setUrlParams(urlUpdateParams);
            if (userResponse.status === 200) {
                setFeedback('Asistencia ingresada con exito');
            } else {
                setFeedback('Error al ingresar asistencia');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setTimeout(() => {
                location.reload();
            }, 1000);
        }
        console.log(updateForm);
    }
};

    const handleDelete = async (selectedId: string | null) => {
        try {
            const response = await fetch(`/api/lessons/attendance/delete?id=${selectedId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Error deleting data');
            }
            setFeedback('Alumno eliminado de la clase');
        } catch (error) {
            console.error('Error deleting data:', error);
            setFeedback('Error al borrar alumno');
        } finally {
            setTimeout(() => {
                location.reload();
            }, 1000);
        }
    };

    return (
        <div>
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
            <div className='flex-col flex mt-32 mb-64 mx-4'>
                <h1 className='mb-3 text-2xl font-bold'>Registro de clases</h1>
                <table id="lesson-table" className='table-auto text-center border [&>thead]:bg-zinc-700 mb-10'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Fecha</th>
                            <th>Profesor</th>
                            <th>Hora</th>
                            <th>Duracion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lessons.lessons.map((lesson: any) => (
                            <tr key={lesson.id}>
                                <td>{lesson.id}</td>
                                <td>{lesson.lesson_date}</td>
                                <td>{lesson.teacher}</td>
                                <td>{lesson.lesson_time}</td>
                                <td>{lesson.duration}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Snackbar 
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
                <Modal
                open={isModalUpdateOpen}
                onClose={closeUpdateModal}
                aria-labelledby="update-modal-title"
                aria-describedby="update-modal-description"
                >
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-lg w-1/2">
                        <h2 id="modal-modal-title" className="text-2xl text-zinc-900 font-bold mb-4">Asistencia y Observaciones</h2>
                        <p id="modal-modal-description" className="text-zinc-900 mb-4">Agregue la asistencia y observaciones del alumno</p>
                        <form className="flex flex-col my-8 bg-slate-700 p-10 space-y-5" onSubmit={handleUpdate}>
                            <label>
                                Asistencia:
                                <select value={attendance} className='text-slate-950 mx-4 px-4 w-full max-w-full' onChange={(e) => setAttendance(e.target.value)}>
                                    <option value="" disabled>Seleccione asistencia</option>
                                    <option value="true">Presente</option>
                                    <option value="false">Ausente</option>
                                </select>
                            </label>
                            <label>
                                Observaciones:
                                <input type='text' className='text-slate-950 mx-4 w-full max-w-full' placeholder='Escriba observaciones' onChange={(e) => setJustification(e.target.value)}/>
                            </label>
                            <button type="submit" className='bg-yellow-300 text-slate-900 p-2 rounded-md'>Submit</button>
                        </form>
                    </div>
                </Modal>
                <Modal
                open={isModalStudentOpen}
                onClose={closeStudentModal}
                aria-labelledby="student-modal-title"
                aria-describedby="student-modal-description"
                >
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-lg w-1/2">
                    <h2 id="modal-modal-title" className="text-2xl text-zinc-900 font-bold mb-4">Nueva Asistencia</h2>
                    <p id="modal-modal-description" className="text-zinc-900 mb-4">Seleccione al estudiante para la clase.</p>
                    <form onSubmit={handleSubmit} className='flex flex-col my-8 bg-slate-700 p-10'>
                        <label className='m-4'>
                            Alumno:
                            <select value={student_id} onChange={(e) => setStudent(e.target.value)} className='text-slate-950 mx-4'>
                                <option value="">Seleccione un estudiante</option>
                                {students.members.map((student: any) => (
                                    <option key={student.dni} value={student.dni}>{student.nombre}</option>
                                ))} 
                            </select>
                        </label>
                        <button type="submit" className='bg-yellow-300 text-slate-900 p-2 rounded-md'>Submit</button>
                    </form>
                    </div>
                </Modal>
                <Table
                endpoint={`/api/lessons/attendance?lesson_id=${id}`}
                dataKey="attendee" 
                id='id'
                title = 'Asistencia'
                onIdSelected={handleId}
                deleteClick={handleDelete}
                newElementClick={newStudent}
                OnRowDoubleClick={handleRowDoubleClick}
                />
            </div>
        </div>
    );
};

export default AsistenciaForm;