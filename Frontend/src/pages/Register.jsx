import React, { useRef, useState } from "react";
import { TextField, Button, Alert } from "@mui/material";

export default function Register() {
  const [hasError, setHasError] = useState(false);
  const nameRef = useRef();
  const handleRef = useRef();
  const profileRef = useRef();
  const passwordRef = useRef();
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
          setHasError(true);
        } else {
          console.log(name, handle, profile, password);
        }
      }}>
        {hasError && (
          <Alert severity="warning" sx={{ mb: 4 }}>
            Name, Handle or password required!
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
