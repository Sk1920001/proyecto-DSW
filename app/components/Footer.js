"use client";
import { useAppContext } from "../index";
import {useEffect,useState} from "react";

export const dynamic = "force-dynamic";


export default function Footer() {
  const {userLanguage}= useAppContext();
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


  return (
    <footer className="bg-zinc-950 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; {data ? data.copy : ""}</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            Facebook
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            Twitter
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
