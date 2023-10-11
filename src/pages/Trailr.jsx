/* eslint-disable react-hooks/exhaustive-deps */
// GRANDPARENT COMPONENT OF ALL TRAILR COMPONENTS
/* eslint-disable react/prop-types */
// React Imports
import { useState, useEffect, useRef } from "react";

// React Router imports
import { useSearchParams } from "react-router-dom";

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

  // Single source of truth for the selected game mode
  const [gameMode, setGameMode] = useState('');

  // Single source of truth for the roomID
  const [roomID, setRoomID] = useState('');

  // Single source of truth for the player
  const [player, setPlayer] = useState('');

  // Single source of truth for the params state
  const [params, setParams] = useState({});

  // URL Params Ref
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      {
        gameMode === '' ? (
        <MainMenu           gameMode={gameMode} setGameMode={setGameMode}
                            searchParams={searchParams} setSearchParams={setSearchParams}
                            params={params} setParams={setParams}
                            player={player} setPlayer={setPlayer}
                            roomID={roomID} setRoomID={setRoomID}/>
      ) 
      : gameMode === 'solo' ? (
        <TrailrSolo         movieData={movieData} setMovieData={setMovieData}
                            videoData={videoData} setVideoData={setVideoData}
                            searchData={searchData} setSearchData={setSearchData}
                            offscreenFrame={offscreenFrame} setOffscreenFrame={setOffscreenFrame}
                            answer={answer} setAnswer={setAnswer}
                            game={game} setGame={setGame}
                            countDown={countdown} setCountdown={setCountdown}
                            isCounting={isCounting} setIsCounting={setIsCounting}
                            enableStart={enableStart} setEnableStart={setEnableStart}
                            videoState={videoState} setVideoState={setVideoState}
                            input={input} setInput={setInput}/>
      ) 
      : gameMode === 'multiplayer' ? (
        <TrailrMultiplayer  offscreenFrame={offscreenFrame} setOffscreenFrame={setOffscreenFrame}
                            answer={answer} setAnswer={setAnswer}
                            videoState={videoState} setVideoState={setVideoState}
                            searchData={searchData} setSearchData={setSearchData}
                            roomID={roomID} setRoomID={setRoomID}
                            player={player} setPlayer={setPlayer}
                            params={params} setParams={setParams}
                            gameMode={gameMode} setGameMode={setGameMode}
                            searchParams={searchParams} setSearchParams={setSearchParams}/>
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