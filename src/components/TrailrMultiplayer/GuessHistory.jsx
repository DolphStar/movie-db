/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */

// React Imports
import { useEffect } from "react";
import { useState } from "react"; 

function GuessHistory({
                        playerData, setPlayerData,
                        player, setPlayer,
                        enemy
                        }){

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Track the window size to show the correct guess history
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

    return (
        <>
            {
                windowWidth < 1100 ? (
                    <>
                        <div className="guess-history-combined">

                        </div>
                    </>
                ) : (
                    <>
                        <div className="guess-history-playerA">

                        </div>

                        <div className="guess-history-playerB">

                        </div>
                    </>
                ) 
            }
        </>
    )
}

export default GuessHistory