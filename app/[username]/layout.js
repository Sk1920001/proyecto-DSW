"use client";
import Image from "next/image";
import Link from "next/link";
import { useAppContext } from "../index";
import { usePathname} from "next/navigation";
import { useState, useEffect } from "react";

export default function layoutUser({children,params}) {
  const {userName,setUserName,setIsAdmin, isAdmin, userEmail, setUserEmail, userLanguage} = useAppContext();
  const pathname = usePathname();
  const [menuValue,setMenuValue] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
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




  function showMenu(){
    if(userName === params.username){
    
      return(
      <div 
        className={`absolute w-screen z-20 transition-all duration-700 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
        }`}
      >
        <div className="flex justify-start bg-zinc-950 text-amber-200 px-3" >

          <div className="grid grid-cols-1 gap-5 py-1 pr-2">

            <div className={`${pathname === `/${userName}/preferences` ? "text-amber-400":""}`}>
              <Link href={`/${userName}/preferences`}>
                <h1>{data ? data.preferences : ""}</h1>
              </Link>
            </div>

            <div className={`${pathname === `/${userName}/purcharse-history` ? "text-amber-400":""}`}>
              <Link href={`/${userName}/purcharse-history`}>
                <h1>{data ? data.purcharseHistory: ""}</h1>
              </Link>
            </div>

            <div className={`${pathname === `/${userName}/inventory` ? "text-amber-400":""}`}>
              {isAdmin &&
              <Link href={`/${userName}/inventory`}>
                <h1>{data ? data.inventory: ""}</h1>
              </Link>}
            </div>

            <div className="text-amber-200">
              <Link href="/">
                <button onClick={()=>{logOutHandleClick()}}>{data ? data.logOut : ""}</button>
              </Link>
            </div>

          </div>
        </div>
      </div>
    );
    }
  }

  const handleClick = () => {
    if (menuValue) {
      setIsVisible(false);
      setTimeout(() => setMenuValue(false), 700); 
    } else {
      setMenuValue(true);
      setTimeout(() => setIsVisible(true), 50); 
    }
  };

  const logOutHandleClick = () =>{
    setUserName("");
    localStorage.setItem("user","");
    setIsAdmin(false);
    localStorage.setItem("admin",false);
    setUserEmail("");
    localStorage.setItem("email","");
  }


  if (userName === params.username){
  
    return(
      <div>

        <div className="flex flex-col md:flex-row">

          <div className="block md:hidden bg-zinc-900">
            <Link href="/">
              <Image className="mx-auto pt-12 mt-1" src="/altagracia.png" alt="altagracia-logo" width={500} height={104}/>
            </Link>
          </div>

          <div className="flex justify-end bg-zinc-950 block md:hidden p-1">
            <button onClick={() => handleClick(menuValue)} className="flex flex-col items-center justify-center w-10 h-10 space-y-1  bg-zinc-950 hover:bg-gray-300 focus:outline-none">
              <span className="block w-6 h-0.5 bg-amber-200"></span>
              <span className="block w-6 h-0.5 bg-amber-200"></span>
              <span className="block w-6 h-0.5 bg-amber-200"></span>
            </button>
          </div>
          <div>{menuValue && showMenu()}</div>

       
          <div className="hidden md:flex flex-col bg-zinc-900 h-screen w-1/3 lg:w-1/4 xl:w-1/6 text-amber-200 text-lg">
            <Link href="/">
              <Image className="mt-5 border-b border-amber-200"src="/altagracia.png" alt="altagracia-logo" width={333} height={69}/>
            </Link>
            <div className="flex justify-center border-b border-amber-200">
              <Link href={`/${userName}/preferences`}>
                <button className={`${pathname === `/${userName}/preferences` 
                    ? "text-amber-400 text-lg my-3" : "hover:text-zinc-100 my-3 "}`}>

                {data ? data.preferences : ""}

                </button>
              </Link>
            </div>
            <div className="flex justify-center border-b border-amber-200">
              <Link href={`/${userName}/purcharse-history`}>
                <button className={`${pathname === `/${userName}/purcharse-history` 
                    ? "text-amber-400 text-lg my-3" : "hover:text-zinc-100 my-3 "}`}>

                {data ? data.purcharseHistory: ""}

                </button>
              </Link>

            </div>

            {isAdmin && (
              <div className="flex justify-center border-b border-amber-200">
                <Link href={`/${userName}/inventory`}>
                  <button className={`${pathname === `/${userName}/inventory` 
                      ? "text-amber-400 text-lg my-3" : "hover:text-zinc-100 my-3"}`}>

                    {data ? data.inventory: ""}

                  </button>
                </Link>
              </div>)}

            <div className="flex justify-center border-b border-amber-200">
              <Link href="/">
                <button onClick={()=>{logOutHandleClick()}} className="text-amber-200 text-lg my-3">{data ? data.logOut: ""}</button>
              </Link>
            </div>

          </div>

          {children}
        </div>
      </div>

    );
  }

  return (
    <div>
      <div className="bg-zinc-900">
        <Link href="/">
          <Image className="mx-auto pt-5" src="/altagracia.png" alt="altagracia-logo" width={500} height={104}/>
        </Link>
      </div>
      <h1>Usuario no encontrado...</h1>

    </div>
  );
  
}

