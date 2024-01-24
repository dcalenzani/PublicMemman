'use client'
import Hamburguer from '@/app/components/HamburguerMenu';
import Table from '@/app/components/Table';
import React, { useState, useEffect } from 'react';

const AsistenciaForm = () => {
    
    return (
        <div>
            <Hamburguer>
                <a href='./Membresias'>
                    <p>Membresias y Clases</p>
                </a>
                <a href='./Programa'>
                    <p>Programacion y Asistencia</p>
                </a>
                <a href='./Profesores'>
                    <p>Profesores</p>
                </a>
                <a href="./Pagos">
                    <p>Pagos</p>
                </a>
                <a href="../">
                    <p>Salir</p>
                </a>
            </Hamburguer>
            <div className='flex-col flex my-32 mx-4'>
                <p className='text-2xl'> PAGINA EN CONSTRUCCION</p>
            </div>
        </div>
    );
};

export default AsistenciaForm;