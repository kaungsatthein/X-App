import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState(false);
  const [authUser, setAuthUser] = useState({});
  
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setAuth(false);
      setAuthUser({});
      return;
    }

    (async () => {
      const api = import.meta.env.VITE_API_URL;

      const res = await fetch(`${api}/verify`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const user = await res.json();
        setAuth(true);
        setAuthUser(user);
      } else {
        setAuth(false);
        setAuthUser({});
      }
    })();
  }, [token]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
}
