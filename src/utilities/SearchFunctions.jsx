import { apiKey } from "../globals/globalVariables";

export const fetchSearchResults = async (query, genres) => {
  let endPointSearch = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}`;
  
  if (genres && genres.length > 0) {
    endPointSearch += `&with_genres=${genres.join(',')}`;
  }
  
  const response = await fetch(endPointSearch);
  const data = await response.json();
  return data.results;
};


export const fetchGenres = async () => {
    const endPointGenres = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;
    const response = await fetch(endPointGenres);
    const data = await response.json();
    return data.genres;
  };
    
