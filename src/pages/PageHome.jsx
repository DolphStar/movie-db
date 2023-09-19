import { useEffect, useState, useContext } from "react";
import { apiKey, imgPath } from "../globals/globalVariables"
import "../styles/PageHome.css";
import FavsContext from '../context/FavsContext'; 

function App() {
  const { favs, setFavs } = useContext(FavsContext);
  const [movies, setMovies] = useState([]);
  const endPointMovies = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${apiKey}`;

  const addToFav = (film) => {
    setFavs(prevFavs => [...prevFavs, film]);
  }

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(endPointMovies);
      let list = await res.json();
      let shortList = list.results.slice(0, 12);
      setMovies(shortList);
    };

    fetchMovies();
  }, []);

  return (
    <>
      <div className="main-wrapper">
        <h1>Movies</h1>
        <div className="movie-list">
          {movies.map((movie) => {
            return (
              <div
                key={movie.id}
                className="single-movie"
                style={{
                  width: 300,
                }}
              >
                <h2 className="movie-title">{movie.title}</h2>
                <img
                  src={`${imgPath}${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster"
                />
                <div className="movie-overview">{movie.overview}</div>
                <button onClick={() => addToFav(movie)}>Add to favourites</button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="favorites-wrapper">
        <h2>Favorites</h2>
        {favs && favs.length > 0 ? (
          <div>
            {favs.map((fav, index) => (
              <div key={index}>{fav.title}</div>
            ))}
          </div>
        ) : (
          <p>No favorites added yet.</p>
        )}
      </div>
    </>
  );
}

export default App;
