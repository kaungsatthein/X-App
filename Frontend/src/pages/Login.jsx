import React, { useRef, useState } from "react";
import { Alert, Button, TextField } from "@mui/material";
import { useAuth } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const handleRef = useRef();
  const passwordRef = useRef();

  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const { setAuth, setAuthUser } = useAuth();

  const navigate = useNavigate();

  return (
    <>
      <h1>Login</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const handle = handleRef.current.value;
          const password = passwordRef.current.value;

          if (!handle || !password) {
            setErrorMessage("Handle or password required.");
            setHasError(true);
            return false;
          }
          (async () => {
            const api = import.meta.env.VITE_API_URL;
            const res = await fetch(`${api}/login`, {
              method: "POST",
              body: JSON.stringify({ handle, password }),
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (!res.ok) {
              setErrorMessage((await res.json()).msg);
              setHasError(true);
              return false;
            }
            const data = await res.json();
            localStorage.setItem("token", data.token)
            fetch(`${api}/verify`, {
              headers: {
                Authorization: `Bearer ${data.token}`
              }
            })
            .then(res=>res.json())
            .then(user=>{
              setAuth(true);
              setAuthUser(user)
              navigate("/")
            })
          })();
        }}
      >
        {hasError && (
          <Alert severity="warning" sx={{ mb: 4 }}>
            {errorMessage}
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
