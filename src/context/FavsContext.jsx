import { createContext, useState } from 'react';
import PropTypes from 'prop-types'; // Add this import

const FavsContext = createContext();

export const FavsProvider = ({ children }) => {
  const [favs, setFavs] = useState([]);

  return (
    <FavsContext.Provider value={{ favs, setFavs }}>
      {children}
    </FavsContext.Provider>
  );
}


FavsProvider.propTypes = {
  children: PropTypes.node.isRequired 
};

export default FavsContext;