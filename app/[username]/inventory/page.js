"use client";
import { useAppContext } from "../../index";

export default function Preferences() {
  const {isAdmin} = useAppContext();

  if(isAdmin){
  return(
    <div>Inventario...</div>
  );}

  return(<div>Acceso no permitido </div>);
  
}
