// App Router

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

import PageHome from "../pages/PageHome";
import Quiz from "../pages/Quiz";
import About from "../pages/About";
import Favorites from "../pages/Favorites";

function AppRouter() {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header />
          <main>
            <Routes>
              <Route path="/" exact element={<PageHome/>} />
              <Route path="/quiz" exact element={<Quiz/>} />
              <Route path="/about" exact element={<About/>} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;
