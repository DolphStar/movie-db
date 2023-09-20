import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./routers/AppRouter.jsx";
import "./index.css";
import { FavoritesProvider } from './context/FavoritesContext.jsx'; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FavoritesProvider>
    <AppRouter />
    </FavoritesProvider>
  </React.StrictMode>
);
