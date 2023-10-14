import { useEffect, useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import FavoritesContext from "../context/FavoritesContext";
import { fetchSearchResults, fetchGenres } from "../utilities/SearchFunctions";
import { imgPath } from "../globals/globalVariables";
import favoriteIcon from "../icons/favorite.svg";
import notfavoriteIcon from "../icons/notfavorite.svg";
import { handleFavorites } from "../utilities/favoritesFunctions";
import { Link } from "react-router-dom";

function Search() {
  const { searchQuery, searchResult, setSearchResult, selectedGenres, setSelectedGenres, allGenres, setAllGenres } =
    useContext(SearchContext);
    const { favorites, setFavorites } = useContext(FavoritesContext);

    const handleFavs = (movie) => {
      handleFavorites(movie, favorites, setFavorites);
    };

    const isFavorite = (movie) => {
      return favorites.some((favorite) => favorite.id === movie.id);
    };

   // fetch search results when searchQuery or selectedGenres change
  useEffect(() => {
    const fetchData = async () => {
      if (searchQuery) {
        const results = await fetchSearchResults(searchQuery, selectedGenres);
        setSearchResult(results);
      }
    };
    fetchData();
  }, [searchQuery, setSearchResult, selectedGenres]);

    // fetch all available genres
  useEffect(() => {
    const fetchAllGenres = async () => {
      const genres = await fetchGenres();
      setAllGenres(genres);
    };
    fetchAllGenres();
  }, []);

 // handle genre checkbox changes
  const handleGenreChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (e.target.checked) {
      setSelectedGenres([...selectedGenres, value]);
    } else {
      setSelectedGenres(selectedGenres.filter((genre) => genre !== value));
    }
  };

  // filter movies based on selected genres
  const filteredMovies = selectedGenres.length > 0 
    ? searchResult.filter(movie => movie.genre_ids.some(id => selectedGenres.includes(id)))
    : searchResult;

  return (
    <>
      <div className="genre-filters">
        {allGenres.map((genre) => (
          <label key={genre.id}>
            <input
              type="checkbox"
              value={genre.id}
              onChange={handleGenreChange}
            />
            {genre.name}
          </label>
        ))}
      </div>
      <h1>Search results</h1>
      <div className="movie-list">
        {filteredMovies.map((movie) => {
          return (
            <div
              key={movie.id}
              className="single-movie"
              style={{
                width: 300,
              }}
            >
              <h2 className="movie-title">{movie.title}</h2>
              <div className="movie-item">
                <img
                  src={`${imgPath}${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster"
                />
                                <button
                  className="favorite-button"
                  onClick={() => handleFavs(movie)}
                >
                  <img
                    className="favorite-icon"
                    src={isFavorite(movie) ? favoriteIcon : notfavoriteIcon}
                    alt="Favorite"
                  />
                </button>
                <Link to={`/movie/${movie.id}`} className="carousel-info-button">
                  More Info
                </Link>
                {/* <div className="movie-overview">{movie.overview}</div> */}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Search;
