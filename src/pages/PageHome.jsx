import Carousel from "../components/Carousel";
import { useEffect, useState, useContext } from "react";
import { apiKey, imgPath } from "../globals/globalVariables";
import { handleFavorites } from "../utilities/favoritesFunctions";
import { Link } from "react-router-dom";
import FavoritesContext from "../context/FavoritesContext";
import favoriteIcon from "../icons/favorite.svg";
import notfavoriteIcon from "../icons/notfavorite.svg";
import Rating from "../components/Rating";

function App() {
  // Holds api request data
  const [movies, setMovies] = useState([]);


  // Api fetch link for popularity
  const endPointMovies = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${apiKey}`;

  const { favorites, setFavorites } = useContext(FavoritesContext);


  // Function to handle adding/removing from favorites
  const handleFavs = (movie) => {
    handleFavorites(movie, favorites, setFavorites);
  };

  const isFavorite = (movie) => {
    return favorites.some((favorite) => favorite.id === movie.id);
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
        <Carousel />
        <div className="movie-list">
          {movies.map((movie, index) => (
            <Link to={`/movie/${movie.id}`} key={index}>
              <div
                className="movie-item"
                style={{
                  backgroundImage: `url(${imgPath}${movie.poster_path})`,
                }}
              >
                <div className="overlay">
                  <div className="rating">
                    <Rating rate={movie.vote_average} />
                  </div>
                  <h2 className="movie-title">{movie.title}</h2>
                  <button
                    className="favorite-button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleFavs(movie);
                    }}
                  >
                    <img
                      className="favorite-icon"
                      src={isFavorite(movie) ? favoriteIcon : notfavoriteIcon}
                      alt="Favorite"
                    />
                  </button>
                </div>
                <div className="movie-hover">
                  <div className="movie-overview">{movie.overview}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
