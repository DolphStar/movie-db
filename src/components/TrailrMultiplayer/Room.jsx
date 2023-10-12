/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */

// Firebase Imports
import { doc, addDoc, setDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";

// Global Variable Imports
import { firebaseConfig } from "../../globals/globalVariables";

// React Imports
import { useEffect } from 'react';
 
// React Router Imports
import { useSearchParams } from "react-router-dom";

// Component Imports
import Frames from "./Frames";
import PlayerInput from "./PlayerInput";

function Room({
              roomID, setRoomID,
              player, setPlayer,
              offscreeFrame, setoffScreenFrame,
              videoState, setVideoState,
              db, app,
              }){

  return (
    <>
      <Frames offscreenFrame={offscreeFrame} setOffscreenFrame={setoffScreenFrame}
              videoState={videoState} setVideoState={setVideoState}/>
      <h2>Invite another player</h2>
      <p>Current room: {roomID}</p>
      <p>Invite link: LINK GOES HERE</p>
    </>
  )
}

export default Room;