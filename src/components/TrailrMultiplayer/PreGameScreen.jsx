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

function PreGameScreen({
                        roomID, setRoomID,
                        player, setPlayer,
                        playerData, setPlayerData,
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

  // Copy the invite link to clipboard
  async function copyToClipBoard(){
    await navigator.clipboard.writeText(inviteLink);
    setLinkCopied(true);
  }

  // Change the player name
  function changePlayerName(){
    setPlayerData((prevPlayerData) => ({
      ...prevPlayerData,
      [player]: {
        ...prevPlayerData[player],
        name: newName,
      },
    }));
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