/* eslint-disable react/prop-types */
// React Router imports
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Lobby({
                difficulty, setDifficulty,
                gameMode, setGameMode,
                }){

  // Params
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  function handleGameModeSelect(mode){

    // Update query params and game mode state
    queryParams.set("mode", mode);
    setGameMode(mode);

    // Create new search string and navigate to it
    const newSearch = `${queryParams.toString()}`;
    navigate({ search: newSearch });

  }

  function handleDifficultySelect(dif){
    
    // Update query params and dif state
    queryParams.set("dif", dif);
    setDifficulty(dif);

    // Create new search string and navigate to it
    const newSearch = `${queryParams.toString()}`;
    navigate({ search: newSearch });
  }
  
  return (
    <>
      <div className="lobby">
        <h2>Welcome to Trailr</h2>
        {gameMode === '' ? (
          <>
            <h2>Choose Game Mode</h2>
            <ul>
              <li>
                <button onClick={()=>handleGameModeSelect('solo')}>Solo</button>
              </li>
              <li>
                <button onClick={() => handleGameModeSelect('multiplayer')}>Multiplayer</button>
              </li>
            </ul>
          </>
        ) : gameMode !== '' && difficulty === '' ? (
          <>
            <h2>Choose the difficulty</h2>
            <div>
              <button onClick={()=>handleDifficultySelect('easy')}>Easy</button>
              <button onClick={()=>handleDifficultySelect('medium')}>Medium</button>
              <button onClick={()=>handleDifficultySelect('hard')}>Hard</button>
            </div>
          </>
        ) : gameMode === 'solo' ? (
          <>
            <h2>Solo</h2>
            <p>This is the Solo game screen</p>
          </>
        ) : gameMode === 'multiplayer' ? (
          <>
            <h2>Multiplayer</h2>
            <p>This is the multiplayer game screen</p>
          </>
        ) : null}
      </div>
    </>
  );
}
  
  export default Lobby;