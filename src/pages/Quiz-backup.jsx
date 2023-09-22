import { apiKey, moviePage } from "../globals/globalVariables";
import Youtube from 'react-youtube';
import { useState, useEffect } from "react";

function Quiz() {

  // Holds random page number 1 to 51, initializes at a random page
  const [randomPage, setRandomPage] = useState([
    Math.floor(Math.random() * moviePage) + 1, // FrameA
    Math.floor(Math.random() * moviePage) + 1, // FrameB
  ]);

  // Holds random movie data
  const [randomMovie, setRandomMovie] = useState([
    '',  // FrameA
    '',  // FrameB
  ]);

  // Holds random movie video data
  const [randomMovieVideo, setRandomMovieVideo] = useState([
    '', // FrameA
    '', // FrameB
  ]);

  // Holds the youtube ID for the random movie video
  const [trailerID, setTrailerID] = useState([
    '', // FrameA
    '', // FrameB
  ]);

  // Holds the indice of which frame is currently offscreen
  // 0 = FrameA
  // 1 = FrameB
  const [offscreenFrame, setOffscreenFrame] = useState(1)

  // Gets movies from the random page and then randomly picks one movie from the page
  useEffect(()=> {
    
    // Api fetch link for a random movie
    const endPointRandomMovie = `https://api.themoviedb.org/3/discover/movie?
                                  include_adult=false
                                  &language=en-US
                                  &page=${randomPage[offscreenFrame]}
                                  &sort_by=popularity.desc
                                  &api_key=${apiKey}`

    // Fetch movies from the randomly selected page and then set one as the random movie
    const fetchMovies = async () => {
      const res = await fetch(endPointRandomMovie);
      if(res.ok){
        const list = await res.json();
        const randomIndex = (Math.floor(Math.random() * list.results.length));
        setRandomMovie(randomMovie => {
          const newRandomMovie = [...randomMovie];

          // Change the movie of the frame that is offscreen
          newRandomMovie[offscreenFrame] = list.results[randomIndex];

          return newRandomMovie;
        });
      }else{
        console.log("Movie Fetch failed")
      }
    };

    fetchMovies();
  }, [randomPage, offscreenFrame])

  // Gets the videos from the randomly selected movie
  useEffect(() => {

    // Api fetch link for the videos of the random movie that was chosen
    const endPointVideos = `https://api.themoviedb.org/3/movie/${randomMovie[offscreenFrame].id}/videos?
                              language=en-US
                              &api_key=${apiKey}`;

    // Fetch videos from the random movie that was chosen
    const fetchMovieVideo = async () => {
      if (randomMovie[offscreenFrame].id) {
        const res = await fetch(endPointVideos);
        if(res.ok){
          const video = await res.json();
          setRandomMovieVideo(randomMovieVideo => {
            const newRandomMovieVideo = [...randomMovieVideo];

            // Change the video of the frame that is offscreen
            newRandomMovieVideo[offscreenFrame] = video;

            return newRandomMovieVideo;
          });
        }else{
          console.log("Movie Video fetch failed")
        }
      }
    };

    fetchMovieVideo();
  }, [randomMovie, offscreenFrame]);

  // // Get the trailer when the randomMovieVideo changes
  // useEffect(()=>{
  //   getTrailer();
  // }, [offscreenFrame])

  // Gets a new random page
  function newRandomPage() {
    setRandomPage(randomPage => {
      const newRandomPage = [...randomPage];

      // Switch the movie of the offscreen frame
      newRandomPage[offscreenFrame] = Math.floor(Math.random() * moviePage) + 1

      return newRandomPage;
    });
  }

  // Finds the trailer from the video list
  function getTrailer(){
    if (randomMovieVideo[offscreenFrame].results) {
      const id = randomMovieVideo[offscreenFrame].results.find(video => video.type === 'Trailer');
      if (id) {
        setTrailerID(trailerID => {
          const newID = [...trailerID];
          newID[offscreenFrame] = id.key;
          return newID;
        });
      }else{
        // If the chosen movie has no trailer then get a new movie
        newRandomPage();
      }
    }else{
      console.log('Get trailer failed')
    }
  }

  function switchFrame(){
    newRandomPage();
    getTrailer();
    if(offscreenFrame === 0){
      setOffscreenFrame(1);
    }else{
      setOffscreenFrame(0);
    }
  }

  return (
    <>
      <div className="game-wrapper">

        <h2>{randomMovie.title}</h2>

            <div className="frameA-wrapper">

              {/* prevents hovering over the player to see the title */}
              <div className="frame-blocker" 
                style={{
                  backgroundColor: 'transparent',
                }}>
              </div> 
              
              {/* frame A */}
              <Youtube className="frameA"
                videoId={trailerID[0]}
                opts={{
                  playerVars: {
                    enablejsapi: 1,    // enables the player to be controlled by IFrame API calls
                    autoplay: 1,       // autoplay
                    controls: 0,       // disables controls         
                    disablekb: 1,      // disables keyboard controls
                    mute: 1,           // mutes
                    rel: 0,            // Makes suggested videos at the end be from the same channel
                    fs: 0,             // disables fullscreen
                    iv_load_policy: 3, // disables annotations
                  }
                }}
                key={trailerID[0]}
              />

            </div>

            <div className="frameB-wrapper">
              
              {/* prevents hovering over the player to see the title */}
              <div className="frame-blocker" 
                style={{
                  backgroundColor: 'transparent',
                }}>
              </div> 

              {/* frame B */}
              <Youtube className="frameB"
                videoId={trailerID[1]}
                opts={{
                  playerVars: {
                    enablejsapi: 1,    // enables the player to be controlled by IFrame API calls
                    autoplay: 1,       // autoplay
                    controls: 0,       // disables controls         
                    disablekb: 1,      // disables keyboard controls
                    mute: 1,           // mutes
                    rel: 0,            // Makes suggested videos at the end be from the same channel
                    fs: 0,             // disables fullscreen
                    iv_load_policy: 3, // disables annotations
                  }
                }}
                key={trailerID[1]}
              />
            </div>

      </div> {/*game-wrapper */}
      <button className="new-movie-button" onClick={()=>newRandomPage()}>New Movie</button>
      <button className="new-frame-button" onClick={()=>switchFrame()}>Switch Frame: {offscreenFrame}</button>
    </>
  )
}

export default Quiz