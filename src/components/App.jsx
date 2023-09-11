import { useEffect, useState } from "react";
import { apiKey, imgPath } from "../globals/globalVariables"

import "../styles/App.css";

function App() {
  
  // Holds api request data
  const [movies, setMovies] = useState([]);

  // Holds random movie video
  const [movieVideo, setMovieVideo] = useState();

  // Holds user inputted search data
  const [searchQuery, setSearchQuery] = useState('spiderman');

  // Holds random movie data
  const [randomMovie, setRandomMovie] = useState({
    title: '',
    poster: '',
    id: 0,
    isFavourite: true
  });

  // Api fetch link for searching
  const endPointSearch = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=${apiKey}`;

  // Api fetch link for popularity
  const endPointMovies = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${apiKey}`

  // Api fetch link for the video
  const endPointVideos = `https://api.themoviedb.org/3/movie/${randomMovie.id}/videos?language=en-US&api_key=${apiKey}`


  useEffect(()=>{
    const fetchMovies = async () => {
      const res = await fetch(endPointMovies);
      let list = await res.json();
      let shortList = list.results.slice(0, 12);
      setMovies(shortList);
      let randomIndex = (Math.floor(Math.random() * list.results.length));
      setRandomMovie({
        ...randomMovie,
        title: list.results[randomIndex].title,
        poster: list.results[randomIndex].poster_path,
        id: list.results[randomIndex].id
      })
    };

    const fetchMovieVideo = async () => {
      const res = await fetch(endPointVideos);
      let video = await res.json();
      const videoKey = video.results[0].key;
      setMovieVideo(video)
    };

    fetchMovieVideo();
    fetchMovies();
  },[])

//function for toggling isFavourite to toggle heart state
//thinking of [setState, prevState] = React.useState({data...})
function toggleFavorite() {
  //updating prevState
  setState(prevState => ({
      ...prevState,
      isFavourite: !prevState.isFavourite
  }))
}


  return (
    <>
      <div className="main-wrapper">
        <h1>Movies</h1>
        <div className="movie-list">

        </div>
      </div>
    </>
  );
}

export default App;

// Displaying the 12 most popular movies
// return (
//   <>
//     <div className="main-wrapper">
//       <h1>Movies</h1>
//       <div className="movie-list">
//       {movies.map((movie) => {
//         return(
//           <div
//             key={movie.id}
//             className="single-movie"
//             style={{
//               width: 300,
//             }}>
//               <h2 className="movie-title">{movie.title}</h2>
//               <img 
//                   src={`${imgPath}${movie.poster_path}`} 
//                   alt={movie.title} 
//                   className="movie-poster"
//                   />
//               <div 
//                   className="movie-overview"
//                   >{movie.overview}</div>
//           </div>
//         );
//         })} 
//       </div>
//     </div>
//   </>
// );


//Add <Favourites isFilled={prevState.isFavourite} handleClick={toggleFavourite} />