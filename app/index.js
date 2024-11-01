"use client";
import { createContext, useContext, useState} from "react";

const AppContext = createContext();

export function AppWrapper({children}) {
  
  const [isAdmin,setIsAdmin] = useState(false);
  const [userName, setUserName] = useState("");
  const [logedIn,setLogedIn] = useState(false);
  const [userEmail,setUserEmail] = useState("")

  return(
    <AppContext.Provider value={{
      isAdmin,
      setIsAdmin,
      userName,
      setUserName,
      logedIn,
      setLogedIn,
      userEmail,
      setUserEmail
    }}>
      {children}
    </AppContext.Provider>


  );
  
}

export function useAppContext(){
  return useContext(AppContext);
}
