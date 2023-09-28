import { useEffect, useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import { fetchSearchResults } from "../utilities/SearchFunctions";
import { imgPath } from "../globals/globalVariables";

function Search() {
  const { searchQuery, searchResult, setSearchResult } =
    useContext(SearchContext);

  useEffect(() => {
    const fetchData = async () => {
      if (searchQuery) {
        const results = await fetchSearchResults(searchQuery);
        setSearchResult(results);
      }
    };
    fetchData();
  }, [searchQuery, setSearchResult]);

  return (
    <>
      <h1>Search results</h1>
      <div className="movie-list">
        {searchResult.map((movie) => {
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
                <div className="movie-overview">{movie.overview}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Search;
