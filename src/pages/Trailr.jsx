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
  const [searchData, setSearchData] = useState([])

  // Single source of truth for the round
  const [round, setRound] = useState(0);

  // Single source of truth for the indice of which frame is currently offscreen
  // 0 = FrameA
  // 1 = FrameB
  const [offscreenFrame, setOffscreenFrame] = useState(1);

  // Single source of truth for the player input
  const [input, setInput] = useState({
    title: '',
    id: ''
  });

  return (
    <>
      <Frames       movieData={movieData} setMovieData={setMovieData}
                    videoData={videoData} setVideoData={setVideoData}
                    offscreenFrame={offscreenFrame} setOffscreenFrame={setOffscreenFrame}/>

      <PlayerInput  movieData={movieData} setMovieData={setMovieData}
                    videoData={videoData} setVideoData={setVideoData}
                    offscreenFrame={offscreenFrame} setOffscreenFrame={setOffscreenFrame}
                    input={input} setInput={setInput}
                    searchData={searchData} setSearchData={setSearchData}/>
    </>
  )
}

export default Trailr;