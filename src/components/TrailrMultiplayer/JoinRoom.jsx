/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */

// Firebase Imports
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { doc, addDoc, setDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";

// Global Variable Imports
import { firebaseConfig } from "../../globals/globalVariables";

// React Imports
import { useEffect } from 'react';
 
// React Router Imports
import { useSearchParams } from "react-router-dom";

function JoinRoom({
                    roomID, setRoomID,
                    player, setPlayer,
                    }){

  return (
    <>
    <h2>Join a room</h2>
    <p>Connected room: {roomID}</p>
    </>
  )
}

export default JoinRoom;

// async function makeRoom(){

//   // Room collection ref
//   const newRoom = collection(db, "rooms");

//   // Create a new room **DOCUMENT**
//   const newRoomRef = await addDoc(newRoom, {
//     dmgMultiplier: 1,
//     movieID: "Spiderman",
//   });

//   // New player data doc ref (inside of the playerA collection)
//   const newPlayerData = doc(newRoom, newRoomRef.id, "playerA", "playerData")

//   // Set the initial playerA data
//   await setDoc(newPlayerData, {
//     hp: 'testing',
//     uid: '123456789',
//   });

//   setRoomID(newRoomRef.id);

//   console.log("Auto-generated room ID: ", newRoomRef.id);