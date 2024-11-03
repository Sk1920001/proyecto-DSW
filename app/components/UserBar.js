"use client";
import { useAppContext } from "../index";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {useEffect,useState} from "react";

export const dynamic = "force-dynamic";

export default function UserBar(){
  const path = usePathname();
  const {userName, userLanguage, setUserLanguage}= useAppContext();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Asegúrate de usar la ruta correcta al JSON
        const response = await fetch(`/messages/${userLanguage}.json`);
        

        if (!response.ok) {
          throw new Error('Error en la carga de datos');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [userLanguage]); // hace el fetch cada vez que se actualiza userLanguage;

  const handleClickEN = () =>{
    if(userLanguage !== "en"){
      setUserLanguage("en");
      localStorage.setItem("lang","en");
    }
  }
  const handleClickES = () =>{
    if(userLanguage !== "es"){
      setUserLanguage("es");
      localStorage.setItem("lang","es");
    }
  }



  return(
    <div>

      <div>
        {(userName === "") && ( 
        <div className="flex flex-row h-1/5 py-1 justify-between text-xs md:text-sm lg:text-base bg-zinc-900 text-amber-200">
            <div className="flex flex-row px-2">
              <button onClick={()=>handleClickEN()} className={`${userLanguage === "en" ? "text-amber-400" : "hover:text-zinc-200"}`}>EN</button>
              <h1 className="px-1">|</h1>
              <button onClick={()=>handleClickES()} className={`${userLanguage === "es" ? "text-amber-400" : "hover:text-zinc-200"}`}>ES</button>
            </div>

            <div className="flex flex-row px-2">
              <Link href="/login/sign-in">
                <button className="hover:text-zinc-100">{data ? data.logIn : ""}</button>
              </Link>
              <h1 className="px-1">|</h1>

              <Link href="/login/sign-up">
                <button className="hover:text-zinc-100">{data ? data.signUp : ""}</button>
              </Link>
            </div>


  
        </div>
        )}
      </div>
      
      <div>
        {(userName !== "") && (!path.startsWith(`/${userName}`)) && (

        <div className="flex flex-row h-1/5 py-1 items-center justify-between text-xs md:text-sm lg:text-base bg-zinc-900 text-amber-200">
          <div className="flex flex-row px-2">
            <button onClick={()=>handleClickEN()} className={`${userLanguage === "en" ? "text-amber-400" : "hover:text-zinc-200"}`}>EN</button>
            <h1 className="px-1">|</h1>
            <button onClick={()=>handleClickES()} className={`${userLanguage === "es" ? "text-amber-400" : "hover:text-zinc-200"}`}>ES</button>
          </div>
          <div className="flex flex-row items-center">
            <div className="flex items-center justify-center w-3 h-3 rounded-full bg-amber-200">
            </div>

            <Link href={`/${userName}/userpage`}>
              <button className="hover:text-zinc-100 px-2">{userName}</button>
            </Link>
          </div>
          </div>
        )}
      </div>
      
    </div>

  );
}
