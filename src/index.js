// index.js - نسخة مبسطة مؤقتًا
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";

// Context Imports
import { AuthProvider } from "./context/AuthContext";
// ✅.LanguageProvider هنضيفه بعدين لما نخلص الترجمات

// Theme بسيط بدون date-fns
const theme = createTheme({
  typography: {
    fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
  },
  palette: {
    primary: { main: "#667eea" },
    secondary: { main: "#f093fb" },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <BrowserRouter>
          <AuthProvider>
            {/* ✅ LanguageProvider هنضيفه بعدين */}
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <App />
            </ThemeProvider>
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();

// Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("✅ Service Worker registered:", registration.scope);
      })
      .catch((error) => {
        console.error("❌ Service Worker registration failed:", error);
      });
  });
}