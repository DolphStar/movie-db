import { useContext, useState } from 'react';
import { SearchContext } from '../context/SearchContext';
import { fetchSearchResults } from '../utilities/SearchFunctions';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const { searchQuery, setSearchQuery } = useContext(SearchContext);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate(); //  allowing programmatically navigating to different routes

  const handleInputChange = async (e) => {
    // set the search query with the current input value
    const value = e.target.value;
    setSearchQuery(value);

    const isValidInput = (value) => /^[a-zA-Z0-9\s?!]*$/.test(value);

    
    // If the search query is not empty and it passes regex pattern, fetch the results
    if (isValidInput(value)) {
      const results = await fetchSearchResults(value);
      setSuggestions(results.slice(0, 5)); // Show only top 5 results
    } else {
      setSuggestions([]); // Empty the suggestions if the search query is empty
    }
  };

  const selectSuggestion = (movie) => {
    setSearchQuery(movie.title);
    setSuggestions([]);
    // Add navigate to solo movie page when clicked later
  };

  const handleSearch = (navigate, searchQuery) => {
    if (searchQuery) {
        // Redirect to the search page.
        navigate("/search");
    }
};

  return (
    <div className="search-bar">
      <input 
        type="text" 
        value={searchQuery} 
        onChange={handleInputChange} 
        placeholder="Search for a movie..."
      />
      <button onClick={() => handleSearch(navigate, searchQuery)}>Search</button>
      <div className="suggestions-list">
        {suggestions.map((movie) => (
          <div key={movie.id} className="suggested-movie" onClick={() => selectSuggestion(movie)}>
            <div className="movie-title">
              {movie.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
