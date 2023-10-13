import { useState, useEffect, useRef } from "react";
// Trailr Components
import Frames from "../components/TrailrSolo/Frames";
import PlayerInput from "../components/TrailrSolo/PlayerInput";
import CreateRoom from "../components/TrailrMultiplayer/CreateRoom";
import Lobby from "../components/TrailrGlobal/MainMenu";

// React Router imports
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

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
      {difficulty === '' ? (
        <>
          <Lobby difficulty={difficulty} setDifficulty={setDifficulty}
                  gameMode={gameMode} setGameMode={setGameMode}/>
        </>
      ) : gameMode === 'solo' ? (
        <>
          <div className="banner">
            {answer ? (
              <h2>{movieData[offscreenFrame === 0 ? 1 : 0].title} is correct!</h2>
            ) : (
              <h2>What Movie is this?</h2>
            )}
          </div>
          <Frames movieData={movieData} setMovieData={setMovieData}
                  videoData={videoData} setVideoData={setVideoData}
                  offscreenFrame={offscreenFrame} setOffscreenFrame={setOffscreenFrame}
                  answer={answer} setAnswer={setAnswer}
                  game={game} setGame={setGame}
                  countdown={countdown} setCountdown={setCountdown}
                  isCounting={isCounting} setIsCounting={setIsCounting}
                  enableStart={enableStart} setEnableStart={setEnableStart}
                  videoState={videoState} setVideoState={setVideoState}
                  roomID={roomID} setRoomID={setRoomID}/>

          <PlayerInput  movieData={movieData} setMovieData={setMovieData}
                        videoData={videoData} setVideoData={setVideoData}
                        offscreenFrame={offscreenFrame} setOffscreenFrame={setOffscreenFrame}
                        input={input} setInput={setInput}
                        searchData={searchData} setSearchData={setSearchData}
                        answer={answer} setAnswer={setAnswer}/>
        </>
      ) : gameMode === 'multiplayer' ? (
        <CreateRoom roomID={roomID} setRoomID={roomID} />
      ) : (
        <div>404 Error: Please return to select a game mode and difficulty</div>
      )}


      {/* DEV PANELS */}
      <div className="dev-panel-firebase">
        <h3>Firebase dev panel</h3>
        <p>Current Room: {roomID}</p>
      </div>

      <div className="dev-panel-frames">
        <h3>Frames dev panel</h3>
        <p>Current offscreenFrame: {offscreenFrame}</p>
        <p>On Screen Movie: {movieData[offscreenFrame === 0 ? 1 : 0].title}</p>
        <p>{isCounting ? 'true' : 'false'}</p>
        <p>FrameA state: {videoState.frameA}</p>
        <p>FrameB state: {videoState.frameB}</p>
      </div>

      <div className='dev-panel-input'>
        <h3>Input dev panel</h3>
        <p>Current Input: {input.title}</p>
        <p>Current ID: {input.id}</p>
        <p>Answer: {answer}</p>
      </div>
    </>
  )
}

export default Trailr;