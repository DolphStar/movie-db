// favorites functions

export const addToFavorites = (movie, favorites, setFavorites) => {
    setFavorites(prevFavorites => [...prevFavorites, movie]);
  }
  
export const deleteFromFavorites = (movieToDelete, favorites, setFavorites) => {
// Create an updated list excluding the movie to be deleted
const updatedData = favorites.filter(movie => movie.id !== movieToDelete.id);
setFavorites(updatedData);
}

// Function to handle adding or removing a movie from favorites based on its current status
export const handleFavorites = (movie, favorites, setFavorites) => {
// Check if the movie is already in favorites
const isFavorite = favorites.some(favorite => favorite.id === movie.id);

// If it's a favorite, remove it; otherwise, add it
if (isFavorite) {
    deleteFromFavorites(movie, favorites, setFavorites);
    console.log(movie.title + " movie deleted")
} else {
    addToFavorites(movie, favorites, setFavorites);
    console.log(movie.title + " movie added")
}
}
  