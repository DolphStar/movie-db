/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */

// Firebase Imports
import { doc, addDoc, setDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";

// Global Variable Imports
import { firebaseConfig } from "../../globals/globalVariables";

// React Imports
import { useEffect } from 'react';
import { useState } from 'react';

// React Router Imports
import { useSearchParams } from "react-router-dom";

// Component Imports
import Frames from "./Frames";
import PlayerInput from "./PlayerInput";
import EndRoundScreen from "./EndRoundScreen";
import PreGameScreen from "./PreGameScreen";

function Room({
              offscreenFrame, setOffscreenFrame,
              movieData, setMovieData,
              videoState, setVideoState,
              searchData, setSearchData,
              roomID, setRoomID,
              player, setPlayer,
              input, setInput,
              db, app,
              }){

  // Single source of truth for the playerData
  const [playerData, setPlayerData] = useState({
    playerA: {
      ready: false,
      name: 'Hippolyta',
      hp: 5000,
      guess: '',
    },
    playerB: {
      ready: false,
      name: 'Norb',
      hp: 5000,
      guess: '',
      present: false,
    },
  })

  // Single source of truth for the endRound state
  const [endRound, setEndRound] = useState(false);

  // Room Firestore Ref
  const roomRef = doc(db, "rooms", roomID);

  // Self Firestore Ref
  const selfRef = doc(roomRef, player, "playerData");

  // Enemy Firestore Ref
  const enemyRef = doc(roomRef, player === "playerA" ? "playerB" : "playerA", "playerData");

  return (
    <>
    {
      playerData.playerA.ready === false || playerData.playerB.ready === false ? (
        <PreGameScreen  roomID={roomID} setRoomID={setRoomID}
                        player={player} setPlayer={setPlayer}
                        playerData={playerData} setPlayerData={setPlayerData}
                        selfRef={selfRef} enemyRef={enemyRef}
                        app={app} db={db}/>
      ) : (
        <>
        <Frames         offscreenFrame={offscreenFrame} setOffscreenFrame={setOffscreenFrame}
                        videoState={videoState} setVideoState={setVideoState}/>

        <PlayerInput    offscreenFrame={offscreenFrame} setOffscreenFrame={setOffscreenFrame}
                        searchData={searchData} setSearchData={setSearchData}
                        input={input} setInput={setInput}
                        endRound={endRound} setEndRound={setEndRound}/>
        
        <EndRoundScreen offscreenFrame={offscreenFrame} setOffscreenFrame={setOffscreenFrame}
                        playerData={playerData} setPlayerData={setPlayerData}
                        movieData={movieData} setMovieData={setMovieData}
                        endRound={endRound} setEndRound={setEndRound}/>
        </>
      )}
    </>
  )
}

export default Room;