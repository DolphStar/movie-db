import { apiKey, moviePage, VIDEO_START, MOVIE_START } from "../globals/globalVariables";
import Youtube from 'react-youtube';
import { useState, useEffect, useRef } from "react";

function Trailr() {

  // Frame references
  const frameAWrapper = useRef(null);
  const frameBWrapper = useRef(null);

  // Holds the movie data for each Frame
  // 0 = FrameA
  // 1 = FrameB
  const [movieData, setMovieData] = useState([
    {}, // FrameA
    {}, // FrameB
  ]);
  
  // Holds the trailerID for each Frame
  const [videoData, setVideoData] = useState([
    [// FrameA
      [], // Trailer Data
      '', // TrailerID
    ], // FrameA
    [// FrameB
      [], // Trailer Data
      '', // TrailerID
    ],
  ]);

  // Holds the current round
  const [round, setRound] = useState(true);

  // Holds the indice of which frame is currently offscreen
  // 0 = FrameA
  // 1 = FrameB
  const [offscreenFrame, setOffscreenFrame] = useState(1);

  // Get a new movie
  async function fetchMovies(){
    const randomPage = Math.floor(Math.random() * moviePage) + 1;
    const moviesEndpoint = `${MOVIE_START}&page=${randomPage}&sort_by=popularity.desc&with_original_language=en&api_key=${apiKey}`;

    const res = await fetch(moviesEndpoint);
    if(res.ok){
      const movieList = await res.json();
      const randomIndex = (Math.floor(Math.random() * movieList.results.length));
      
      // Change the movie data of the offscreen frame
      setMovieData(movieData => {
        const newMovieData = [...movieData];
        newMovieData[offscreenFrame] = movieList.results[randomIndex];
        // Calling fetch videos here to fix the state update lag issue
        fetchVideos(newMovieData[offscreenFrame].id);
        return newMovieData;
      });
    }else{
      console.log("Movie fetch failed ", res.status);
    }
  }

  // Get the trailer 
  async function fetchVideos(id) {
    const videosEndpoint = `${VIDEO_START}${id}/videos?language=en-US&api_key=${apiKey}`;
  
    const res = await fetch(videosEndpoint);
    if (res.ok) {
      const video = await res.json();
      // Get the trailer data and the trailerID from the list of videos
      setVideoData(videoData => {
        const newVideoData = [...videoData];
        newVideoData[offscreenFrame][0] = video.results.find(video => video.type === 'Trailer');
        if (newVideoData[offscreenFrame][0]) {
          newVideoData[offscreenFrame][1] = newVideoData[offscreenFrame][0].key;
        } else {
          console.log("No trailer found")
        }
        return newVideoData;
      });
    } else {
      console.log("Video fetch failed endpoint attempted", videosEndpoint)
    }
  }

  // Switch the offscreen frame
  function switchFrame(){
    if(offscreenFrame === 1){
      // Set the active frame to FrameA and then remove the active-frame class
      setOffscreenFrame(0);
      frameAWrapper.current.classList.remove('active-frame');
      frameBWrapper.current.classList.add('active-frame');
    }else{
      // Set the active frame to FrameB and then remove the active-frame class
      setOffscreenFrame(1);
      frameBWrapper.current.classList.remove('active-frame');
      frameAWrapper.current.classList.add('active-frame');
    }
  }

  // On page load prep the offscreen frame
  useEffect(()=>{
    fetchMovies();
  }, [])

  // When the offscreenFrame changes run fetchMovies
  useEffect(()=>{
    fetchMovies();
  }, [offscreenFrame])

  return (
    <>
      <h2>Current offscreenFrame: {offscreenFrame}</h2>
      <div className="game-wrapper">
          {/* starts as the active frame */}
          <div className="frameA-wrapper active-frame"
            ref={frameAWrapper}
            style={{
              right: offscreenFrame === 0 ? '-2000px' : '0%',
            }}>
            {/* prevents hovering over the player to see the title */}
            <div className="frame-blocker" 
              style={{
                backgroundColor: 'transparent',
                zIndex: 9999,
              }}>
            </div>
            {/* frame A */}
            <Youtube className="frameA"
              videoId={videoData[0][1]}
              opts={{
                playerVars: {
                  enablejsapi: 1,    // enables the player to be controlled by IFrame API calls
                  autoplay: 0,       // autoplay
                  controls: 0,       // disables controls         
                  disablekb: 1,      // disables keyboard controls
                  mute: 1,           // mutes
                  rel: 0,            // Makes suggested videos at the end be from the same channel
                  fs: 0,             // disables fullscreen
                  iv_load_policy: 3, // disables annotations
                }
              }}
              key={videoData[0][1]}
            />
          </div>

          <div className="frameB-wrapper"
            ref={frameBWrapper}
            style={{
              left: offscreenFrame === 1 ? '-2000px' : '0%',
            }}>
            {/* prevents hovering over the player to see the title */}
            <div className="frame-blocker" 
              style={{
                backgroundColor: 'transparent',
                zIndex: 9999,
              }}>
            </div> 

            {/* frame B */}
            <Youtube className="frameB"
              videoId={videoData[1][1]}
              opts={{
                playerVars: {
                  enablejsapi: 1,    // enables the player to be controlled by IFrame API calls
                  autoplay: 0,       // autoplay
                  controls: 0,       // disables controls         
                  disablekb: 1,      // disables keyboard controls
                  mute: 1,           // mutes
                  rel: 0,            // Makes suggested videos at the end be from the same channel
                  fs: 0,             // disables fullscreen
                  iv_load_policy: 3, // disables annotations
                }
              }}
              key={videoData[1][1]}
            />
          </div>
      </div> {/*game-wrapper */}
      <button className="switch-frame" onClick={()=>switchFrame()}>Switch Offscreen</button>
    </>
  )
}

export default Trailr;