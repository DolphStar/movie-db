/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */

// Firebase Imports
import { doc, addDoc, setDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";

// React Imports
import { useEffect } from 'react';
import { useState } from 'react';

// Global Imports
import { roomInit, playerAInit, playerBInit } from "../../globals/globalVariables";

// Component Imports
import Frames from "./RoomComponents/Frames";
import PlayerInput from "./RoomComponents/PlayerInput";
import EndRoundScreen from "./Screens/EndRoundScreen";
import PreGameScreen from "./Screens/PreGameScreen";
import PlayerBoxes from "./RoomComponents/PlayerBoxes";

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


  // Single source of truth for the client side roomData
  // {
  //   dmgMultiplier: int,
  //   movieID: obj,
  //   round: int, 
  // }
  const [roomData, setRoomData] = useState(roomInit);

  // Single source of truth for the client side playerData
  // {
  //   uid: string,
  //   hp: int,
  //   guess: {
  //     title: string,
  //     poster: string,
  //     id: string,
  //   },
  //   ready: bool,
  //   frameReady: bool,
  //   present: bool,
  // }
  const [playerData, setPlayerData] = useState({
    playerA: playerAInit,
    playerB: playerBInit,
  });

  // Single source of truth for the endRound state
  const [endRound, setEndRound] = useState(false);

  // Single source of truth for the enemy player ref
  const [enemy] = useState(player === 'playerA' ? 'playerB' : 'playerA');

  // Single source of truth for the playerHP
  const [hpBar, setHpBar] = useState({
    playerA: 100,
    playerB: 100,
  });

  // Single source of truth for the guess history
  // {
  //   player: '',
  //   guess: '',
  // }
  const [guessHistory, setGuessHistory] = useState([]);

  // Single source of truth for correct guesses
  // {
  //   player: '',
  //   dmgDealt: 0,
  //   movieData: {},
  // }
  const [correctGuesses, setCorrectGuesses] = useState([])

  // Room Firestore Ref
  const roomRef = doc(db, "rooms", roomID);

  // Self Firestore Ref
  const selfRef = doc(roomRef, player, "playerData");

  // Enemy Firestore Ref
  const enemyRef = doc(roomRef, enemy, "playerData");

  // OnSnapShot to listen to room, enemy, and self doc changes
  useEffect(()=>{

    // Room
    const unsubRoom = onSnapshot(roomRef, (doc) => {
      if(doc.exists()){
        const data = doc.data();
        setRoomData((prevRoomData) => ({
          ...prevRoomData,
          ...data,
        }));
      }
    });

    // Enemy
    const unsubEnemy = onSnapshot(enemyRef, (doc) => {
      if(doc.exists()){
        const data = doc.data();
        setPlayerData((prevPlayerData) => ({
          ...prevPlayerData,
          [enemy]: {
            ...prevPlayerData[enemy],
            ...data,
          },
        }));
      }
    });

    // Self
    const unsubSelf = onSnapshot(selfRef, (doc) => {
      if(doc.exists()){
        const data = doc.data();
        setPlayerData((prevPlayerData) => ({
          ...prevPlayerData,
          [player]: {
            ...prevPlayerData[player],
            ...data,
          },
        }));
      }
    });

    // Stop listening for changes when the component unmounts
    return () => {
      unsubRoom();
      unsubEnemy();
      unsubSelf();
    }
  }, [])

  return (
    <>
      <div className="gameroom-wrapper">
        <PlayerBoxes    roomData={roomData} setRoomdata={setRoomData}
                        playerData={playerData} setPlayerData={setPlayerData}
                        enemy={enemy} player={player} setPlayer={setPlayer}
                        hpBar={hpBar} setHpBar={setHpBar}
                        guessHistory={guessHistory} setGuessHistory={setGuessHistory}
                        correctGuesses={correctGuesses} setCorrectGuesses={setCorrectGuesses}
                        selfRef={selfRef} enemyRef={enemyRef} roomRef={roomRef}/>

        <Frames         offscreenFrame={offscreenFrame} setOffscreenFrame={setOffscreenFrame}
                        roomData={roomData} setRoomData={setRoomData}
                        videoState={videoState} setVideoState={setVideoState}
                        selfRef={selfRef} enemyRef={enemyRef} roomRef={roomRef}
                        enemy={enemy} player={player} setPlayer={setPlayer}/>

        <PlayerInput    offscreenFrame={offscreenFrame} setOffscreenFrame={setOffscreenFrame}
                        playerData={playerData} setPlayerData={setPlayerData}
                        searchData={searchData} setSearchData={setSearchData}
                        input={input} setInput={setInput}
                        endRound={endRound} setEndRound={setEndRound}
                        guessHistory={guessHistory} setGuessHistory={setGuessHistory}
                        correctGuesses={correctGuesses} setCorrectGuesses={setCorrectGuesses}
                        selfRef={selfRef} enemyRef={enemyRef} roomRef={roomRef}
                        enemy={enemy}/>
        
        <EndRoundScreen offscreenFrame={offscreenFrame} setOffscreenFrame={setOffscreenFrame}
                        playerData={playerData} setPlayerData={setPlayerData}
                        movieData={movieData} setMovieData={setMovieData}
                        endRound={endRound} setEndRound={setEndRound}/>
      </div>
    </>
  )
}

export default Room;