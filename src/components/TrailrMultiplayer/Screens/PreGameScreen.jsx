/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */

// Firebase Imports
import { doc, addDoc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";

// Global Variable Imports
import { firebaseConfig } from "../../../globals/globalVariables";

// React Imports
import { useEffect } from 'react';
import { useState } from 'react';

function PreGameScreen({
                        player, setPlayer,
                        playerData, setPlayerData,
                        roomData, setRoomData,
                        selfRef, enemyRef, roomRef,
                        app, db,
                        enemy,
                        }){

  const [newName, setNewName] = useState('');

  const [inviteLink, setInviteLink] = useState('');

  const [linkCopied, setLinkCopied] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Listen for window width to block the search bar on mobile
  useEffect(()=>{
    function handleResize(){
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return() => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])

  // Generate the invite link for playerB
  useEffect(()=>{
    if(player === 'playerA'){
      const currentURL = window.location.href;
      const newURL = currentURL.replace('playerA', 'playerB');
      setInviteLink(newURL);
    }
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

  // Switch the round (round 1 means game starts)
  async function startGame(){
    try {
      await updateDoc(roomRef, {
        round: 1,
      })
    } catch (error) {
      console.log("Error switching the round")
    }
  }
  
  return (
    <>
    <div className="pregame-screen">
      <section className="playerA-pregame">
        {
          player === 'playerA' && playerData.playerA.ready === false ? (
            <div className="playerA-pregame-name-input">
              <h3>{playerData.playerA.uid}</h3>
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
              <h3>{playerData.playerA.uid}</h3>
              <button onClick={startGame} disabled={playerData.playerB.ready === false || player === 'playerB' ? true : false}>Start Game</button>
              <p>{playerData.playerA.ready === false ? 'Set a name to ready up' : 'Ready'}</p>
            </div>
          )
        }
      </section>
      <section className="playerB-pregame">
      {
        player === 'playerA' && playerData.playerB.present === false ? (
          <div id="invite-player-b">
            <h3>Invite a friend!</h3>
            <button onClick={copyToClipBoard}>{linkCopied === false ? "Copy Invite Link" : "Copied!"}</button>
          </div>
        ) : 
        player === 'playerB' && playerData.playerB.ready === false ? (
          <div className="playerB-pregame-name-input">
            <h3>{playerData.playerB.uid}</h3>
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
            <h3>{playerData.playerB.uid}</h3>
            <p>{playerData.playerB.ready === false ? 'Set a name to ready up' : 'Ready'}</p>
          </div>
        )
      }
      </section>
    </div>
    <div className="searchBar-blocker"
      style={{
        position: 'absolute',
        top: '1px',
        left: '50%',
        transform: 'translate(-50%)',
        backgroundColor: 'black',
        width: windowWidth >= 700 ? '50px' : '0',
        height: '150px',
        zIndex: '99',
      }}>
    </div>
    </>
  )
}

export default PreGameScreen