import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen min-w-screen">
      <div className="w-full items-center justify-center font-mono text-sm lg:flex">
        
        <div id="Main" className="flex flex-col w-auto items-center">
          <Image src="/logo.jpg"
          className=''
          alt="Logo"
          width={300}
          height={80} />
          <p> Memman: Administrador de miembros </p>

          <form className='flex flex-col'>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
            <input type="submit"
            value = "ingresar" className='bg-green-800'/>
          </form>

            <a href="/Dashboard" className=''>Ingresar</a>
        </div>

      </div>
    </main>
  )
}