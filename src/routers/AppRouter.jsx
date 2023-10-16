// App Router
// import { appTitle } from "../globals/globalVariables";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import state to disable scrolling on trailr
import { useState } from 'react';
import { useEffect } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
// import Carousel from "../components/Carousel";

import PageHome from "../pages/PageHome";
import Trailr from "../pages/Trailr";
import About from "../pages/About";
import Favorites from "../pages/Favorites";
import Single from "../pages/Single";
import Search from "../pages/PageSearch";

function AppRouter() {

  useEffect(()=>{
    document.title = "MovieNight";
  }, [])

  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header />
          <main>
            <Routes>
              <Route path="/" exact element={<PageHome/>} />
              <Route path="/trailr" exact element={<Trailr/>} />
              <Route path="/about" exact element={<About/>} />
              <Route path="/favorites" exact element={<Favorites/>} />
              <Route path="/movie/:id" exact element={<Single />} />
              <Route path="/search" exact element={<Search/>} />
            </Routes>
          </main>
        <Footer />
      </div>  
    </BrowserRouter>
  );
}

export default AppRouter;
