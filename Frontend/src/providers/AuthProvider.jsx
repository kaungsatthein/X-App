import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext();

export function useAuth () {
    return useContext(AuthContext)
}

export default function AuthProvider({children}) {
    const [ auth, setAuth ] = useState(false)
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
        {children}
    </AuthContext.Provider>
  )
}
