import React, { useRef, useState } from "react";
import { TextField, Button, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [hasError, setHasError] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState();

  const nameRef = useRef();
  const handleRef = useRef();
  const profileRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={ e => {
        e.preventDefault();
        const name = nameRef.current.value;
        const handle = handleRef.current.value;
        const profile = profileRef.current.value;
        const password = passwordRef.current.value;

        if(!name || !handle || !password) {
          setErrorMessage("There are any missing.")
          setHasError(true);
          return false;
        } 
        ( async () => {
          const api = import.meta.env.VITE_API_URL;
          const res = await fetch(`${api}/users`,{
            method: "POST",
            body: JSON.stringify({ name, handle, profile, password}),
            headers: {
              "Content-Type" : "application/json"
            }
          })
          if(!res) {
            setErrorMessage((await res.json()).msg)
            setHasError(true);
            return false;
          }
          navigate("/login")
        })();
      }}>
        {hasError && (
          <Alert severity="warning" sx={{ mb: 4 }}>
            {errorMessage}
          </Alert>
        )}
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          sx={{ mb: 4 }}
          inputRef={nameRef}
        />
        <TextField
          label="Handle"
          variant="outlined"
          fullWidth
          sx={{ mb: 4 }}
          inputRef={handleRef}
        />
        <TextField
          label="Profile/Bio"
          variant="outlined"
          fullWidth
          sx={{ mb: 4 }}
          inputRef={profileRef}
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
          Register
        </Button>
      </form>
    </>
  );
}
