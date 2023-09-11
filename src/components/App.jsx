import { useEffect, useState } from "react";
import { apiKey, imgPath } from "../globals/globalVariables"

import "../styles/App.css";

function App() {
  
  const [movies, setMovies] = useState(false);
  const [searchQuery, setSearchQuery] = useState('spiderman');
  const endPointMovies = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=${apiKey}`;
  const [randomMovieIndex, setRandomMovieIndex] = useState();
  const [randomMovie, setRandomMovie] = useState({
    title: '',
    poster: '',
    overview: ''
  });


  useEffect( ()=>{
    const fetchMovies = async () => {
      const res = await fetch(endPointMovies);
      let data = await res.json();
      setMovies(data);
    };

    fetchMovies();
  },[])

  function displayRandomMovie(){
    setRandomMovieIndex(Math.floor(Math.random() * movies.results.length));
    setRandomMovie({
      ...randomMovie,
      title: movies.results[randomMovieIndex].title,
      poster: imgPath + movies.results[randomMovieIndex].poster_path,
      overview: movies.results[randomMovieIndex].overview
    })
  }

  return (
    <>
      <div className="main-wrapper">
        <h1>Movies</h1>
        <button onClick={()=> displayRandomMovie()}>Display Random Movie</button>
        <div>
          <h2>{randomMovie.title}</h2>
          <img src={randomMovie.poster} alt={randomMovie.title} 
          style={{
            width: 300,
            
          }}/>
          <div>{randomMovie.overview}</div>
        </div>
      </div>
    </>
  );
}

export default App;
