import { BrowserRouter, Routes, Route } from "react-router-dom";

// import App from "../components/App";
import Carousel from "../components/Carousel";
import "../styles/App.css";

function PageHome()
{
    return(
        <div className="wrapper">
            
            <Carousel />
            {/* <App /> */}
            
        </div>
        )
}

export default PageHome;
