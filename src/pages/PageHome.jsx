import Carousel from "../components/Carousel";
import { useEffect, useState, useContext } from "react";
import { apiKey, imgPath } from "../globals/globalVariables";
import { handleFavorites } from "../utilities/favoritesFunctions";
import FavoritesContext from "../context/FavoritesContext";
import favoriteIcon from "../icons/favorite.svg";
import notfavoriteIcon from "../icons/notfavorite.svg";
import placeholder from "../icons/placeholder.png";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";

function App() {
  // Holds api request data
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState("popular");

  const { favorites, setFavorites } = useContext(FavoritesContext);

  // Function to handle adding/removing from favorites
  const handleFavs = (movie) => {
    handleFavorites(movie, favorites, setFavorites);
  };

  console.log(favorites);
  const isFavorite = (movie) => {
    return favorites.some((favorite) => favorite.id == movie.id);
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
        <div className="movie-list-home">
          {movies.map((movie) => {
            return (
              <div key={movie.id} className="single-movie-home">
                <div className="movie-item-home">
                  <div className="poster-text-home">
                    <img
                      src={
                        movie.poster_path
                          ? `${imgPath}${movie.poster_path}`
                          : { placeholder }
                      }
                      alt={movie.title}
                    />
                    <div className="movie-overview-home">
                      {movie?.overview.length > 236
                        ? `${movie?.overview.slice(0, 237)}...`
                        : movie?.overview}
                    </div>
                    <button
                      className="favorite-button-home"
                      onClick={() => handleFavs(movie)}
                    >
                      <img
                        src={isFavorite(movie) ? favoriteIcon : notfavoriteIcon}
                        alt="Favorite"
                      />
                    </button>
                  </div>

                  <h2 className="movie-title">{movie.title}</h2>
                  <div className="content-button-wrapper-home">
                    <div className="home-movie-content">
                      <Rating rate={movie?.vote_average} />
                      <div>{movie?.release_date}</div>
                    </div>
                    <Link
                      to={`/movie/${movie?.id}`}
                      className="carousel-info-button home-more-info"
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
