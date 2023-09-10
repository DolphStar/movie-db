// App Router
import { appTitle } from "../globals/globalVariables";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "../components/Header";
import App from "../components/App";
import Footer from "../components/Footer";
import PageHome from "../pages/PageHome";


function AppRouter() {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header title={appTitle}/>
        <PageHome />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;
