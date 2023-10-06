import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./routers/AppRouter.jsx";
import { FavoritesProvider } from './context/FavoritesContext.jsx'; 
import { SearchProvider } from './context/SearchContext';
import "./scss/App.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SearchProvider>
    <FavoritesProvider>
    <AppRouter />
    </FavoritesProvider>
    </SearchProvider>
  </React.StrictMode>
);
