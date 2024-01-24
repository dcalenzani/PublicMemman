import React from 'react';

const EndPage: React.FC = () => {
    return (
        <div>
            <div className='flex flex-col items-center justify-center h-screen text-center text-3xl space-y-10'>
                <p className='py-4'>Gracias por completar tu información! Disfruta tu dia de escalada</p>
                <a href="https://basecampperu.com" className='border rounded-md bg-yellow-300 text-slate-950 p-4 border-slate-950'>Finalizar.</a>
                <a href="./" className='border rounded-md bg-yellow-300 text-slate-950 p-4 border-slate-950'>Nuevo Ingreso</a> 
            </div>
        </div>
    );
};

export default EndPage;
