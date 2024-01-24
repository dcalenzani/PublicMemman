'use client'
import Hamburguer from '@/app/components/HamburguerMenu';
import React, { useState, useEffect, FormEvent } from 'react';
import { useLocation } from 'react-router-dom';

interface Teacher {
  dni: number;
  nombre: string;
  'Fecha de nacimiento': string;
  telefono: string;
  email: string;
  'Metodo de pago': string;
  comentarios: string | null;
}

const TeacherPage: React.FC = () => {

  return (
    <div className='flex flex-row'>
      <Hamburguer>
      <a href='/Programa/Membresias'>
            <p>Membresias y Clases</p>
        </a>
        <a href='/Programa/Programa'>
            <p>Programacion y Asistencia</p>
        </a>
        <a href='/Programa/Profesores'>
            <p>Profesores</p>
        </a>
        <a href="/Programa/Pagos">
            <p>Pagos</p>
        </a>
        <a href="/Programa/">
            <p>Salir</p>
        </a>
      </Hamburguer>
      <div className='m-32 justify-center place-items-center'>
        <p className='text-2xl'> PAGINA EN CONSTRUCCION </p>
      </div>
    </div>
  );
};

export default TeacherPage;