/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */

// Global Variable Imports
import { apiKey } from "../../../globals/globalVariables";
import { moviePage } from "../../../globals/globalVariables";
import { VIDEO_START, MOVIE_START } from "../../../globals/globalVariables";

// React Imports
import { useState, useEffect, useRef } from "react";
import Youtube from 'react-youtube';

// Firebase Imports
import { doc, addDoc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";

function Frames({
                offscreenFrame, setOffscreenFrame,
                roomData, setRoomData,
                videoState, setVideoState,
                selfRef, enemyRef, roomRef,
                enemy, player, setPlayer,
                }){

  // Frame references
  const frameA = useRef(null);
  const frameB = useRef(null);

  // Player references
  const youtubeA = useRef(null);
  const youtubeB = useRef(null);

  // Single source of truth for the video keys
  const [videoKeys, setVideoKeys] = useState([
    '',
    '',
  ])

  // Switch the offscreen frame
  function switchFrame(){
    setOffscreenFrame(offscreenFrame === 0 ? 1 : 0);
  }

  // Switch the frames
  function frameCircleOfLife(){
    // Toggle the alive and dead classes
    frameA.current.classList.toggle('alive');
    frameA.current.classList.toggle('dead');
    frameB.current.classList.toggle('alive');
    frameB.current.classList.toggle('dead');
  }

  // Start player on the offscreenframe
  function play(){
    if(offscreenFrame === 0){
      youtubeA.current.internalPlayer.playVideo();
    }else{
      youtubeB.current.internalPlayer.playVideo();
    }
  }

  async function fetchMovies(){
    // Get a random page to choose from and then fetch movies from that page
    const randomPage = Math.floor(Math.random() * moviePage) + 1;
    const moviesEndpoint = `${MOVIE_START}&page=${randomPage}&sort_by=popularity.desc&with_original_language=en&api_key=${apiKey}`;
    const res = await fetch(moviesEndpoint);

    if(res.ok){
      // Get a random movie from the list of that got fetched
      const movieList = await res.json();
      const randomIndex = (Math.floor(Math.random() * movieList.results.length));
      const randomMovie = movieList.results[randomIndex];
      return randomMovie;
    }else{
      console.log("Fetch Movies Failed")
    }
  }

  async function fetchVideos(id){
    // Fetch the videos for the chosen movie
    const videosEndpoint = `${VIDEO_START}${id}/videos?language=en-US&api_key=${apiKey}`;
    const res = await fetch(videosEndpoint);

    if(res.ok){
      // Get the trailer from the video list
      const video = await res.json();
      const trailer = video.results.find(video => video.type === 'Trailer');
      return trailer;
    }else{
      console.log("Fetch Videos Failed")
    }
  }

  async function updateMovieInfo(){
    const movieInfo = await fetchMovies();
    const videoInfo = await fetchVideos(movieInfo.id);
    // Change the video key of the offscreenframe
    const videoKeyTag = roomData.round % 2 === 0 ? 'videoKeyFrameA' : 'videoKeyFrameB';

    // Send the movieInfo and video key to the db spot 
    await updateDoc(roomRef, {
      [videoKeyTag]: videoInfo.key,
      movieInfo: {
        title: movieInfo.title,
        movieID: movieInfo.id,
        poster: movieInfo.poster_path,
        backdrop: movieInfo.backdrop_path,
        rating: movieInfo.vote_average,
        releaseDate: movieInfo.release_date,
      }
    })

    console.log("Update Movie Info Ran")
  }

  // If the movieID is empty then playerA sends the initial data on load
  useEffect(()=>{
    if(roomData.movieInfo.movieID === '' && player === 'playerA'){
      updateMovieInfo();
    }
  }, [])
  
  return (
    <>
      {/* starts as the alive frame */}
      <div className="frameA alive" ref={frameA}>
        <div className="frameA-wrapper ">
          {/* frame A */}
          <Youtube className="youtubeA"
            ref={youtubeA}
            videoId={roomData.videoKeyFrameA}
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
            key={roomData.videoKeyFrameA}
            onStateChange={(event)=>{
              setVideoState((prevVideoState) => ({
                ...prevVideoState,
                frameA: event.data,
              }));
            }}
          />
        </div>
      </div>
      
      {/* starts as the dead frame */}
      <div className="frameB dead" ref={frameB}>
        <div className="frameB-wrapper ">
          {/* prevents hovering over the player to see the title */}
          <div className="frame-blocker" 
            style={{
              // backgroundColor: offscreenFrame === 0 ? 'rgba(0, 128, 0, 0.6)' : 'rgba(255, 0, 0, 0.6)'
            }}>
          </div> 

          {/* frame B */}
          <Youtube className="youtubeB"
            ref={youtubeB}
            videoId={roomData.videoKeysFrameB}
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
            key={roomData.videoKeysFrameB}
            onReady={()=>{
            }}
            onStateChange={(event)=>{
              setVideoState((prevVideoState) => ({
                ...prevVideoState,
                frameB: event.data,
              }));
            }}
          />
        </div>
      </div>    
       
    </>
  )
}

export default Frames;