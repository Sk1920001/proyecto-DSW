"use client";
import { useEffect, createContext, useContext, useState} from "react";

const AppContext = createContext();

export function AppWrapper({children}) {
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const adminValue = localStorage.getItem("admin");
    if (adminValue !== null) {
      setIsAdmin(JSON.parse(adminValue)); // O convertir a booleano si es un string
    }

    const nameValue = localStorage.getItem("user");
    if (nameValue !== null) {
      setUserName(nameValue);
    }

    const emailValue = localStorage.getItem("email");
    if (emailValue !== null) {
      setUserEmail(emailValue);
    }
  }, []);

  return(
    <AppContext.Provider value={{
      isAdmin,
      setIsAdmin,
      userName,
      setUserName,
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
