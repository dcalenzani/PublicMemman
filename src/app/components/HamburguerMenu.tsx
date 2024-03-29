'use client'

import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

interface HamburguerProps {
    children: React.ReactNode
}
const Hamburguer: React.FC<HamburguerProps> = () => {

    const isMdScreen = useMediaQuery({ query: '(min-width: 768px)' });
    const [isMenuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        setMenuOpen(isMdScreen);
    }, [isMdScreen]);

    const toggleMenu = () => {
        setMenuOpen((prevState: any) => !prevState); 
    };
    
    return (
        <>
            <div className="fixed z-50 bottom-0 pb-3 left-108 flex h-28 w-full items-center justify-center pt-8 bg-gradient-to-t from-white via-white  overflow-hidden dark:from-black dark:via-black">
                <a
                    className="flex place-items-center gap-2 pb-4 px-2 pt-0 pointer-events-auto text-black bg-white rounded-md"
                    href="/Administracion"
                    rel="noopener noreferrer"
                >
                    Memman -{' '}
                    <img
                        src="/logo.jpg"
                        alt="BaseCamp Peru Logo"
                        className=""
                        width={100}
                        height={24}
                    />
                </a>

                <a
                    href="#"
                    onClick={toggleMenu}
                    className="text-3xl cursor-pointer mx-2 md:hidden"
                >
                    <p>&#9776;</p>
                </a>
            </div>

            {isMenuOpen && (
                <div className="fixed z-50 flex flex-col top-0 bg-zinc-900 w-screen justify-between items-center  text-center text-xl md:flex-row md:space-x-10 md:top-[-12px] [&>a:hover]:bg-zinc-400 [&>a]:w-[150%] [&>a]:p-8">
                    <a href='/Administracion/Membresias'>
                        <p>Membresias y Clases</p>
                    </a>
                    <a href='/Administracion/Programa'>
                        <p>Programacion y Asistencia</p>
                    </a>
                    <a href='/Administracion/Profesores'>
                        <p>Profesores</p>
                    </a>
                    <a href="/Administracion/Matriculas">
                        <p>Matriculas</p>
                    </a>
                    <a href="/">
                        <p>Salir</p>
                    </a>
                </div>
            )}
        </>
    );
};

export default Hamburguer;
