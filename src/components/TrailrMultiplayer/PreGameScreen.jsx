/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */

// Firebase Imports
import { doc, addDoc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";

// Global Variable Imports
import { firebaseConfig } from "../../globals/globalVariables";

// React Imports
import { useEffect } from 'react';
import { useState } from 'react';

function PreGameScreen({
                        roomID, setRoomID,
                        player, setPlayer,
                        playerData, setPlayerData,
                        roomData, setRoomData,
                        selfRef, enemyRef, roomRef,
                        uns
                        app, db,
                        enemy,
                        }){

  const [newName, setNewName] = useState('');

  const [inviteLink, setInviteLink] = useState('');

  const [linkCopied, setLinkCopied] = useState(false);

  // Generate the invite link for playerB
  useEffect(()=>{
    if(player === 'playerA'){
      const currentURL = window.location.href;
      const newURL = currentURL.replace('playerA', 'playerB');
      setInviteLink(newURL);
    }
  }, [])

  // OnSnapShot to listen to room changes
  useEffect(()=>{
    const unsubscribeRoom = onSnapshot(roomRef, (doc) => {
      if(doc.exists()){
        const data = doc.data();
        setRoomData((prevRoomData) => ({
          ...prevRoomData,
          ...data,
        }));
      }
    });

    // Store the unsubscribe function state for when the game is over
    setUnsubscribers((prevUnsubscribers) => ({
      ...prevUnsubscribers,
      room: unsubscribeRoom,
    }));
  }, [])

  // OnSnapShot to listen to the enemy playerData change
  useEffect(()=>{
    const unsubscribeEnemy = onSnapshot(enemyRef, (doc) => {
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
    setUnsubscribers((prevUnsubscribers) => ({
      ...prevUnsubscribers,
      enemy: unsubscribeEnemy,
    }));
  }, [])

  // OnSnapShot to listen to self playerData change
  useEffect(()=>{
    const unsubscribeSelf = onSnapshot(selfRef, (doc) => {
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
    setUnsubscribers((prevUnsubscribers) => ({
      ...prevUnsubscribers,
      self: unsubscribeSelf,
    }));
  }, [])

  // When playerB joins set playerB present to true in db
  useEffect(()=>{
    if(player === 'playerB'){
      playerBAttendance()
    }
  }, [])

  // When playerB joins the room, set playerB as present in DB
  async function playerBAttendance(){
    try {
      await updateDoc(selfRef, {
        present: true,
      })
    } catch (error) {
      console.log("Error setting playerB as present: ", error)
    }
  }

  // Copy the invite link to clipboard
  async function copyToClipBoard(){
    await navigator.clipboard.writeText(inviteLink);
    setLinkCopied(true);
  }

  // Update player name
  async function changePlayerName(){
    try {
      await updateDoc(selfRef, {
        uid: newName,
        ready: true,
      })
    } catch (error) {
      console.log("Error updating name");
    }
  }

  // Start the game
  async function startGame(){
    try {
      await updateDoc(roomRef, {
        round: 1,
      })
    } catch (error) {
      console.log("Updating the roomDoc to start the game")
    }
  }
  
  return (
    <>
    <div className="pre-game-screen">
      <section className="playerA-pregame">
        {
          player === 'playerA' && playerData.playerA.ready === false ? (
            <div>
              <h3>{playerData.playerA.name}</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  changePlayerName();
                }}
              >
                <input 
                  type="text"
                  placeholder="New name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
                <button type="submit">Set Name</button>
              </form>
            </div>
          ) : (
            <div className="ready-box">
              <h3>{playerData.playerA.name}</h3>
              <p>{playerData.playerA.ready === false ? 'Not ready' : 'Ready'}</p>
              <button onClick={startGame} disabled={!playerData.playerB.ready}>Start Game</button>
            </div>
          )
        }
      </section>
      <section className="playerB-pregame">
      {
        player === 'playerA' && playerData.playerB.present === false ? (
          <div id="invite-player-b">
            <h3>Invite a friend!</h3>
            <p>{inviteLink}</p>
            <button onClick={copyToClipBoard}>{linkCopied === false ? "Copy Invite Link" : "Copied!"}</button>
          </div>
        ) : 
        player === 'playerB' && playerData.playerB.ready === false ? (
          <div className="playerB-pregame">
            <h3>{playerData.playerB.name}</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                changePlayerName();
              }}
            >
              <input 
                type="text"
                placeholder="New name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <button type="submit">Set Name</button>
            </form>
          </div>
        ) : (
          <div className="ready-box">
            <h3>{playerData.playerB.name}</h3>
            <p>{playerData.playerB.ready === false ? 'Not ready' : 'Ready'}</p>
          </div>
        )
      }
      </section>
    </div>
    </>
  )
}

export default PreGameScreen