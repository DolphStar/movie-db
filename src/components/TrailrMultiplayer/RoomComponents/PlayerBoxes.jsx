// Player Boxes (guesses history, player name display, and player HP bars)
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */

// Firebase Imports
import { doc, addDoc, setDoc, updateDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";

// React Imports
import { useEffect } from 'react';
import { useState } from 'react';

function PlayerBoxes({
                    roomData, setRoomData,
                    playerData, setPlayerData,
                    enemy, player, setPlayer,
                    hpBar, setHpBar,
                    guessHistory, setGuessHistory,
                    correctGuesses, setCorrectGuesses,
                    selfRef, enemyRef, roomRef,
                    }){

    // Pregame screen
    const [newName, setNewName] = useState('');
    const [inviteLink, setInviteLink] = useState('');
    const [linkCopied, setLinkCopied] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Copy the invite link to clipboard
    async function copyToClipBoard(){
        await navigator.clipboard.writeText(inviteLink);
        setLinkCopied(true);
    }

    // Set playerB joins the room, set playerB as present
    async function playerBAttendance(){
        await updateDoc(selfRef, {
            present: true,
        });
    }

    // Update player name
    async function changePlayerName(){
        await updateDoc(selfRef, {
            uid: newName,
            ready: true,
        });
    }

    // Track the window size to show the correct layout
    useEffect(()=>{

        function handleResize(){
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);

        // Stop tracking when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    // Generate invite link for playerB
    useEffect(()=>{
        if(player === 'playerA'){
            const currentURL = window.location.href;
            const newURL = currentURL.replace('playerA', 'playerB');
            setInviteLink(newURL);
        }
    }, [])

    // Set playerB as present when they join
    useEffect(()=>{
        if(player === 'playerB'){
            playerBAttendance();
        }
    }, [])

    // Update the HP when the player takes damage
    useEffect(()=>{
        setHpBar((prevHpBar)=> ({
        ...prevHpBar,
        playerA: (playerData.playerA.hp / 5000) * 100,
        playerB: (playerData.playerB.hp / 5000) * 100,
        }));
    }, [playerData.playerA.hp, playerData.playerB.hp])

    return (
        <>
            {   
                // Mobile player box layout
                windowWidth < 1100 ? (
                    <>
                        <div className="playerA">
                            <div className="statbox-wrapper">
                                <p>{playerData.playerA.uid}</p>
                                <div className="hp-bar-wrapper">
                                    <div className="hp-bar" 
                                        style={{
                                            width: `${hpBar.playerA}%`,
                                            height: '25px',
                                            backgroundColor: hpBar.playerA <= 100 && hpBar.playerA >= 50 ? 'green' :
                                                             hpBar.playerA < 50 && hpBar.playerA >= 25 ? 'yellow' :
                                                             'red',
                                            }}>
                                            <span className="hp">{playerData.playerA.hp}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="playerB">
                            <div className="statbox-wrapper">
                                <p>{playerData.playerB.uid}</p>
                                <div className="hp-bar-wrapper">
                                    <div className="hp-bar" 
                                        style={{
                                            width: `${hpBar.playerB}%`,
                                            height: '25px',
                                            backgroundColor: hpBar.playerB <= 100 && hpBar.playerB >= 50 ? 'green' :
                                                             hpBar.playerB < 50 && hpBar.playerB >= 25 ? 'yellow' :
                                                             'red',
                                            }}>
                                        <span className="hp">{playerData.playerB.hp}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="guess-history-combined">
                            {
                                roomData.round === 0 ? (
                                    <>
                                    <section className='playerA-pregame'>
                                        {
                                            player === 'playerA' && playerData.playerA.ready === false ? (
                                                <div className="playerA-pregame-name-input">
                                                    <form onSubmit={(e) => {
                                                            e.preventDefault();
                                                            changePlayerName();
                                                            }}>
                                                        <input
                                                            type="text"
                                                            placeholder="New name"
                                                            value={newName}
                                                            onChange={(e) => setNewName(e.target.value)}/>
                                                        <button type="submit">Set Name</button>
                                                    </form>
                                                </div>
                                            ) : 
                                            player === 'playerA' && playerData.playerA.ready === true ? (
                                                <div className="readybox">
                                                    <h3>{playerData.playerA.uid}</h3>
                                                    <div>
                                                        {
                                                            playerData.playerB.ready === false ? (
                                                                <p>Waiting for opponent to ready up</p>
                                                            ) : (
                                                                <p>Ready</p>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            ) : 
                                            player === 'playerB' && playerData.playerA.ready === false ? (
                                                <div className="enemy-set-name">
                                                    <p>Waiting for opponent to set name</p>
                                                </div>
                                            ) : (
                                                <div className="readybox">
                                                    <h3>{playerData.playerA.uid}</h3>
                                                    <p>Ready</p>
                                                </div>
                                            )
                                        }
                                    </section>
                                    <section className='playerB-pregame'>
                                        {
                                            player === 'playerB' && playerData.playerB.ready === false ? (
                                                <div className="playerB-pregame-name-input">
                                                    <form onSubmit={(e) => {
                                                            e.preventDefault();
                                                            changePlayerName();
                                                            }}>
                                                        <input
                                                            type="text"
                                                            placeholder="New name"
                                                            value={newName}
                                                            onChange={(e) => setNewName(e.target.value)}/>
                                                        <button type="submit">Set Name</button>
                                                    </form>
                                                </div>
                                            ) : 
                                            player === 'playerB' && playerData.playerB.ready === true ? (
                                                <div className="readybox">
                                                    <h3>{playerData.playerB.uid}</h3>
                                                    <div>
                                                        {
                                                            playerData.playerA.ready === false ? (
                                                                <p>Waiting for opponent to ready up</p>
                                                            ) : (
                                                                <p>Ready</p>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            ) : 
                                            player === 'playerA' && playerData.playerB.present === false ? (
                                                <div className="invite-playerB">
                                                    <h3>Invite a friend!</h3>
                                                    <button onClick={copyToClipBoard}>
                                                        {
                                                            linkCopied === false ? "Copy invite link" : "Link Copied"
                                                        }
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="readybox">
                                                    <h3>{playerData.playerB.uid}</h3>
                                                    <div>
                                                        {
                                                            playerData.playerB.ready === false ? (
                                                                <p>Waiting for opponent to ready up</p>
                                                            ) : (
                                                                <p>Ready</p>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </section>
                                    </>
                                ) : (
                                    <>
                                    <div className="guesses">
                                        <h2>Guesses showing here</h2>
                                    </div>
                                    </>
                                )
                            }
                        </div>
                    </>
                ) : (
                    <>
                        <div className="playerbox-playerA">
                            <div className="playerbox-wrapper">
                                <div className="hp-bar-wrapper">
                                    <div className="hp-bar"
                                        style={{
                                            width: `${hpBar.playerA}%`,
                                            backgroundColor: hpBar.playerA <= 100 && hpBar.playerA >= 50 ? 'green' :
                                                            hpBar.playerA < 50 && hpBar.playerA >= 25 ? 'yellow' :
                                                            'red',
                                        }}>
                                        <span className="hp">{playerData.playerA.hp}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="playerbox-playerB">
                            <div className="playerbox-wrapper">
                                <div className="hp-bar-wrapper">
                                    <div className="hp-bar"
                                        style={{
                                            width: `${hpBar.playerB}%`,
                                            backgroundColor: hpBar.playerB <= 100 && hpBar.playerB >= 50 ? 'green' :
                                                            hpBar.playerB < 50 && hpBar.playerB >= 25 ? 'yellow' :
                                                            'red',
                                        }}>
                                        <span className="hp">{playerData.playerB.hp}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default PlayerBoxes