"use client";
import { useAppContext } from "../../index";
import AddJewelry from './AddJewelry';

export default function Preferences() {
  const {isAdmin} = useAppContext();

  if(isAdmin){
  return(
    <div>
    <AddJewelry/>

    </div>
  );}

  return(<div>Acceso no permitido </div>);
  
}
