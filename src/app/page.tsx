import Image from 'next/image'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
export default function Home() {
  return (
    <main className="flex min-h-screen min-w-screen">
      <div className="w-full items-center justify-center font-mono text-sm lg:flex">
        
        <div id="Main" className="flex flex-col w-auto items-center">
          <Image src="/logo.jpg"
          className='m-2'
          alt="Logo"
          width={300}
          height={80} />
          <p className='m-2'> Memman: Administrador de miembros </p>

            <Button href="/Administracion" variant="contained" className='m-2'>Ingresar</Button>
        </div>

      </div>
    </main>
  )
}