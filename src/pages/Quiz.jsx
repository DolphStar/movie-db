import { apiKey, youtubePath, imgPath } from "../globals/globalVariables";

import { useState, useEffect } from "react";

function Quiz() {

  // Random stores random page
  const [randomPage, setRandomPage] = useState(Math.floor(Math.random() * 50));

  // Holds random movie data
  const [randomMovie, setRandomMovie] = useState({});

  // Holds random movie video data
  const [randomMovieVideo, setRandomMovieVideo] = useState({});

  // Holds the youtube trailerID for the random movie video
  const [trailerID, setTrailerID] = useState('');

  useEffect(()=> {

    // Api fetch link for a random movie
    const endPointRandomMovie = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${randomPage}&sort_by=popularity.desc&api_key=${apiKey}`

    // Fetch movies from a random page
    const fetchMovies = async () => {
      const res = await fetch(endPointRandomMovie);
      const list = await res.json();
      const randomIndex = (Math.floor(Math.random() * list.results.length));
      setRandomMovie(list.results[randomIndex]);
    };

    fetchMovies();
  }, [randomPage])

  useEffect(() => {
    const endPointVideos = `https://api.themoviedb.org/3/movie/${randomMovie.id}/videos?language=en-US&api_key=${apiKey}`;

    // Fetch videos from the random movie that was fetched
    const fetchMovieVideo = async () => {
      if (randomMovie.id) {
        const res = await fetch(endPointVideos);
        const video = await res.json();
        setRandomMovieVideo(video);
      }
    };

    fetchMovieVideo();
  }, [randomMovie]);

  function newRandomMovie() {
    setRandomPage(Math.floor(Math.random() * 50));

    if (randomMovieVideo.results) {
      const id = randomMovieVideo.results.find(video => video.type === 'Trailer');
      if (id) {
        setTrailerID(id.key);
        console.log("Found trailer at: ", id.key);
      } else {
        console.log("Did not find a trailer");
      }
    }
  }

  return (
    <>
      <div className="random-movie-details"
        style={{
          width: 200
        }}>
        <h2>{randomMovie.title}</h2>
        <iframe
          width="500"
          height="300"
          src={`${youtubePath}${trailerID}`}
          title="Embedded youtube"
        />
      </div>
      <button onClick={()=>newRandomMovie()}>New Movie</button>
    </>
  )
}

// Instructions screen that appears before and once they click okay then it will render display the first movie

export default Quiz