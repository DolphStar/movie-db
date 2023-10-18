import { useContext } from "react";
import { imgPath } from "../globals/globalVariables";
import { handleFavorites } from "../utilities/favoritesFunctions";
import { Link } from "react-router-dom";
import FavoritesContext from "../context/FavoritesContext";
import favoriteIcon from "../icons/favorite.svg";
import notfavoriteIcon from "../icons/notfavorite.svg";
// import infoIcon from "../icons/info.svg";
import Rating from "../components/Rating";

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
      <h2 className="fav-header">Your Favourites</h2>
      {favorites && favorites.length > 0 ? (
        <section className="favorites-main">
          {favorites.map((favorites, index) => (
            <Link to={`/movie/${favorites.id}`} key={index}>
              <div
                key={index}
                className="movie-item"
                style={{
                  backgroundImage: `url(${imgPath}${favorites.poster_path})`,
                }}
              >
                <div className="overlay">
                  <div className="rating">
                    <Rating rate={favorites.vote_average} />
                  </div>
                  <h2 className="movie-title">{favorites.title}</h2>
                  <button
                    className="favorite-button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleFavs(favorites);
                    }}
                  >
                    <img
                      className="favorite-icon"
                      src={
                        isFavorite(favorites) ? favoriteIcon : notfavoriteIcon
                      }
                      alt="Favorite"
                    />
                  </button>
                </div>
                <div className="movie-hover">
                  <div className="movie-overview">{favorites?.overview.length > 236
                        ? `${favorites?.overview.slice(0, 237)}...`
                        : favorites?.overview}
                  <p>Release Date: {favorites?.release_date}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </section>
      ) : (
        <p>No favorites added yet.</p>
      )}
    </div>
  );
}

export default Favorites;
