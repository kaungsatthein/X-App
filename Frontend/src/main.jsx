import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import UIStateProvider from "./providers/UIStateProvider.jsx";
import AppThemeProvider from "./providers/AppThemeProvider.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppThemeProvider>
      <AuthProvider>
      <UIStateProvider>
        <App />
      </UIStateProvider>
      </AuthProvider>
    </AppThemeProvider>
  </React.StrictMode>
);
