// GRANDPARENT COMPONENT OF ALL TRAILR COMPONENTS
/* eslint-disable react/prop-types */
// React Imports
import { useState, useEffect, useRef } from "react";

// React Router imports
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

// Trailr Global Components
import MainMenu from "../components/TrailrGlobal/MainMenu";

// Trailr Multiplayer Import
import TrailrMultiplayer from "../components/TrailrMultiplayer/TrailrMultiplayer"
 
// Trailr Solo Import
import TrailrSolo from "../components/TrailrSolo/TrailrSolo";

function Trailr() {

  // Single source of truth for the movie data for each Frame
  // 0 = FrameA
  // 1 = FrameB
  const [movieData, setMovieData] = useState([
    {}, // FrameA
    {}, // FrameB
  ]);
  
  // Single source of truth for the video data
  const [videoData, setVideoData] = useState([
    [// FrameA
      [], // Trailer Data
      '', // TrailerID
    ],
    [// FrameB
      [], // Trailer Data
      '', // TrailerID
    ],
  ]);

  // Single source of truth for the search data
  const [searchData, setSearchData] = useState([]);

  // Single source of truth for the round
  const [round, setRound] = useState(0);

  // Single source of truth for the score
  const [score, setScore] = useState(0);

  // Single source of truth for the indice of which frame is currently offscreen
  // 0 = FrameA
  // 1 = FrameB
  const [offscreenFrame, setOffscreenFrame] = useState(1);

  // Single source of truth for the player input
  const [input, setInput] = useState({
    title: '',
    id: null
  });

  // Single source of truth for the answer submit
  const [answer, setAnswer] = useState(false);

  // Single source of truth for the game state
  const [game, setGame] = useState(false);

  // Single source of truth for the pre-game countdown
  const [countdown, setCountdown] = useState(4);

  // Single source of truth for the countdown check
  const [isCounting, setIsCounting] = useState(false);

  // Single source of truth to allow the game to start
  const [enableStart, setEnableStart] = useState(true);

  // Single source of truth for the video state
  const [videoState, setVideoState] = useState({
    frameA: null,
    frameB: null,
  });

  // Single source of truth for the roomID
  const [roomID, setRoomID] = useState('');

  // Single source of truth for the game difficulty
  const [difficulty, setDifficulty] = useState('');

  // Single source of truth for the selected game mode
  const [gameMode, setGameMode] = useState('');

  // Search Params testing
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      {
        gameMode === '' ? (
        <MainMenu           />
      ) 
      : gameMode === 'solo' ? (
        <TrailrSolo         movieData={movieData} setMovieData={setMovieData}
                            videoData={videoData} setVideoData={setVideoData}
                            searchData={searchData} setSearchData={setSearchData}
                            offscreenFrame={offscreenFrame} setOffscreenFrame={setOffscreenFrame}
                            answer={answer} setAnswer={setAnswer}
                            game={game} setGame={setGame}
                            countDown={countdown} setCoundown={setCountdown}
                            isCounting={isCounting} setIsCounting={setIsCounting}
                            enableStart={enableStart} setEnableStart={setEnableStart}
                            videoState={videoState} setVideoState={setVideoState}
                            input={input} setInput={setInput}/>
      ) 
      : gameMode === 'multliplayer' ? (
        <TrailrMultiplayer  />
      )
      : (
        <div>
          <h2>How did you even get to this page?</h2>
          <a href="#">Go back to the main menu and choose a game mode...</a>
        </div>
      )}
    </>
  )
}

export default Trailr;