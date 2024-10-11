import Link from "next/link";
import Image from "next/image";


function LandingPage() {
  return(
    <div>

      <div className="flex flex-row h-1/5 py-1 justify-center md:justify-end bg-zinc-900 text-amber-200">
        <button className="hover:text-zinc-100">Iniciar sesión</button>
        <h1 className="px-1">|</h1>
        <button className="pr-5 hover:text-zinc-100">Registrarse</button>
      </div>

      <div className="flex flex-row bg-zinc-900 text-amber-200 h-1/6" >
        <Image className="mx-auto my-auto pt-5 " src="/altagracia.png" alt="altagracialogo" width={500} height={104} />
        
      </div>
      <div className="flex justify-center  text-lg mx-auto bg-zinc-950 text-amber-200" >
        <div className="flex justify-between md:w-1/3 lg:w-1/5 py-1">
          <Link href="/men_jewerly">
            <button className="px-5 hover:text-zinc-100">Hombre</button>
          </Link>
          
          <Link href="/women_jewerly">
          <button className="px-5 hover:text-zinc-100">Mujer</button>
          </Link>

          <Link href="/contact"> 
          <button className="px-5 hover:text-zinc-100">Contacto</button>
          </Link>
        </div>

        
      </div>
    </div>

  );
  
}

export default LandingPage; 
