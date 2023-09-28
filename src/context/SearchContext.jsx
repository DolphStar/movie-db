import { createContext, useState } from 'react';
import PropTypes from "prop-types";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    return (
        <SearchContext.Provider value={{ searchQuery, setSearchQuery, searchResult, setSearchResult }}>
            {children}
        </SearchContext.Provider>
    );
};

SearchProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };


