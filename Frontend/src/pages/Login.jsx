import React, { useRef, useState } from "react";
import { Alert, Button, TextField } from "@mui/material";
import { useAuth } from "../providers/AuthProvider";

export default function Login() {
  const handleRef = useRef();
  const passwordRef = useRef();

  const [ hasError, setHasError ] = useState(false)

  const [ setAuth ] = useAuth();

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={ e => {
        e.preventDefault();
        const handle = handleRef.current.value;
        const password = passwordRef.current.value;

        if(!handle || !password) {
          setHasError(true)
          return false;
        } 
        ( async () => {
          const api = import.meta.env.VITE_API_URL;
          const res = await fetch(`${api}/login`, {
            method: "POST",
            body: JSON.stringify({handle,password}),
            headers: {
              "Content-Type": "application/json"
            }
          })
          if(!res.ok) {
            
          }
        })

      }}>
        { hasError && (
          <Alert severity="warning" sx={{ mb: 4 }}>
            Handle or password required!
          </Alert>
        )}
        <TextField
          label="Handle"
          variant="outlined"
          fullWidth
          sx={{ mb: 4 }}
          inputRef={handleRef}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          sx={{ mb: 4 }}
          inputRef={passwordRef}
        />
        <Button fullWidth variant="contained" type="submit">
          Login
        </Button>
      </form>
    </>
  );
}
