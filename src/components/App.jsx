import { useEffect, useState } from "react";

import "../styles/App.css";

function App() {

  const [movie, setMovie] = useState()

  useEffect( ()=>{
    setMovie("Testing State")

  },[])

  return (
    <>
      <div className="main-wrapper">
        <h1>{movie}</h1>
      </div>
    </>
  );
}

export default App;
