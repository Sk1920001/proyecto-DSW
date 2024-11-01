"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";


function LandingPage() {


  const [menuValue,setMenuValue] = useState(0);


  function showMenu(){

      return(
        <div className="flex justify-start bg-zinc-950 text-amber-200 px-3" >

          <div className="grid grid-cols-1 gap-5 py-1 pr-2">

            <div className="hover:text-zinc-100">
              <Link href="/products/stainless-steel-jewelry">
                <h1>ACERO INOXIDABLE</h1>
              </Link>
            </div>

            <div className="hover:text-zinc-100">
              <Link href="/products/silver-plated-jewelry">
                <h1>BAÑADAS EN PLATA</h1>
              </Link>
            </div>

            <div className="hover:text-zinc-100">
              <Link href="/products/gold-plated-jewelry">
                <h1>BAÑADAS EN ORO</h1>
              </Link>
            </div>

            <div className="hover:text-zinc-100">
              <Link href="/products/silver-jewelry">
                <h1>PLATA SÓLIDA</h1>
              </Link>
            </div>
    
        </div>
      </div>
    );
  }

  const handleClick = (menuValue) =>{
    if(menuValue){
      setMenuValue(0);
    }else{
      setMenuValue(1);
    }

  }




  return(
    <div>

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
        {menuValue === 1 && showMenu()}
      </div>

      <div className="hidden md:flex justify-center bg-zinc-950 text-amber-200" >

        <div className="grid grid-cols-2  gap-5  md:grid-cols-4 py-1">

          <div className="hover:text-zinc-100">
            <Link href="/products/stainless-steel-jewelry">
              <h1>ACERO INOXIDABLE</h1>
            </Link>
          </div>

          <div className="hover:text-zinc-100">
            <Link href="/products/silver-plated-jewelry">
              <h1>BAÑADAS EN PLATA</h1>
            </Link>
          </div>

          <div className="hover:text-zinc-100">
            <Link href="/products/gold-plated-jewelry">
              <h1>BAÑADAS EN ORO</h1>
            </Link>
          </div>

          <div className="hover:text-zinc-100">
            <Link href="/products/silver-jewelry">
              <h1>PLATA SÓLIDA</h1>
            </Link>
          </div>
    
        </div>

        
      </div>
    </div>

  );
  
}

export default LandingPage; 
