import Carousel from "../components/Carousel";
import { useEffect, useState, useContext } from "react";
import { apiKey, imgPath } from "../globals/globalVariables";
import { handleFavorites } from "../utilities/favoritesFunctions";
import FavoritesContext from "../context/FavoritesContext";
import favoriteIcon from "../icons/favorite.svg";
import placeholder from "../icons/placeholder.png";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";

function App() {
  // Holds api request data
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState("popular");

  // Holds user inputted search data
  // const [searchQuery, setSearchQuery] = useState("spiderman");

  // Api fetch link for searching
  // const endPointSearch = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=${apiKey}`;

  // Api fetch link for popularity

  const { favorites, setFavorites } = useContext(FavoritesContext);

  // Function to handle adding/removing from favorites
  const handleFavs = (movie) => {
    handleFavorites(movie, favorites, setFavorites);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const endPointMovies = `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1'&api_key=${apiKey}`;
      const res = await fetch(endPointMovies);
      let list = await res.json();
      let shortList = list.results.slice(0, 12);
      setMovies(shortList);
    };

    fetchMovies();
  }, [category]);

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  return (
    <>
      <div className="main-wrapper">
        <Carousel />
        <div className="radio-buttons">
          <label>
            <input
              type="radio"
              name="radios"
              value="popular"
              checked={category === "popular"}
              onChange={handleCategory}
            />
            <span>Popular</span>
          </label>
          <label>
            <input
              type="radio"
              name="radios"
              value="now_playing"
              checked={category === "now_playing"}
              onChange={handleCategory}
            />
            <span>Now Playing</span>
          </label>
          <label>
            <input
              type="radio"
              name="radios"
              value="top_rated"
              checked={category === "top_rated"}
              onChange={handleCategory}
            />
            <span>Top Rated</span>
          </label>
          <label>
            <input
              type="radio"
              name="radios"
              value="upcoming"
              checked={category === "upcoming"}
              onChange={handleCategory}
            />
            <span>Upcoming</span>
          </label>
        </div>
        <div className="movie-list">
          {movies.map((movie) => {
            return (
              <div key={movie.id} className="single-movie">
                <div className="movie-item">
                  <div className="poster-text">
                    <img
                      src={
                        movie.poster_path
                          ? `${imgPath}${movie.poster_path}`
                          : { placeholder }
                      }
                      alt={movie.title}
                      className="movie-poster"
                    />
                    <div className="movie-overview">{movie?.overview}</div>
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
                  </div>

                  <h2 className="movie-title">{movie.title}</h2>
                  <div className="content-button-wrapper">
                    <div className="home-movie-content">
                      <Rating rate={movie?.vote_average} />
                      <div>{movie?.release_date}</div>
                    </div>
                    <Link
                      to={`/movie/${movie?.id}`}
                      className="carousel-info-button"
                    >
                      More Info
                    </Link>
                  </div>
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
