import { apiKey, youtubePath, imgPath, moviePage, youtubeApiKey } from "../globals/globalVariables";
import Youtube from 'react-youtube';
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

  // Holds the youtube player instance
  const [youtubePlayer, setYoutubePlayer] = useState(null);
  
  // Seek timestamp
  const [seekTimestamp, setSeekTimestamp] = useState(0);

  // Iframe refernce
  const iframeRef = useRef(null);

  // countdown screen reference
  const countdown = useRef(null);

  // Visible
  const [isVisible, setIsVisible] = useState(false);

  // Gets a new random page
  function newRandomMovie() {
    setRandomPage(Math.floor(Math.random() * moviePage) + 1);

    // puts a blocker in the way while the video flickers (temporary)
    setIsVisible(true);
    setTimeout(()=>{
      setIsVisible(false)
    }, 3000)
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

  // Get the trailer when the randomMovieVideo changes
  useEffect(()=>{
    getTrailer();
  }, [randomMovieVideo])

  return (
    <>
      <div className="random-movie-details">

        <h2>{randomMovie.title}</h2>
        
        {/* bootleg solution to the ugly video flickering that happens while the embed loads */}
        <div 
          className="countdown" 
          ref={countdown}
          style={{
            backgroundColor: isVisible ? 'black' : 'transparent',
          }}>
            <div 
              className="title-blocker"
              style={{
                display: isVisible ? 'none' : 'block',
              }}></div>
        </div>

        {/* youtube embed */}
        <Youtube
          className="frame"
          videoId={trailerID}
          opts={{
            width: '650',
            height: '365',
            playerVars: {
              autoplay: 1,  // autoplay
              controls: 0,  // disables controls         
              disablekb: 1, // disables keyboard controls
              mute: 1,      // mutes
              rel: 0
            }
          }}
          onReady={(event) => {
            setYoutubePlayer(event.target)
            // event.target.seekTo(Math.floor(Math.random() * event.target.getDuration()));
            // setTimeout(()=>{
            //   event.target.playVideo();
            // }, 500)
          }}
          key={trailerID}
        />
        {/* <iframe
          ref={iframeRef}
          className="frame"
          src={`${youtubePath}${trailerID}`}  
          title="Embedded youtube"
        /> */}
      </div>
      <button className="new-movie-button" onClick={()=>newRandomMovie()}>New Movie</button>
    </>
  )
}

export default Quiz