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

function Room({
              offscreenFrame, setOffscreenFrame,
              videoState, setVideoState,
              searchData, setSearchData,
              roomID, setRoomID,
              player, setPlayer,
              input, setInput,
              db, app,
              }){

  const [playerReady, setPlayerReady] = useState({
    playerA: false,
    playerB: false,
  });

  const [playerName, setPlayerName] = useState({
    playerA: 'Hippolyta',
    playerB: 'Norb',
  });

  // Self Firestore Ref
  const selfRef = doc(db, "rooms", roomID, player, "playerData");

  // Enemy Firestore Ref
  const enemyRef = doc(db, "rooms", roomID, player === "playerA" ? "playerB" : "playerA", "playerData");

  // Room Firestore Ref
  const roomRef = doc(db, "rooms", roomID);

  // Player ready up
  async function readyUp(){
    await setDoc(selfRef, {
      ready: true,
    });
    setPlayerReady()
  }

  // Use effect to monitor if the other player is ready
  useEffect(()=>{
    const unsubscribe = onSnapshot(enemyRef, (docSnapshot) => {
      if(docSnapshot.exists()){
        const { ready } = docSnapshot.data();
        if(player === "playerA"){
          setPlayerReady(prevReady => ({
            ...prevReady,
            playerB: ready
          }));
        }
        if(player === "playerB"){
          setPlayerReady(prevReady => ({
            ...prevReady,
            playerA: ready
          }));
        }
      }
    });
    
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Frames       offscreenFrame={offscreenFrame} setOffscreenFrame={setOffscreenFrame}
                    videoState={videoState} setVideoState={setVideoState}/>

      <PlayerInput  offscreenFrame={offscreenFrame} setOffscreenFrame={setOffscreenFrame}
                    searchData={searchData} setSearchData={setSearchData}
                    input={input} setInput={setInput}/>

      <div className="playerA">
        <h2>{playerName.playerA}</h2>
        <div>
          HP: |||||||||||||||||||||
        </div>
        <button 
          disabled={player === 'playerA' ? false : true}
          onClick={readyUp}>
            {playerReady.playerA === false ? 'Ready up' : 'Ready!'}
        </button>
        <div>
          Guesses:
        </div>
      </div>

      <div className="playerB">
        <h2>{playerName.playerB}</h2>
        <div>
          HP: |||||||||||||||||||||
        </div>
        <button 
          disabled={player === 'playerB' ? false : true} 
          onClick={readyUp}>
            {playerReady.playerA === false ? 'Ready up' : 'Ready!'}
        </button>
        <div>
          Guesses:
        </div>
      </div>
    </>
  )
}

export default Room;