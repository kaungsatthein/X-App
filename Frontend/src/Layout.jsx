import React from "react";
import AppDrawer from "./components/AppDrawer";
import NavBar from "./components/NavBar";
import Container from '@mui/material/Container'
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <AppDrawer />
      <NavBar />
      <Container maxWidth="sm">
        <Outlet />
      </Container>
    </>
  );
}
