'use client'
import Hamburguer from '@/app/components/HamburguerMenu';
import Table from '@/app/components/Table';
import React, { useState, useEffect } from 'react';

const AsistenciaForm = () => {
    type AttendanceForm = {
        lesson_id: string;
        student_id: string;
    };
    
    type Id = {
        id: string;
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
    
    const [urlParams, setUrlParams] = useState('');
    const [feedback, setFeedback] = useState('');
    const [id, setId] = useState('');
    const [student_id, setStudent] = useState('');
    const [students, setStudents] = useState({members: []});
    const [lessons, setLessons] = useState({lessons: []});
    const [attendanceForm, setAttendanceForm] = 
    
    useState<AttendanceForm>({
        lesson_id: '',
        student_id: '',
    });
    
    useEffect(() => {
        fetch('/api/users?roles_id=1')
            .then(response => response.json())
            .then(data => setStudents(data))
            .catch(error => console.error('Error:', error));
    }, []);

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
        }
        console.log(attendanceForm);          
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
            <div className='flex-col flex my-32 mx-4'>
                <h1 className='mb-3 text-2xl'>Registro de clases</h1>
                <table className='table-auto text-center border [&>thead]:bg-zinc-700'>
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
                <form onSubmit={handleSubmit} className='flex flex-col my-8 bg-slate-700 p-10'>
                    <label className='m-4'>
                        Alumnos
                        <select value={student_id} onChange={(e) => setStudent(e.target.value)} className='text-slate-950 mx-4'>
                            <option value="">Seleccione un estudiante</option>
                            {students.members.map((student: any) => (
                                <option key={student.dni} value={student.dni}>{student.nombre}</option>
                            ))} 
                        </select>
                    </label>
                    <button type="submit" className='bg-yellow-300 text-slate-900 p-2 rounded-md'>Submit</button>
                </form>
                <p>Sic: {feedback}</p>
                <Table endpoint={`/api/lessons/attendance?lesson_id=${id}`}
                dataKey="attendee" id={'id'} onIdSelected={function (id: string | null): void {
                    throw new Error('Function not implemented.');
                } }
                />
            </div>
        </div>
    );
};

export default AsistenciaForm;