"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAppContext } from "../../index";
import * as Yup from "yup";

export default function page() {
  
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  const router = useRouter();
  const {userLanguage} = useAppContext();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);

  const [validationSchema, setValidationSchema] = useState(Yup.object({}));



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
  }, [userLanguage]);

  useEffect(() => {
    if( data != null ) {
      const newValidationSchema = Yup.object({
        userName:Yup.string().required(data.req_username),
        email:Yup.string().email(data.format_email).required(data.req_email),
        password:Yup.string().required(data.req_password)
        .min(8,data.min_password)
        .matches(/[0-9]/, data.num_password)
        .matches(/[A-Z]/, data.upper_password)
        .matches(/[a-z]/, data.lower_password),
        confirmPassword:Yup.string().oneOf([Yup.ref("password")], data.match_passwords)
        .required(data.req_password)
      });
      setValidationSchema(newValidationSchema);
      setFormErrors({});
      setIsRegistered(false);
    };
  },[data]);



  const handleSubmit = async (event) => {
    setIsRegistered(false);
    setFormErrors({});
    event.preventDefault();
    /*
    if (password !== confirmPassword) {
        console.log('Las contraseñas no coinciden');
        return;
    }*/

    try {
        await validationSchema.validate({userName:userName,
                                        email:email,password:password,
                                        confirmPassword:confirmPassword},
                                        {abortEarly: false});
        console.log("Form Submitted");
        const response = await axios.post("/api/register",{username:userName,password:password,email:email});
        

        const result = await response.data;
        console.log('Usuario registrado exitosamente:', result);
        router.push("/login/sign-in");
    } catch (error) {
        if(error instanceof Yup.ValidationError){
          const newErrors = {};
          error.inner.forEach(err =>{
            newErrors[err.path] = err.message;
          })
          setFormErrors(newErrors);
          console.log(formErrors);
          return
        }
        console.error('Error al registrar el usuario:', error);
        setIsRegistered(true);
    }
};

  
  return(
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm px-5">
        <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
          <div>
            <label htmlFor="user_name" className="block text-sm font-medium leading-6 text-gray-900">{data ? data.username : ""}</label>
            <div className="mt-2">
              <input 
              value={userName} 
              
              onChange = {(e) => setUserName(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 px-2 focus:ring-inset focus:ring-zinc-900 sm:text-sm sm:leading-6"/>
            </div>
            {formErrors.userName && <h1 className="text-red-500 text-sm">{formErrors.userName}</h1>}
          </div>


          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">{data ? data.email: ""}</label>
            <div className="mt-2">
              <input 
              id="email" 
              name="email" 
              type="text"
              value={email}
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 px-2 focus:ring-2 focus:ring-inset focus:ring-zinc-900 sm:text-sm sm:leading-6"/>
            </div>
            {formErrors.email && <h1 className="text-red-500 text-sm">{formErrors.email}</h1>}
          </div>


          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">{data ? data.password : ""}</label>
            </div>
            <div className="mt-2">
              <input 
              id="password" 
              name="password" 
              type="password" 
              autoComplete="current-password"
              value={password}
              onChange = {(e) =>{setPassword(e.target.value)}}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 px-2 focus:ring-2 focus:ring-inset focus:ring-zinc-900 sm:text-sm sm:leading-6"/>
            </div>
            {formErrors.password && <h1 className="text-red-500 text-sm">{formErrors.password}</h1>}
          </div>



          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">{data ? data.repeatPassword: ""}</label>
            </div>
            <div className="mt-2">
              <input 
              id="password" 
              name="password"
              type="password" 
              autoComplete="current-password" 
              
              value={confirmPassword}
              onChange={(e) =>{setConfirmPassword(e.target.value)}}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 px-3 focus:ring-2 focus:ring-inset focus:ring-zinc-900 sm:text-sm sm:leading-6"/>
            </div>
            {formErrors.confirmPassword && <h1 className="text-red-500 text-sm">{formErrors.confirmPassword}</h1>}
          </div>



          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-zinc-950 px-3 py-1.5 text-sm font-semibold leading-6 text-zinc-100 shadow-sm hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950">{data ? data.signUp: ""}</button>
          </div>
        </form>
        {isRegistered && <h1 className="text-red-500 text-sm pt-1 text-center ">{data ? data.is_registered : ""}</h1>}

        <p className="mt-5 text-center text-sm text-gray-500">
          {data ? data.gotAccount: ""}  
          <Link href="/login/sign-in" className="font-semibold leading-6 text-zinc-900 hover:text-amber-500 pl-1">{data ? data.clickHere: ""}</Link>
        </p>
      </div>
  );
  
};


