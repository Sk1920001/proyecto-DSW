"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAppContext } from "./index";


function LandingPage() {


  const [menuValue,setMenuValue] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const {userLanguage} = useAppContext();
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

      return(
      <div 
        className={`absolute w-screen z-20 transition-all duration-700 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
        }`}
      >
        <div className="flex justify-start bg-zinc-950 text-amber-200 px-3" >

          <div className="grid grid-cols-1 gap-5 py-1 pr-2">

            <div className="hover:text-zinc-100">
              <Link href="/products/stainless-steel-jewelry">
                <h1>{data ? data.stainlessSteel : ""}</h1>
              </Link>
            </div>

            <div className="hover:text-zinc-100">
              <Link href="/products/silver-plated-jewelry">
                <h1>{data ? data.silverPlated : ""}</h1>
              </Link>
            </div>

            <div className="hover:text-zinc-100">
              <Link href="/products/gold-plated-jewelry">
                <h1>{data ? data.goldPlated : ""}</h1>
              </Link>
            </div>

            <div className="hover:text-zinc-100">
              <Link href="/products/silver-jewelry">
                <h1>{data ? data.silver : ""}</h1>
              </Link>
            </div>
    
          </div>
        </div>
      </div>
    );
  }

 const handleClick = () => {
  if (menuValue) {
    setIsVisible(false);
    setTimeout(() => setMenuValue(false), 700); // Espera la duración de la animación antes de ocultar el menú
  } else {
    setMenuValue(true);
    setTimeout(() => setIsVisible(true), 50); // Da un pequeño retraso para activar la animación
  }
};





  return(
    <div className="relative">

      <div className="flex flex-row bg-zinc-900 text-amber-200 h-1/6" >
        <Image className="mx-auto my-auto pt-5 " src="/altagracia.png" alt="altagracialogo" width={500} height={104} />
      </div>

      <div className="flex justify-end bg-zinc-950 block md:hidden p-1">
        <button onClick={() => handleClick(menuValue)} className="flex flex-col items-center justify-center w-10 h-10 space-y-1  bg-zinc-950 hover:bg-gray-300 focus:outline-none">
          <span className="block w-6 h-0.5 bg-amber-200"></span>
          <span className="block w-6 h-0.5 bg-amber-200"></span>
          <span className="block w-6 h-0.5 bg-amber-200"></span>
        </button>
      </div>
      
      <div>
        {menuValue && showMenu()}
      </div>

      <div className="hidden md:flex justify-center bg-zinc-950 text-amber-200" >

        <div className="grid grid-cols-2  gap-5  md:grid-cols-4 py-1">

          <div className="hover:text-zinc-100">
            <Link href="/products/stainless-steel-jewelry">
              <h1>{data ? data.stainlessSteel: ""}</h1>
            </Link>
          </div>

          <div className="hover:text-zinc-100">
            <Link href="/products/silver-plated-jewelry">
              <h1>{data ? data.silverPlated: ""}</h1>
            </Link>
          </div>

          <div className="hover:text-zinc-100">
            <Link href="/products/gold-plated-jewelry">
              <h1>{data ? data.goldPlated: ""}</h1>
            </Link>
          </div>

          <div className="hover:text-zinc-100">
            <Link href="/products/silver-jewelry">
              <h1>{data ? data.silver: ""}</h1>
            </Link>
          </div>
    
        </div>

        
      </div>
    </div>

  );
  
}

export default LandingPage; 
