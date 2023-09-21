import { createContext, useState } from 'react';
import PropTypes from 'prop-types'; 

// Create a new context 
const FavoritesContext = createContext();

// Define a provider component for managing favorite movies
export const FavoritesProvider = ({ children }) => {
  // State hook to manage the list of favorite movies
  const [favorites, setFavorites] = useState([]);

  // Render the Provider component with its value prop set to an object
  // containing the favorites array and the setFavorites function
  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites }}>
      {children} {/* Render the child components */}
    </FavoritesContext.Provider>
  );
}

// Define PropTypes for the children prop to ensure it's a valid React node
FavoritesProvider.propTypes = {
  children: PropTypes.node.isRequired 
};


export default FavoritesContext;
