import { apiKey, youtubePath, imgPath, moviePage, youtubeApiKey } from "../globals/globalVariables";

import { useState, useEffect, useRef } from "react";

function Quiz() {

  // Holds random page number 1 to 51, initializes at a random page
  const [randomPage, setRandomPage] = useState(Math.floor(Math.random() * moviePage) + 1);

  // Holds random movie data
  const [randomMovie, setRandomMovie] = useState({});

  // Holds random movie video data
  const [randomMovieVideo, setRandomMovieVideo] = useState({});

  // Holds the youtube trailerID for the random movie video
  const [trailerID, setTrailerID] = useState('');

  // Canvas reference
  const canvasRef = useRef(null);

  // Iframe refernce
  const iframeRef = useRef(null);

  // Gets a new random page
  function newRandomMovie() {
    setRandomPage(Math.floor(Math.random() * moviePage) + 1);
  }

  // Finds the trailer from the video list
  function getTrailer(){
    if (randomMovieVideo.results) {
      const id = randomMovieVideo.results.find(video => video.type === 'Trailer');
      if (id) {
        setTrailerID(id.key);
      } else {
        newRandomMovie();
      }
    }
  }

  // Gets movies from the random page and then randomly picks one movie from the page
  useEffect(()=> {
    
    // Api fetch link for a random movie
    const endPointRandomMovie = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${randomPage}&sort_by=popularity.desc&api_key=${apiKey}`

    // Fetch movies from the randomly selected page and then set one as the random movie
    const fetchMovies = async () => {
      const res = await fetch(endPointRandomMovie);
      const list = await res.json();
      const randomIndex = (Math.floor(Math.random() * list.results.length));
      setRandomMovie(list.results[randomIndex]);
    };

    fetchMovies();
  }, [randomPage])

  // Gets the videos from the randomly selected movie
  useEffect(() => {

    // Api fetch link for the videos of the random movie that was chosen
    const endPointVideos = `https://api.themoviedb.org/3/movie/${randomMovie.id}/videos?language=en-US&api_key=${apiKey}`;

    // Fetch videos from the random movie that was chosen
    const fetchMovieVideo = async () => {
      if (randomMovie.id) {
        const res = await fetch(endPointVideos);
        const video = await res.json();
        setRandomMovieVideo(video);
      }
    };

    fetchMovieVideo();
  }, [randomMovie]);

  // useEffect(() => {
  //   // Function to capture a frame from the YouTube video
  //   const captureFrame = () => {
  //     const iframe = iframeRef.current;
  //     const canvas = canvasRef.current;
  //     const ctx = canvas.getContext("2d");

  //     // Ensure the iframe and canvas exist
  //     if (!iframe || !canvas) return;

  //     // Get the iframe's contentWindow (the YouTube video player)
  //     const contentWindow = iframe.contentWindow;

  //     // Wait for the video to load
  //     contentWindow.addEventListener("load", () => {
  //       // Capture a frame from the video and draw it on the canvas
  //       ctx.drawImage(contentWindow.document.querySelector("video"), 0, 0, canvas.width, canvas.height);
  //     });
  //   };

  //   captureFrame();
  // }, [randomMovie]);


  // Get the trailer when the randomMovieVideo changes
  useEffect(()=>{
    getTrailer();
  }, [randomMovieVideo])

  return (
    <>
      <div className="random-movie-details">
        <h2>{randomMovie.title}</h2>  
        <canvas className="frame" ref={canvasRef} width={650} height={350}></canvas>
        <iframe
          ref={iframeRef}
          className="frame"
          src={`${youtubePath}${trailerID}`}  
          title="Embedded youtube"
        />
      </div>
      <button className="new-movie-button" onClick={()=>newRandomMovie()}>New Movie</button>
    </>
  )
}

export default Quiz