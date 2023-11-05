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
            hp: '5000',
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
                        {/* PlayerA */}
                        <div className="playerA">
                            <div className="statbox-wrapper">
                                {/* PlayerA Name */}
                                <p>{playerData.playerA.uid}</p>
                                {/* PlayerA HP Bar */}
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

                        {/* PlayerB */}
                        <div className="playerB">
                            <div className="statbox-wrapper">
                                {/* PlayerB Name */}
                                <p>{playerData.playerB.uid}</p>
                                {/* PlayerB HP Bar */}
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

                        {/* 
                        Pregame screen and guess history 
                        Position is controlled inline while it is a pregame screen
                        */}
                        <div 
                            className="guess-history-combined"
                            style={playerData.playerA.ready === false && playerData.playerB.ready === false ? 
                                {
                                    top: '20%', 
                                    zIndex: '999',
                                    background: 'black',
                                } : null }>
                            {
                                // Show the pregame screen until both players are ready
                                playerData.playerA.ready === false || playerData.playerB.ready === false ? (
                                    <>
                                    <section className='playerA-pregame'>
                                        {
                                            // PlayerA POV - PlayerA not ready - PlayerA input shown
                                            player === 'playerA' && playerData.playerA.ready === false ? (
                                                <div className="playerA-pregame-name-input">
                                                    <h3>Choose your name</h3>
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
                                            // PlayerA POV - PlayerA ready - PlayerA name shown
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
                                            // PlayerB POV - PlayerA not ready - Waiting for playerA shown
                                            player === 'playerB' && playerData.playerA.ready === false ? (
                                                <div className="enemy-set-name">
                                                    <p>Waiting for opponent to set name</p>
                                                </div>
                                            ) : (
                                            // PlayerB POV - PlayerA ready - PlayerA name shown
                                                <div className="readybox">
                                                    <h3>{playerData.playerA.uid}</h3>
                                                    <p>Ready</p>
                                                </div>
                                            )
                                        }
                                    </section>
                                    <section className='playerB-pregame'>
                                        {   
                                            // PlayerB POV - PlayerB not ready - PlayerB input form shown
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
                                            // PlayerB POV - PlayerB ready - PlayerB name shown 
                                            player === 'playerB' && playerData.playerB.ready === true ? (
                                                <div className="readybox">
                                                    <h3>{playerData.playerB.uid}</h3>
                                                    <p>Ready</p>
                                                </div>
                                            ) : 
                                            // PlayerA POV - PlayerB not present - Invite a friend shown
                                            player === 'playerA' && playerData.playerB.present === false ? (
                                                <div className="invite-playerB">
                                                    <h3>Invite a friend!</h3>
                                                    <button onClick={copyToClipBoard}>
                                                        {
                                                            linkCopied === false ? "Copy invite link" : "Link Copied"
                                                        }
                                                    </button>
                                                </div>
                                            ) : 
                                            // PlayerA POV - PlayerB not ready - Waiting for playerB to ready up
                                            player === 'playerA' && playerData.playerB.ready === false ? (
                                                <div className="readybox">
                                                    <h3>Waiting for your opponent to ready up</h3>
                                                </div>
                                            ) : (
                                            // PlayerA POV - PlayerB ready - PlayerB name shown
                                                <div className="readybox">
                                                    <h3>{playerData.playerB.uid}</h3>
                                                    <p>Ready</p>
                                                </div>
                                            )
                                        }
                                    </section>
                                    </>
                                ) : (
                                    <>
                                    <div className="guesses">
                                        <h3>Player guess history</h3>
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