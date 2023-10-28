/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// PARENT COMPONENT OF THE MULTIPLAYER TRAILR COMPONENTS

// Trailr Component Imports
import Room from "./Room";

// Firebase Imports
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { doc, addDoc, setDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";

// Global Variable Imports
import { firebaseConfig } from "../../globals/globalVariables";

// React Imports
import { useEffect, useState } from 'react';

// React Router imports
import { useSearchParams } from "react-router-dom";

function TrailrMultiplayer({
                            offscreenFrame, setOffscreenFrame,
                            movieData, setMovieData,
                            videoState, setVideoState,
                            searchData, setSearchData,
                            params, setParams,
                            searchParams, setSearchParams,
                            input, setInput,
                            }){

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  // Single source of truth for the roomID
  const [roomID, setRoomID] = useState('');

  // Single source of truth for the player
  const [player, setPlayer] = useState('');

  // Check the URL for params and then set params state accordingly
  useEffect(()=>{
    setParams(Object.fromEntries(searchParams.entries()));
  }, []);

  // Every time the params are updated, check to see if a player, roomID, or gameMode is present
  // If so, update the player/roomID states accordingly
  useEffect(()=>{
    if(params.player !== undefined){
      setPlayer(params.player);
    }
    if(params.roomID !== undefined){
      setRoomID(params.roomID);
    }
  }, [params])

  // Create a new room in Firestore
  async function createRoom(){

    // Room collection ref
    const newRoom = collection(db, "rooms");

    // Initialize Room
    const newRoomRef = await addDoc(newRoom, {
      dmgMultiplier: 1,
      movieInfo: {
        title: '',
        movieID: '',
        poster: '',
        backdrop: '',
        rating: null,
        releaseDate: '',
      },
      round: 0,
    });

    // PlayerA doc ref
    const initPlayerA = doc(newRoom, newRoomRef.id, "playerA", "playerData");

    // PlayerB doc ref
    const initPlayerB = doc(newRoom, newRoomRef.id, "playerB", "playerData");

    // Initialize playerA
    await setDoc(initPlayerA, {
      uid: 'Hippolyta',
      hp: 5000,
      guess: {
        title: '',
        movieID: '',
        poster: '',
        backdrop: '',
        rating: null,
        releaseDate: '',
      },
      frameReady: false,
      present: true,
    });

    // Initialize playerB
    await setDoc(initPlayerB, {
      uid: "Deraj",
      hp: 5000,
      guess: {
        title: '',
        movieID: '',
        poster: '',
        backdrop: '',
        rating: null,
        releaseDate: '',
      },
      frameReady: false,
      present: false,
    });

    // Update the URL params
    setSearchParams({ mode: "multiplayer", roomID: newRoomRef.id, player: "playerA" });

    // Update the param state
    setParams({ mode: "multiplayer", roomID: newRoomRef.id, player: "playerA" });
  }

  return (
    <>
    {
      player === '' ? (
      <div>
        <h2>Multiplayer Menu</h2>
        <button onClick={createRoom}>Create Room</button>
      </div>
    ) 
    : (
      <Room offscreenFrame={offscreenFrame} setOffscreenFrame={setOffscreenFrame}
            movieData={movieData} setMovieData={setMovieData}
            videoState={videoState} setVideoState={setVideoState}
            searchData={searchData} setSearchData={setSearchData}
            roomID={roomID} setRoomID={setRoomID}
            player={player} setPlayer={setPlayer}
            input={input} setInput={setInput}
            app={app} db={db}/>
    )}
    </>
  )
}

export default TrailrMultiplayer;