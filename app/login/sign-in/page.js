"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react"; 
import axios from "axios";
import { useAppContext } from "../../index";
import { useRouter } from "next/navigation";

function page() {
  
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const {isAdmin,setIsAdmin,userName,setUserName,logedIn,setLogedIn,userEmail,setUserEmail} = useAppContext();
  const router = useRouter();
  
  const handelSubmit = async(envent) =>{
    event.preventDefault();

    try{
      const response = await axios.post("/api/login",{email:email,password:password});
      
      if(!response){
        const errorData = await response.data;
        console.error('Error al logear el usuario:', errorData.message);
        return;
      }


      const userData = await response.data;
      setIsAdmin(userData.admin);
      setUserName(userData.user);
      setLogedIn(true);
      setUserEmail(userData.email);
      router.push("/");







    }catch (error){
      console.error("Error al logear el usuario",error);
    }

  }

  return(
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm px-5">
        <form onSubmit={handelSubmit} className="space-y-6" action="#" method="POST">

          <div>

            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Dirección de email</label>
            <div className="mt-2">
              <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 px-2 focus:ring-inset focus:ring-zinc-900 sm:text-sm sm:leading-6"/>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Contraseña</label>
              <div className="text-sm">
                <Link href="#" className="font-semibold text-zinc-900 hover:text-amber-500">¿Olvidó su contraseña?</Link>

              </div>
            </div>
            <div className="mt-2">
              <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 px-2 focus:ring-2 focus:ring-inset focus:ring-zinc-900 sm:text-sm sm:leading-6"/>
            </div>
          </div>

          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-zinc-950 px-3 py-1.5 text-sm font-semibold leading-6 text-zinc-100 shadow-sm hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950">Iniciar sesión</button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          ¿No tiene cuenta?  
          <Link href="/user/sign-up" className="font-semibold leading-6 text-zinc-900 hover:text-amber-500 pl-1">Haga click aquí crearla</Link>
        </p>
      </div>
  );
  
}


export default page;
