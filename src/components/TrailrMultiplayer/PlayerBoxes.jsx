// Player Boxes (guesses history, player name display, and player HP bars)
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */

// Firebase Imports
import { doc, addDoc, setDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";

// React Imports
import { useEffect } from 'react';
import { useState } from 'react';

function PlayerBoxes({
                    playerData, setPlayerData,
                    hpBar, setHpBar,
                    }){

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
        </>
    )
}

export default PlayerBoxes