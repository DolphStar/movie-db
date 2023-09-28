import { apiKey } from "../globals/globalVariables";

export const fetchSearchResults = async (query) => {
    const endPointSearch = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}`;
    const response = await fetch(endPointSearch);
    const data = await response.json();
    return data.results;
};


  
