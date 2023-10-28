/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect } from 'react';
function MainMenu({
                difficulty, setDifficulty,
                gameMode, setGameMode,
                searchParams, setSearchParams,
                params, setParams,
                }){

  // Sets the selected mode as the state and add it as a param in the URL
  function handleGameModeSelect(mode){
    setSearchParams({ mode: mode });
    setGameMode(mode);
  }

  // When the page loads check the params and update the state if there is any
  useEffect(()=>{
    setParams(Object.fromEntries(searchParams.entries()));
  }, []);

  // Every time the params are updated, check to see if a player, roomID, or gameMode is present
  // If so, update the states accordingly
  useEffect(()=>{
    if(params.mode !== undefined){
      setGameMode(params.mode);
    }
  }, [params])

  return (
    <>
      <div className="game-modes">
        <h2>Welcome to Trailr</h2>
          <p>Choose Game Mode</p>
          <ul>
            <li>
              <button onClick={()=>handleGameModeSelect('solo')}>Solo</button>
            </li>
            <li>
              <button onClick={() => handleGameModeSelect('multiplayer')}>Multiplayer</button>
            </li>
          </ul>
      </div>
    </>
  );
}
  
  export default MainMenu;