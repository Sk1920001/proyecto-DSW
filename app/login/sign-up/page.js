"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function page() {
  
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  const router = useRouter();


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
        console.log('Las contraseñas no coinciden');
        return;
    }

    try {
        const response = await axios.post("/api/register",{username:userName,password:password,email:email});
        

        if (!response) {
            const errorData = await response.data;
            console.error('Error al registrar el usuario:', errorData.message);
            return;
        }

        const result = await response.data;
        console.log('Usuario registrado exitosamente:', result);
        router.push("/login/sign-in");
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
    }
};

  
  return(
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm px-5">
        <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
          <div>
            <label htmlFor="user_name" className="block text-sm font-medium leading-6 text-gray-900">Nombre de usuario</label>
            <div className="mt-2">
              <input 
              value={userName} 
              required
              onChange = {(e) => setUserName(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 px-2 focus:ring-inset focus:ring-zinc-900 sm:text-sm sm:leading-6"/>
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Dirección de email</label>
            <div className="mt-2">
              <input 
              id="email" 
              name="email" 
              type="email"
              value={email}
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 px-2 focus:ring-2 focus:ring-inset focus:ring-zinc-900 sm:text-sm sm:leading-6"/>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Contraseña</label>
            </div>
            <div className="mt-2">
              <input 
              id="password" 
              name="password" 
              type="password" 
              autoComplete="current-password"
              value={password}
              onChange = {(e) =>{setPassword(e.target.value)}}
              required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 px-2 focus:ring-2 focus:ring-inset focus:ring-zinc-900 sm:text-sm sm:leading-6"/>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Repita la contraseña</label>
            </div>
            <div className="mt-2">
              <input 
              id="password" 
              name="password"
              type="password" 
              autoComplete="current-password" 
              required 
              value={confirmPassword}
              onChange={(e) =>{setConfirmPassword(e.target.value)}}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 px-3 focus:ring-2 focus:ring-inset focus:ring-zinc-900 sm:text-sm sm:leading-6"/>
            </div>
          </div>

          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-zinc-950 px-3 py-1.5 text-sm font-semibold leading-6 text-zinc-100 shadow-sm hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950">Iniciar sesión</button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          ¿Ya tiene cuenta?  
          <Link href="/login/sign-in" className="font-semibold leading-6 text-zinc-900 hover:text-amber-500 pl-1">Haga click aquí</Link>
        </p>
      </div>
  );
  
};


