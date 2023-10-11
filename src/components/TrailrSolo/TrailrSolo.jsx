// PARENT COMPONENT OF THE TRAILR SOLO COMPONENTS
/* eslint-disable react/prop-types */

// TrailrSolo Component Imports
import PlayerInput from "./PlayerInput";
import Frames from "./Frames";


function TrailrSolo({
                    movieData, setMovieData,
                    videoData, setVideoData,
                    searchData, setSearchData,
                    offscreenFrame, setOffscreenFrame,
                    answer, setAnswer,
                    game, setGame,
                    countdown, setCountdown,
                    isCounting, setIsCounting,
                    enableStart, setEnableStart,
                    videoState, setVideoState,
                    input, setInput,
                    }){
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
                  answer={answer} setAnswer={setAnswer}
                  input={input} setInput={setInput}
                  searchData={searchData} setSearchData={setSearchData}/>
    </>
  )
}

export default TrailrSolo;