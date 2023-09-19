import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./routers/AppRouter.jsx";
import "./index.css";
import { FavsProvider } from '../src/context/FavsContext'; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FavsProvider>
    <AppRouter />
    </FavsProvider>
  </React.StrictMode>
);
