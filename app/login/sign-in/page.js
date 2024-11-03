"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react"; 
import axios from "axios";
import { useAppContext } from "../../index";
import { useRouter } from "next/navigation";

function page() {
  
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const {isAdmin,setIsAdmin,userName,setUserName,userEmail,setUserEmail,userLanguage} = useAppContext();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const setLocalStorageUserName = value =>{
    try{
      setUserName(value);
      localStorage.setItem("user",value);
    }catch(error){
      console.error(error);
    }
  }

  const setLocalStorageEmail = value =>{
    try{
      setUserEmail(value);
      localStorage.setItem("email",value);
    }catch(error){
      console.error(error);
    }
  }

  const setLocalStorageAdmin= value =>{
    try{
      setIsAdmin(value);
      localStorage.setItem("admin",value);
    }catch(error){
      console.error(error);
    }
  }


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
      setLocalStorageAdmin(userData.admin);
      setLocalStorageUserName(userData.user);
      setLocalStorageEmail(userData.email);
      router.push("/");







    }catch (error){
      console.error("Error al logear el usuario",error);
    }

  }

  return(
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm px-5">
        <form onSubmit={handelSubmit} className="space-y-6" action="#" method="POST">

          <div>

            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">{data ? data.email : ""}</label>
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
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">{data ? data.password: ""}</label>
              <div className="text-sm">
                <Link href="#" className="font-semibold text-zinc-900 hover:text-amber-500">{data ? data.forgotPassword : ""}</Link>

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
            <button type="submit" className="flex w-full justify-center rounded-md bg-zinc-950 px-3 py-1.5 text-sm font-semibold leading-6 text-zinc-100 shadow-sm hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950">{data ? data.logIn: ""}</button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          {data ? data.noAccount: ""}  
          <Link href="/login/sign-up" className="font-semibold leading-6 text-zinc-900 hover:text-amber-500 pl-1">{data ? data.clickHere: ""}</Link>
        </p>
      </div>
  );
  
}


export default page;
