"use client";
import { useAppContext } from "../index";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function UserBar(){
  const path = usePathname();
  const {userName,logedIn}= useAppContext();
  return(
    <div>

      <div>
        {!logedIn &&( 
        <div className="flex flex-row h-1/5 py-1 justify-center md:justify-end bg-zinc-900 text-amber-200">
          <Link href="/login/sign-in">
            <button className="hover:text-zinc-100">Iniciar sesión</button>
          </Link>
          <h1 className="px-1">|</h1>

          <Link href="/login/sign-up">
            <button className="pr-5 hover:text-zinc-100">Registrarse</button>
          </Link>
        </div>
        )}
      </div>
      
      <div>
        {logedIn &&(!path.startsWith(`/${userName}`)) && (
        <div className="flex flex-row h-1/5 py-1 justify-center md:justify-end bg-zinc-900 text-amber-200">
          <Link href={`/${userName}/userpage`}>
            <button className="hover:text-zinc-100 px-2">{userName}</button>
          </Link>
        </div>
        )}
      </div>
      
    </div>

  );
}
