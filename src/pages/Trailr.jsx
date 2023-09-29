import { useState, useEffect, useRef } from "react";
// Trailr Components
import Frames from "../components/Trailr/frames";
import PlayerInput from "../components/Trailr/playerInput";

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
    ], // FrameA
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

  return (
    <>

      <div className="banner">
        {answer ? (
          <h2>{movieData[offscreenFrame === 0 ? 1 : 0].title} is correct!</h2>
        ) : (
          <h2>What Movie is this?</h2>
        )}
      </div>

      <Frames       movieData={movieData} setMovieData={setMovieData}
                    videoData={videoData} setVideoData={setVideoData}
                    offscreenFrame={offscreenFrame} setOffscreenFrame={setOffscreenFrame}
                    answer={answer} setAnswer={setAnswer}
                    game={game} setGame={setGame}
                    countdown={countdown} setCountdown={setCountdown}
                    isCounting={isCounting} setIsCounting={setIsCounting}
                    enableStart={enableStart} setEnableStart={setEnableStart}
                    videoState={videoState} setVideoState={setVideoState}/>

      <PlayerInput  movieData={movieData} setMovieData={setMovieData}
                    videoData={videoData} setVideoData={setVideoData}
                    offscreenFrame={offscreenFrame} setOffscreenFrame={setOffscreenFrame}
                    input={input} setInput={setInput}
                    searchData={searchData} setSearchData={setSearchData}
                    answer={answer} setAnswer={setAnswer}/>
    </>
  )
}

export default Trailr;