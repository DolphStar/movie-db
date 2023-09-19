// App Router

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
// import App from "../components/App";
import Footer from "../components/Footer";
// import Carousel from "../components/Carousel";
import PageHome from "../components/PageHome";
import PageSingleMovie from "../components/PageSingleMovie";


function AppRouter() {
  return (
    <BrowserRouter>
      <Header />
    
    {/* <div className="wrapper">
        <Header />
        <Carousel />
        <App />
        <Footer />
      </div> */}
        <Routes>
          <Route path="/" exact element ={<PageHome />}/>
          <Route path="/movie/id:" exact element={<PageSingleMovie />} />
        </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default AppRouter;
