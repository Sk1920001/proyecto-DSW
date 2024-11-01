"use client";
import { useRouter } from "next/navigation";
import { useAppContext } from "../../index";

export default function userPage({params}) {

  const {userName,isAdmin} = useAppContext();
  console.log(params.username);
  console.log(userName);

  if (userName !== params.username){
    return(
      <div>User Not Found</div>
    );
  }

  return(
    <div>Hola usuario {userName}</div>
  );
  
}
