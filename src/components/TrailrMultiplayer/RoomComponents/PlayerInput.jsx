/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

// React Imports
import { useState, useEffect } from 'react'

// Global Imports
import { SEARCH_START, apiKey } from '../../../globals/globalVariables';
import { randomPlaceholders } from '../../../globals/globalVariables';
import { firebaseConfig } from "../../../globals/globalVariables";

// Firebase Imports
import { doc, addDoc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";

function PlayerInput({
                    offscreenFrame, setOffscreenFrame,
                    playerData, setPlayerData,
                    searchData, setSearchData,
                    input, setInput,
                    endRound, setEndRound,
                    guessHistory, setGuessHistory,
                    correctGuesses, setCorrectGuesses,
                    selfRef, enemyRef, roomRef, 
                    enemy,
                    }){
  
  async function handleInputChange(event){

    // Update the input field on change
    setInput((prevInput) => ({
      ...prevInput,
      title: event.target.value
    }));

    // Make a search api call on change
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
  
  // Set the input when a suggestion is clicked on
  function handleSelection(id, title, poster){
    setInput((prevInput) => ({
      ...prevInput,
      title: title,
      poster: poster,
      id: id,
    }));
  }

  //  
  async function handleSubmit(){
    await updateDoc(selfRef, {
      guess: input,
    });
  }

  useEffect(()=>{
    console.log("Input submitted")
  }, [playerData.playerA.guess, playerData.playerB.guess])

  return (
    <>
      <div className='trailr-input'>
        <input 
          type="text"
          value={input.title}
          onChange={handleInputChange}
          placeholder={randomPlaceholders[Math.floor(Math.random() * randomPlaceholders.length)]}
        />
        <button onClick={handleSubmit} id='input-submit'>
          Submit
        </button>
        <div className='suggestions-box'>
          {searchData.map((movie)=> (
            <div
              key={movie.id} 
              className='single-suggest' 
              onClick={()=>handleSelection(movie.id, movie.title, movie.poster_path)}>
                {movie.title}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default PlayerInput;