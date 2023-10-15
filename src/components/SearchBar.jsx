import { useContext, useState } from 'react';
import { SearchContext } from '../context/SearchContext';
import { fetchSearchResults } from '../utilities/SearchFunctions';
import { useNavigate } from 'react-router-dom';
import search from '../icons/search.svg'

function SearchBar() {
  const { searchQuery, setSearchQuery } = useContext(SearchContext);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate(); //  allowing programmatically navigating to different routes

  const filterHighestRated = (results) => {
    // store movies with their title as the key
    const movieMap = {};
  
    results.forEach((movie) => {
      // check if the movie title is not already a key in movieMap 
      // If it is, check if the current movie rating is higher than the one stored in movieMap.
      if (!movieMap[movie.title] || movieMap[movie.title].rating < movie.rating) {
        movieMap[movie.title] = movie;
      }
    });
    // If either of the above conditions are met, 
    // set the movieMap with the current movie using its title as the key.
    return Object.values(movieMap);
  };
  

  const handleInputChange = async (e) => {
    // set the search query with the current input value
    const value = e.target.value;
    setSearchQuery(value);

    const isValidInput = (value) => /^[a-zA-Z0-9\s?!]*$/.test(value);

    
    // If the search query is not empty and it passes regex pattern, fetch the results
    if (isValidInput(value)) {
      const results = await fetchSearchResults(value);
      const uniqueHighestRatedMovies = filterHighestRated(results)
      setSuggestions(uniqueHighestRatedMovies.slice(0, 5)); // Show only top 5 results
      setSuggestionsVisible(true); // Show suggestions
    } else {
      setSuggestions([]); // Empty the suggestions if the search query is empty
      setSuggestionsVisible(false); // Hide suggestions
    }
  };

  const selectSuggestion = (movie) => {
    setSearchQuery(movie.title);
    setSuggestions([]);
    navigate(`/movie/${movie.id}`);
    // Add navigate to solo movie page when clicked later
  };

  const handleSearch = (navigate, searchQuery) => {
    if (searchQuery) {
        // Redirect to the search page.
        navigate("/search");
    }
};

  return (
    <>
    <div className="search-bar">
      <input
        className='search-bar-input'
        type="text" 
        value={searchQuery} 
        onChange={handleInputChange} 
        placeholder="Search..."
      />
      <button className='search-button' onClick={() => handleSearch(navigate, searchQuery)}>
        <img 
          src={search}
          />
      </button>
    </div>
    <div className='suggestions-list'>
    {suggestions.map((movie) => (
      <div key={movie.id} className="suggested-movie" onClick={() => selectSuggestion(movie)}>
        <div className="movie-title">
          {movie.title}
        </div>
      </div>
    ))}
    </div>
    </>
  );
}

export default SearchBar;
