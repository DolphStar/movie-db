/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */

// Firebase Imports
import { doc, addDoc, setDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";

// React Imports
import { useEffect } from 'react';
import { useState } from 'react';

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
  //   movieID: string,
  //   round: int, 
  // }
  const [roomData, setRoomData] = useState({
    dmgMultiplier: 0,
    movieID: '',
    round: 0,
  });

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
  // }
  const [playerData, setPlayerData] = useState({
    playerA: {
      uid: 'Hippolyta',
      hp: 5000,
      guess: { 
        title: '',
        poster: '',
        id: '',
      },
      ready: false,
      frameReady: false,
      present: true,
    },
    playerB: {
      uid: 'Deraj',
      hp: 5000,
      guess: {
        title: '',
        poster: '',
        id: '',
      },
      ready: false,
      frameReady: false,
      present: false,
    },
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

  // ONSNAPSHOTS TO LISTEN TO FIREBASE CHANGES
  // OnSnapShot to listen to room changes
  useEffect(()=>{
    const unsubRoom = onSnapshot(roomRef, (doc) => {
      if(doc.exists()){
        const data = doc.data();
        setRoomData((prevRoomData) => ({
          ...prevRoomData,
          ...data,
        }));
      }
    });

    // Store the unsubscribe function state for when the game is over
    setUnsub((prevUnsub) => ({
      ...prevUnsub,
      room: unsubRoom,
    }));
  }, [])

  // OnSnapShot to listen to the enemy playerData change
  useEffect(()=>{
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

    // Store the unsubscribe function state for when the game is over
    setUnsub((prevUnsub) => ({
      ...prevUnsub,
      enemy: unsubEnemy,
    }));
  }, [])

  // OnSnapShot to listen to self playerData change
  useEffect(()=>{
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

    // Store the unsubscribe function state for when the game is over
    setUnsub((prevUnsub) => ({
      ...prevUnsub,
      self: unsubSelf,
    }));
  }, [])

  return (
    <>
    {
      roomData.round === 0 ? (
        <PreGameScreen  player={player} setPlayer={setPlayer}
                        playerData={playerData} setPlayerData={setPlayerData}
                        roomData={roomData} setRoomData={setRoomData}
                        selfRef={selfRef} enemyRef={enemyRef} roomRef={roomRef}
                        app={app} db={db}
                        enemy={enemy}/>
                        
      ) : (
        <>
          <div className="gameroom-wrapper">
            <PlayerBoxes    playerData={playerData} setPlayerData={setPlayerData}
                            hpBar={hpBar} setHpBar={setHpBar}
                            guessHistory={guessHistory} setGuessHistory={setGuessHistory}
                            correctGuesses={correctGuesses} setCorrectGuesses={setCorrectGuesses}/>

            <Frames         offscreenFrame={offscreenFrame} setOffscreenFrame={setOffscreenFrame}
                            movieData={movieData} setMovieData={movieData}
                            videoState={videoState} setVideoState={setVideoState}/>

            <div className="input-wrapper alive">
              <PlayerInput    offscreenFrame={offscreenFrame} setOffscreenFrame={setOffscreenFrame}
                              playerData={playerData} setPlayerData={setPlayerData}
                              searchData={searchData} setSearchData={setSearchData}
                              input={input} setInput={setInput}
                              endRound={endRound} setEndRound={setEndRound}
                              guessHistory={guessHistory} setGuessHistory={setGuessHistory}
                              correctGuesses={correctGuesses} setCorrectGuesses={setCorrectGuesses}
                              selfRef={selfRef} enemyRef={enemyRef} roomRef={roomRef}
                              enemy={enemy}/>
            </div>
            
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