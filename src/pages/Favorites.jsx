// Favorites.js

import { useContext } from 'react';
import FavoritesContext from '../context/FavoritesContext';
import { imgPath } from "../globals/globalVariables"
import { handleFavorites } from '../utilities/favoritesFunctions';
import favoriteIcon from '../images/favorite.svg';
import "../styles/Favorites.css";

function Favorites() {
  const { favorites, setFavorites } = useContext(FavoritesContext);

  const handleFavs = (movie) => {
    handleFavorites(movie, favorites, setFavorites)
  }

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
                <button className="favorite-button" onClick={() => handleFavs(favorites)}><img className="favorite-icon" src={favoriteIcon} alt="Favorite" /></button>
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
