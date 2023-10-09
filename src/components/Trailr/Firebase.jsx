/* eslint-disable react/prop-types */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { doc, addDoc, setDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";

import { useState } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { firebaseConfig } from "../../globals/globalVariables";

function Firebase({
                  roomID, setRoomID,
                  }){

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(app);

    async function makeRoom(){

      // Room collection ref
      const newRoom = collection(db, "rooms");

      // Create a new room **DOCUMENT**
      const newRoomRef = await addDoc(newRoom, {
        dmgMultiplier: 1,
        movieID: "Spiderman",
      });

      // New player ref (inside of the room that was just created)
      const newPlayer = collection(newRoom, newRoomRef.id, "playerA");

      // New player data doc ref (inside of the playerA collection)
      const newPlayerData = doc(newPlayer, "playerData")

      // Set the initial playerA data
      await setDoc(newPlayerData, {
        hp: 'testing',
        uid: '123456789',

      });

      setRoomID(newRoomRef.id);

      console.log("Auto-generated room ID: ", newRoomRef.id);
    }

    async function makeNewRoom(){
    }

  return (
    <>

    <div>
      <button onClick={makeRoom}>Create a Room</button>
    </div>

    </>
  )
}

export default Firebase