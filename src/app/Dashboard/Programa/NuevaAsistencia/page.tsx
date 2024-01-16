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
                setId(data.lessons[0].id); // Update the id state variable
            })
            .catch(error => console.error('Error:', error));
        }
    }, []);
    
    const [urlParams, setUrlParams] = useState('');

    const [id, setId] = useState('');
    const [student_id, setStudent] = useState('');
    const [students, setStudents] = useState({members: []});
    const [lessons, setLessons] = useState({lessons: []});
    const [attendanceForm, setAttendanceForm] = useState<AttendanceForm>({
        lesson_id: '',
        student_id: '',
    });
    
    useEffect(() => {
        fetch('/api/users?roles_id=1')
            .then(response => response.json())
            .then(data => setStudents(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const [successDialogOpen, setSuccessDialogOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const attendanceForm: AttendanceForm = {
            lesson_id: id,
            student_id: student_id,
        };

        setAttendanceForm(attendanceForm);

        const fillUserUrlParams = (attendanceForm: any) => {
            const urlAttendanceParams = new URLSearchParams(attendanceForm).toString();
            return urlAttendanceParams;
        };

        try {
            const urlAttendanceParams = fillUserUrlParams(attendanceForm);
            const userResponse = await fetch(`/api/lessons/attendance/new?${urlAttendanceParams}`);
            setUrlParams(urlAttendanceParams);
            setSuccessDialogOpen(true);
        } catch (error) {
            console.error('Error:', error);
        }
        console.log(attendanceForm);          
    };

    return (
        <div>
            {successDialogOpen && (
                <dialog open className='bg-zinc-200 text-slate-200 w-screen h-25%'>
                    Ingreso exitoso
                </dialog>
            )}
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
                <h1 className='mb-3'>Registro de clases</h1>
                    {lessons.lessons.map((lesson: any) => (
                <form key={lesson.id} onSubmit={handleSubmit} className='flex flex-col space-y-2 space-x-1 my-8 [&>label]:grid [&>label]:grid-cols-2 [&>label]:bg-slate-700 [&>input]:text-slate-950'>
                    <label>
                        <input type="text" key={lesson.id} value={lesson.id} className='text-slate-950' readOnly />
                    </label>
                    <br />
                    <label>
                        <input type="text" key={lesson.lesson_date} value={lesson.lesson_date} className='text-slate-950' readOnly /> Fecha
                    </label>
                    <br />
                    <label>
                        <input type="text" value={lesson.teacher} key={lesson.teacher} className='text-slate-950' readOnly /> Profesor
                    </label>
                    <label>
                        <input type="text" key={lesson.lesson_time} value={lesson.lesson_time} className='text-slate-950' readOnly /> Hora
                    </label>
                    <br />
                    <label>
                        <input type="text" key={lesson.duration} value={lesson.duration} className='text-slate-950' readOnly /> Duracion
                    </label>
                    <br />
                    <label>
                        <select value={student_id} onChange={(e) => setStudent(e.target.value)} className='text-slate-950'>
                            <option value="">Seleccione un estudiante</option>
                            {students.members.map((student: any) => (
                                <option key={student.dni} value={student.dni}>{student.nombre}</option>
                            ))} 
                        </select>Alumnos
                    </label>
                    <br />
                    <button type="submit" className='bg-yellow-300 text-slate-900 p-2 rounded-md'>Submit</button>
                </form>
                ))}
                <Table endpoint={`/api/lessons/attendance?lesson_id=${id}`} 
                dataKey="attendee"
                />
            </div>
        </div>
    );
};

export default AsistenciaForm;