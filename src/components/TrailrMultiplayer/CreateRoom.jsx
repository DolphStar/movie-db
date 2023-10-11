/* eslint-disable react/prop-types */

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
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function CreateRoom({
                    roomID, setRoomID,
                    }){

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(app);

    // Params
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);

    useEffect(()=>{
      const params = new URLSearchParams(location.search).get('playerA');
      if(params !== undefined){
        console.log("You are playerA");
      }else{
        console.log("You are playerB");
      }
    }, [])

  return (
    <>
    <h2>Create a room</h2>
    <div>
      
    </div>

    </>
  )
}

export default CreateRoom;

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