import { useEffect, useState } from "react";

import "../styles/App.css";

function App() {

  const [movie, setMovie] = useState()

  useEffect( ()=>{
    setMovie("Main Branch")

  },[])

  return (
    <>
      <div className="main-wrapper">
        <h1>{movie}</h1>
        <p>This is the main branch</p>
      </div>
    </>
  );
}

export default App;
