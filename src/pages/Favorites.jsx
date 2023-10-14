import { useContext } from "react";
import { imgPath } from "../globals/globalVariables";
import { handleFavorites } from "../utilities/favoritesFunctions";
import { Link } from "react-router-dom";
import FavoritesContext from "../context/FavoritesContext";
import favoriteIcon from "../icons/favorite.svg";
import notfavoriteIcon from "../icons/notfavorite.svg";

function Favorites() {
  const { favorites, setFavorites } = useContext(FavoritesContext);


  const handleFavs = (movie) => {
    handleFavorites(movie, favorites, setFavorites);
  };

  const isFavorite = (movie) => {
    return favorites.some((favorite) => favorite.id === movie.id);
  };

  return (
    <div className="favorites-wrapper">
      {favorites && favorites.length > 0 ? (
        <section className="favorites-main">
          {favorites.map((favorites, index) => (
            <div key={index} className="favorite-movie">
              <h2 className="movie-title">{favorites.title}</h2>
              <div className="movie-item">
                <img
                  src={`${imgPath}${favorites.poster_path}`}
                  alt={favorites.title}
                  className="movie-poster"
                />
                <button
                  className="favorite-button"
                  onClick={() => handleFavs(favorites)}
                >
                  <img
                    className="favorite-icon"
                    src={isFavorite(favorites) ? favoriteIcon : notfavoriteIcon}
                    alt="Favorite"
                  />
                </button>
                <Link to={`/movie/${favorites.id}`} className="carousel-info-button">
                  More Info
                </Link>
              </div>
            </div>
          ))}
        </section>
      ) : (
        <p>No favorites added yet.</p>
      )}
    </div>
  );
}

export default Favorites;
