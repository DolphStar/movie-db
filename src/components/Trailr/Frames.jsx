/* eslint-disable react/prop-types */
import Youtube from 'react-youtube';
import { apiKey, moviePage, VIDEO_START, MOVIE_START } from "../../globals/globalVariables";
import { useState, useEffect, useRef } from "react";

function Frames({movieData, setMovieData,
                 videoData, setVideoData,
                 offscreenFrame, setOffscreenFrame
                 }) {

  // Frame references
  const frameA = useRef(null);
  const frameB = useRef(null);

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
    }else{
      // Set the active frame to FrameB and then remove the active-frame class
      setOffscreenFrame(1);
    }
  }

  // Toggle the alive and dead classes
  function frameCircleOfLife(){
    frameA.current.classList.toggle('alive');
    frameA.current.classList.toggle('dead');
    frameB.current.classList.toggle('alive');
    frameB.current.classList.toggle('dead');

    // Switch the frame after 4 seconds
    setTimeout(()=>{
      switchFrame();
    }, 2000)
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
      {/* starts as the alive frame */}
      <div className="frameA alive" ref={frameA}>
        <div className="frameA-wrapper ">
          {/* prevents hovering over the player to see the title */}
          <div className="frame-blocker" 
            style={{
            }}>
          </div>

          {/* frame A */}
          <Youtube className="youtubeA"
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
      </div>
      
      {/* starts as the dead frame */}
      <div className="frameB dead" ref={frameB}>
        <div className="frameB-wrapper ">
          {/* prevents hovering over the player to see the title */}
          <div className="frame-blocker" 
            style={{
            }}>
          </div> 

          {/* frame B */}
          <Youtube className="youtubeB"
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
      </div>
      {/* buttons for testing */}
      <div className="dev-panel-frames">
        <h3>Frames dev panel</h3>
        <p>Current offscreenFrame: {offscreenFrame}</p>
        <button onClick={()=>frameCircleOfLife()}>Nants ingonyama</button>
      </div>
    </>
  )
}

export default Frames;