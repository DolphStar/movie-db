/* eslint-disable react/prop-types */
// Global Variable Imports
import { apiKey } from "../../globals/globalVariables";
import { moviePage } from "../../globals/globalVariables";
import { VIDEO_START, MOVIE_START } from "../../globals/globalVariables";

// React Imports
import { useState, useEffect, useRef } from "react";
import Youtube from 'react-youtube';

// Firebase Imports
import { doc, addDoc, setDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";

function Frames({
                offscreenFrame, setOffscreenFrame,
                videoState, setVideoState,
                }){

  // Frame references
  const frameA = useRef(null);
  const frameB = useRef(null);

  // Player references
  const youtubeA = useRef(null);
  const youtubeB = useRef(null);

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

  return (
    <>
      {/* starts as the alive frame */}
      <div className="frameA alive" ref={frameA}>
        <div className="frameA-wrapper ">
          {/* frame A */}
          <Youtube className="youtubeA"
            ref={youtubeA}
            videoId={1234567890}
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
            key={1234567890}
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
            videoId={1234567890}
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
            key={1234567890}
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