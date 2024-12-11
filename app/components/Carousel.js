"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Carousel(){
  const images_path = ["/modelo.png","/modelo_joyas_322.webp","/modelo3.webp"];
  const [currIndex, setCurrIndex] = useState(0);

  useEffect(() =>{
    const timer = setTimeout(() => {
      handleNext();
      console.log("Tiempo");
    },2000)
    return () => clearTimeout(timer);
  },[currIndex]);

  const handleNext = () => {
    setCurrIndex((prevIndex) => prevIndex === images_path.length - 1 ? 0 : prevIndex + 1);
  };
  
  const handlePrev = () => {
    setCurrIndex((prevIndex) => prevIndex === 0 ? images_path.length - 1 : prevIndex - 1);
  };

  return(
    <div className="relative w-full max-w-6xl  mx auto overflow-hidden">
      <div className="flex transition-transform duration-500" style={{ transform : `translateX(-${currIndex * 100}%)`}}>
        {images_path.map((src, index) =>(
          <Image key={index} src={src} alt={`Slide ${index}`} width={1170} height={512} className=" object-cover w-full flex-shrink-0" quality={100}/>
        ))}
      </div>
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-amber-900 text-xl  px-4 py-2  rounded-full shadow-lg"
        onClick={handlePrev}
      >
        &lt;
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2  text-amber-900 text-xl  px-4 py-2  rounded-full shadow-lg"
        onClick={handleNext}
      >
        &gt; 
      </button>

    </div>

  );

}
