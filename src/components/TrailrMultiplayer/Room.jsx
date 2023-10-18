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
      guess: '',
      hp: 5000,
      frameReady: false,
      ready: false,
      uid: 'Hippolyta',
    },
    playerB: {
      guess: '',
      hp: 5000,
      present: false,
      frameReady: false,
      ready: false,
      uid: 'Norb',
    },
  });

  // Single source of truth for the roomData
  const [roomData, setRoomData] = useState({
    round: 0,
    dmgMultiplier: 1,
    movieID: "",
  });

  // Single source of truth for the onSnapShot unsubscribe functions
  const [unsub, setUnsub] = useState({
    enemy: null,
    self: null,
    room: null,
  })

  // Single source of truth for the endRound state
  const [endRound, setEndRound] = useState(false);

  // Single source of truth for the enemy player ref
  const [enemy] = useState(player === 'playerA' ? 'playerB' : 'playerA');

  // Room Firestore Ref
  const roomRef = doc(db, "rooms", roomID);

  // Self Firestore Ref
  const selfRef = doc(roomRef, player, "playerData");

  // Enemy Firestore Ref
  const enemyRef = doc(roomRef, enemy, "playerData");

  return (
    <>
    {
      roomData.round === 0 ? (
        <PreGameScreen  roomID={roomID} setRoomID={setRoomID}
                        player={player} setPlayer={setPlayer}
                        playerData={playerData} setPlayerData={setPlayerData}
                        roomData={roomData} setRoomData={setRoomData}
                        unsub={unsub} setUnsub={setUnsub}
                        selfRef={selfRef} enemyRef={enemyRef} roomRef={roomRef}
                        app={app} db={db}
                        enemy={enemy}/>
      ) : (
        <>
        <div className="gameroom-wrapper">
          <section className="playerA statbox">
            <h3>PlayerA goes here</h3>
          </section>
          <Frames         offscreenFrame={offscreenFrame} setOffscreenFrame={setOffscreenFrame}
                          movieData={movieData} setMovieData={movieData}
                          videoState={videoState} setVideoState={setVideoState}/>
          <div className="input-wrapper alive">
            <PlayerInput    offscreenFrame={offscreenFrame} setOffscreenFrame={setOffscreenFrame}
                            searchData={searchData} setSearchData={setSearchData}
                            input={input} setInput={setInput}
                            endRound={endRound} setEndRound={setEndRound}/>
          </div>
          <section className="playerB statbox">
            <h3>PlayerB goes here</h3> 
          </section>
          <EndRoundScreen offscreenFrame={offscreenFrame} setOffscreenFrame={setOffscreenFrame}
                          playerData={playerData} setPlayerData={setPlayerData}
                          movieData={movieData} setMovieData={setMovieData}
                          endRound={endRound} setEndRound={setEndRound}/>
        </div>
        </>
      )}
    </>
  )
}

export default Room;