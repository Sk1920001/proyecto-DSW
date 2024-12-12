"use client";
import { useRouter } from "next/navigation";
import { useAppContext } from "../../index";
import axios from 'axios';
import { useState, useEffect } from 'react';
import Image from "next/image";

export default function userPage({params}) {

  const { userName, isAdmin, userLanguage } = useAppContext();
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



  if (userName !== params.username){
    return(
      <div>User Not Found</div>
    );
  }

  return(
    <div className = "text-center p-5">
      <Image className="mx-auto pt-12 mt-1" src="/altagracia.png" alt="altagracia-logo" width={1024} height={500}/>
    </div>
  );
  
}
