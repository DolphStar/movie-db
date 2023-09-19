// App Router

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import App from "../components/App";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";


function AppRouter() {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header />
        <Carousel />
        <App />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;
