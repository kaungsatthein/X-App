import React, { createContext, useContext, useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";

const AppThemeContext = createContext();

export function useAppTheme() {
  return useContext(AppThemeContext);
}

export default function AppThemeProvider({ children }) {
  const [mode, setMode] = useState("light");
  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode,
        ...(mode === "light"
          ? {
              header: { background: deepPurple[400] },
              banner: { background: "#e1e1e1"}
            }
          : {
              header: { background: deepPurple[900] },
              banner: { background: "#222"}
            }),
      },
    });
  }, [mode]);
  return (
    <AppThemeContext.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppThemeContext.Provider>
  );
}
