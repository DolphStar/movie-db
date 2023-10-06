import { useEffect, useState, useContext } from "react";
import { apiKey, imgPath } from "../globals/globalVariables";
import { handleFavorites } from "../utilities/favoritesFunctions";
import FavoritesContext from "../context/FavoritesContext";
import favoriteIcon from "../icons/favorite.svg";

function App() {
  // Holds api request data
  const [movies, setMovies] = useState([]);

  // Holds user inputted search data
  // const [searchQuery, setSearchQuery] = useState("spiderman");

  // Api fetch link for searching
  // const endPointSearch = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=${apiKey}`;

  // Api fetch link for popularity
  const endPointMovies = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${apiKey}`;

  const { favorites, setFavorites } = useContext(FavoritesContext);


  // Function to handle adding/removing from favorites
  const handleFavs = (movie) => {
    handleFavorites(movie, favorites, setFavorites);
  };



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
                  <button
                    className="favorite-button"
                    onClick={() => handleFavs(movie)}
                  >
                    <img
                      className="favorite-icon"
                      src={favoriteIcon}
                      alt="Favorite"
                    />
                  </button>
                  <div className="movie-overview">{movie.overview}</div>
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
