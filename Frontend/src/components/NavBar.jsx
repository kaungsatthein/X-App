import React from "react";
import { AppBar, Toolbar, IconButton, Box } from "@mui/material";
import {
  Menu as MenuIcon,
  X as XIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Notifications as NotisIcon,
} from "@mui/icons-material";
import { useUIState } from "../providers/UIStateProvider";
import { useAppTheme } from "../providers/AppThemeProvider";

export default function NavBar() {
  const { setOpenDrawer } = useUIState();
  const { mode, setMode } = useAppTheme();
  return (
    <AppBar position="static" sx={{ bgcolor: "header.background" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton color="inherit" onClick={() => setOpenDrawer(true)}>
          <MenuIcon />
        </IconButton>
        <XIcon />
        <Box>
          {mode === "dark" ? (
            <IconButton color="inherit" onClick={() => setMode("light")}>
              <LightModeIcon />
            </IconButton>
          ) : (
            <IconButton color="inherit" onClick={() => setMode("dark")}>
              <DarkModeIcon />
            </IconButton>
          )}
          <IconButton color="inherit">
            <NotisIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
