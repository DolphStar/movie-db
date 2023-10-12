import { createContext, useState } from 'react';
import PropTypes from "prop-types";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [allGenres, setAllGenres] = useState([]);



    return (
        <SearchContext.Provider value={{ searchQuery, setSearchQuery, searchResult, setSearchResult, selectedGenres, setSelectedGenres, allGenres, setAllGenres }}>
            {children}
        </SearchContext.Provider>
    );
};

SearchProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };


