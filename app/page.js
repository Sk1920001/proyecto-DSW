"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAppContext } from "./index";
import axios from "axios";
import Carousel from "./components/Carousel";
import RecomendedProducts from "./components/RecomendedProducts";
import Footer from "./components/Footer";


function LandingPage() {


  const [menuValue,setMenuValue] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const {userLanguage,products,setProducts} = useAppContext();
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

  //This useEffect changes the products data
  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await axios.get("/api/products");
          

          if (!response) {
              const errorData = await response.data;
              console.error('Error while fetching data :', errorData.message);
              return;
          }

          console.log('Data fetched succesfully');
          setProducts(response.data.productsData);
          

      } catch (error) {
          console.error('Error while fetching data:', error);
      
      };
    };

    fetchData();
  }, []); 




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

      <div className="hidden text-sm lg:text-base md:flex justify-center bg-zinc-950  shadow-lg  text-amber-200" >

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
      <div className= "flex mx-auto justify-center items-center  mb-auto py-5 bg-gray-100">
        <Carousel/>
      </div>
      <h1 className="bg-amber-950 text-center text-2xl  py-4 text-zinc-100 font-thin">PRODUCTOS POPULARES</h1>
      <RecomendedProducts category={"Acero inoxidable"}/>
    </div>

  );
  
}

export default LandingPage; 
