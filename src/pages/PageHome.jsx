import { useEffect, useState, useContext } from "react";
import { apiKey, imgPath } from "../globals/globalVariables"
import "../styles/PageHome.css";
import FavsContext from '../context/FavoritesContext'; 
import { handleFavorites } from '../utilities/favoritesFunctions';
import favoriteIcon from '../images/favorite.svg';

function App() {
  const { favorites, setFavorites } = useContext(FavsContext);
  const [movies, setMovies] = useState([]);
  const endPointMovies = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${apiKey}`;

  // Function to handle adding/removing from favorites
  const handleFavs = (movie) => {
    handleFavorites(movie, favorites, setFavorites)
  }

  console.log(favorites)

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
                <div className="movie-item">
                <img
                  src={`${imgPath}${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster"
                />
                <div className="movie-overview">{movie.overview}</div>
                <button className="favorite-button" onClick={() => handleFavs(movie)}><img className="favorite-icon" src={favoriteIcon} alt="Favorite" /></button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
