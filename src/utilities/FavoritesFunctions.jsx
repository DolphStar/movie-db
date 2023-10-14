// Function to add a movie to favorites
export const addToFavorites = (movie, favorites, setFavorites) => {
  // Create a new array with the added movie
  const updatedFavorites = [...favorites, movie];
  // Update the favorites state with the new array
  setFavorites(updatedFavorites);
  // Save the updated favorites to local storage
  saveFavorites(updatedFavorites);
};

// Function to delete a movie from favorites
export const deleteFromFavorites = (movieToDelete, favorites, setFavorites) => {
  // Create an updated list excluding the movie to be deleted
  const updatedData = favorites.filter(
    (movie) => movie.id !== movieToDelete.id
  );
  setFavorites(updatedData);
  saveFavorites(updatedData);
};

// Function to handle adding or removing a movie from favorites based on its current status
export const handleFavorites = (movie, favorites, setFavorites) => {
  // Check if the movie is already in favorites
  const isFavorite = favorites.some((favorite) => favorite.id === movie.id);

  if (isFavorite) {
    deleteFromFavorites(movie, favorites, setFavorites);
    console.log(movie.title + " movie deleted");
  } else {
    addToFavorites(movie, favorites, setFavorites);
    console.log(movie.title + " movie added");
  }
};

// Save favorites to local storage
const saveFavorites = (favorites) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
//   console.log(favorites);    
};

// Retrieve favorites from local storage
export const getFavorites = () => {
  const favorites = localStorage.getItem("favorites");
//   console.log(favorites);
  return favorites ? JSON.parse(favorites) : [];
};


