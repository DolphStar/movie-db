/* eslint-disable react/prop-types */
// Global Variable Imports
import { apiKey, firebaseConfig } from "../../globals/globalVariables";
import { moviePage } from "../../globals/globalVariables";
import { VIDEO_START, MOVIE_START } from "../../globals/globalVariables";

// Firebase imports
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { doc, addDoc, setDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";

// React Imports
import { useState, useEffect, useRef } from "react";
import Youtube from 'react-youtube';

function Frames({
                movieData, setMovieData,
                videoData, setVideoData,
                offscreenFrame, setOffscreenFrame,
                answer, setAnswer,
                game, setGame,
                countdown, setCountdown,
                isCounting, setIsCounting,
                enableStart, setEnableStart,
                videoState, setVideoState,
                roomID, setRoomID,
                }){

  // Frame references
  const frameA = useRef(null);
  const frameB = useRef(null);

  // Player references
  const youtubeA = useRef(null);
  const youtubeB = useRef(null);

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

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
    setOffscreenFrame(offscreenFrame === 0 ? 1 : 0);
  }

  // Switch the frames
  function frameCircleOfLife(){
    // Toggle the alive and dead classes
    frameA.current.classList.toggle('alive');
    frameA.current.classList.toggle('dead');
    frameB.current.classList.toggle('alive');
    frameB.current.classList.toggle('dead');

    // Switch the offscreenframe after the onscreenframe disappears
    setTimeout(()=>{
      switchFrame();
      setAnswer(false);
    }, 1750)
  }

  // Start player on the offscreenframe
  function play(){
    if(offscreenFrame === 0){
      youtubeA.current.internalPlayer.playVideo();
    }else{
      youtubeB.current.internalPlayer.playVideo();
    }
  }

  // When the offscreenFrame changes run fetchMovies (runs on initial load)
  useEffect(()=>{
    fetchMovies();
  }, [offscreenFrame])

  // When the correct answer is input change the frame
  useEffect(()=>{
    if(answer === true){
      play();
      setTimeout(()=>{
        frameCircleOfLife();
      }, 3000);
    }
  }, [answer]);

  // Pre-round countdown
  useEffect(() => {
    let intervalID;

    if (isCounting === true) {
      if (countdown > 0) {
        intervalID = setInterval(() => {
          setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);
      } else {
        setGame(true)
        setIsCounting(false);
        setCountdown(4);
      }
    }

    // Clear the interval when the component unmounts or when isCounting changes to false
    return () => {
      clearInterval(intervalID);
    };
  }, [isCounting, countdown, setIsCounting, setCountdown]);

  return (
    <>
      {/* starts as the alive frame */}
      <div className="frameA alive" ref={frameA}>
        <div className="frameA-wrapper ">
          {/* prevents hovering over the player to see the title */}
          <div className="frame-blocker" 
            style={{
              backgroundColor: game === false ? 'black' : 'transparent'
            }}>
              {/* Pregame screen */}
              {isCounting === false && game === false ? (
                <button
                className='pregame'
                disabled={enableStart}
                onClick={()=>{
                  setIsCounting(true);
                  play();
                  setTimeout(()=>{
                    frameCircleOfLife();
                  }, 3000);
              }}>Start Game</button>
              ) : game === false ? (
                <div className='pregame'>{countdown}</div>                                                
              ) : (
                null
              )}
          </div>

          {/* frame A */}
          <Youtube className="youtubeA"
            ref={youtubeA}
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
            onReady={()=>{
              setEnableStart(false);
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