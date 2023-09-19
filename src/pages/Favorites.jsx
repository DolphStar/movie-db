// Favorites.js

import { useContext } from 'react';
import FavsContext from '../context/FavsContext';

function Favorites() {
  const { favs } = useContext(FavsContext);

  return (
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
  );
}

export default Favorites;
