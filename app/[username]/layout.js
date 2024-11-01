"use client";
import Image from "next/image";
import Link from "next/link";
import { useAppContext } from "../index";
import { usePathname} from "next/navigation";

export default function layoutUser({children,params}) {
  const {userName, isAdmin} = useAppContext();
  const pathname = usePathname();

  if (pathname.startsWith(`/${params.username}`)){
  
    return(
      <div>
        <div className="flex flex-row">
        
          <div className="flex flex-col bg-zinc-900 h-screen w-1/6 text-amber-200 text-lg">
            <Link href="/">
              <Image className="mt-5 border-b border-amber-200"src="/altagracia.png" alt="altagracia-logo" width={333} height={69}/>
            </Link>
            <div className="flex justify-center border-b border-amber-200">
              <Link href={`/${userName}/preferences`}>
                <button className={`${pathname === `/${userName}/preferences` 
                    ? "text-amber-400 text-lg my-3" : "hover:text-zinc-100 my-3 "}`}>

                PREFERENCIAS 

                </button>
              </Link>
            </div>
            <div className="flex justify-center border-b border-amber-200">
              <Link href={`/${userName}/purcharse-history`}>
                <button className={`${pathname === `/${userName}/purcharse-history` 
                    ? "text-amber-400 text-lg my-3" : "hover:text-zinc-100 my-3 "}`}>

                COMPRAS

                </button>
              </Link>
            </div>
            <div className="flex justify-center border-b border-amber-200">
              <Link href={`/${userName}/inventory`}>
                <button className={`${pathname === `/${userName}/inventory` 
                    ? "text-amber-400 text-lg my-3" : "hover:text-zinc-100 my-3"}`}>

                  MODIFICAR INVENTARIO

                </button>
              </Link>
            </div>
          </div>
          {children}
        </div>
      </div>

    );
  }

  return (
    <div>Usuario no encontrado...</div>

  );
  
}

