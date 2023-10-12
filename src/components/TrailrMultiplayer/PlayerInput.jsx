/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { SEARCH_START, apiKey } from '../../globals/globalVariables';

function PlayerInput({
                    offscreenFrame, setOffscreenFrame,
                    input, setInput,
                    searchData, setSearchData,
                    }){
  
  async function handleInputChange(event){
    setInput((prevInput) => ({
      ...prevInput,
      title: event.target.value
    }));
    const urlSafeInput = encodeURIComponent(event.target.value);
    const searchEndpoint = `${SEARCH_START}&query=${urlSafeInput}&api_key=${apiKey}`

    const res = await fetch(searchEndpoint);
    if(res.ok){
      const searchList = await res.json();

      // Filter out the duplicate movie titles (movie with the highest popularity stays)
      const filteredSearchList = searchList.results.reduce((accumulator, currentMovie) => {
        
        const existingMovieIndex = accumulator.findIndex((movie) => movie.title === currentMovie.title);
        
        // If a movie with the same title exists
        if (existingMovieIndex !== -1) {
          // Replace it with the current movie if the current movie's popularity is higher
          if (currentMovie.popularity > accumulator[existingMovieIndex].popularity) {
            accumulator[existingMovieIndex] = currentMovie;
          }
        } else {
          // If no movie with the same title exists, add the current movie to the accumulator
          accumulator.push(currentMovie);
        }
      
        return accumulator;
      }, []);
      setSearchData(filteredSearchList);
    }else{
      console.log("Search Fetch Failed");
    }
  }
  
  function handleSelection(id, title){
    setInput((prevInput) => ({
      ...prevInput,
      title: title,
      id: id,
    }));
  }

  async function handleSubmit(){
    console.log("Send the answer to firebase");
  }

  return (
    <>
      <div className='trailr-input'>
        <input 
          type="text"
          value={input.title}
          onChange={handleInputChange}
          placeholder='What movie is this?'
        />
        <button onClick={handleSubmit}>Submit</button>
        {/* <div className='suggestions'>
          {searchData.map((movie)=> (
            <div 
              key={movie.id} 
              className='single-suggest' 
              onClick={()=>handleSelection(movie.id, movie.title)}>
                {movie.title}
            </div>
          ))}
        </div> */}
      </div>
    </>
  )
}

export default PlayerInput;