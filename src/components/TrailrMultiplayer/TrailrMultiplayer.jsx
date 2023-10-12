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
                            videoState, setVideoState,
                            searchData, setSearchData,
                            roomID, setRoomID,
                            player, setPlayer,
                            params, setParams,
                            gameMode, setGameMode,
                            searchParams, setSearchParams,
                            input, setInput,
                            }){

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

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
    if(params.mode !== undefined){
      setGameMode(params.mode);
    }
  }, [params])

  // Create a new room in Firestore
  async function createRoom(){

    // Room collection ref
    const newRoom = collection(db, "rooms");

    // Create a new room **DOCUMENT**
    const newRoomRef = await addDoc(newRoom, {
      dmgMultiplier: 1,
      movieID: "Waiting for playerB",
    });

    // New player data doc ref (inside of the playerA collection)
    const newPlayerData = doc(newRoom, newRoomRef.id, "playerA", "playerData")

    // Set the initial playerA data
    await setDoc(newPlayerData, {
      hp: 5000,
      uid: "Hippolyta",
      ready: false,
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