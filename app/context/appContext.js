'use client'
 
import { createContext, useContext, useState } from 'react'
 
const AppContext = createContext({})
 
export const AppContextProvider = ({ children }) => {
  const [working, setWorking] = useState('yes!');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  
  return (
    <AppContext.Provider value={{ working, setWorking, isAuthenticated, setIsAuthenticated, user, setUser }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext);