import React from "react";
import ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";
import ThemeOption from "./components/ThemeOption";
import "./style.css";

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <ThemeOption>
         <CssBaseline />
         <App />
      </ThemeOption>
   </React.StrictMode>
);