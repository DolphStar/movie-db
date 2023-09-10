import { useEffect, useState } from "react";
import { appTitle } from "../globals/globalVariables";

function PageHome() {

      // just testing
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZGU1ZWY2NDc4Y2I3YTFiNWI2NjY0ODhkOTY0ZDI2NyIsInN1YiI6IjY0ZmUwOGJkZTBjYTdmMDEwZGU4ZmY0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sz4ddBjyp5Fkh5Yk8mXGxrr2MU_4ZdJKnWNrrpVxF2o'
        }
      };
    
    useEffect( ()=>{
        const fetchMovieList = async () => {
          const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options);
          let data = await res.json();
    
          console.log("List", data);
        }
        fetchMovieList();
    
      },[])

    useEffect(() => {
        document.title = `${appTitle} - Home`;
      }, []);

      return (
        <main>
            <h2>main</h2>;
        </main>
      )
}


export default PageHome;