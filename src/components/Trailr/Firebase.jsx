// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { doc, addDoc, setDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";

import { useState } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { firebaseConfig } from "../../globals/globalVariables";

function Firebase() {

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(app);

    // Single source of truth for the roomID
    const [roomID, setRoomID] = useState('Not in a room');

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

      // New player data ref (inside of the playerA collection)
      const newPlayerData = doc(newPlayer, "playerData")

      // Set the initial playerA data
      await setDoc(newPlayerData, {
        hp: 'testing',
      });

      setRoomID(newRoomRef.id);

      console.log("Auto-generated room ID: ", newRoomRef.id);
    }

    async function makeNewRoom(){
    }

  return (
    <>
    
    <div className="dev-panel-firebase">
      <h3>Firebase dev panel</h3>
      <p>Current Room: {roomID}</p>
      <button onClick={makeRoom}>Generate Room</button>
    </div>

    </>
  )
}

export default Firebase