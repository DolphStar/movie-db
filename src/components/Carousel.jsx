import React, { useRef, useState, useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

//Import CSS styles
import '../styles/Carousel.css';

// import required modules
import { Navigation } from 'swiper/modules';
import { Pagination } from 'swiper/modules';

//Import 
import {apiKey} from "../globals/globalVariables";
import CarouselSlide from './CarouselSlide';

const Carousel=()=> {

    // API stuff
    //Trending API endpoint
    const endPointTrending = `https://api.themoviedb.org/3/trending/movie/week?language=en-US&api_key=${apiKey}`;
    const movieGenre = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
    const endPointNowPlaying = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`
    // Create a state variable to hold the tasks
    const [data, setData] = useState(null);
    const [detail, setDetail] = useState(null);
    const [dataNowPlaying, setDataNowPlaying] = useState(null);
    // by using null nothing is inside, need to make sure data has something inside
    //use [] is defined, whether data has anything no need to check

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(endPointTrending);
      const response_details = await fetch(movieGenre);
      const response_now_playing = await fetch(endPointNowPlaying);

      const json = await response.json();
      const jsonDetails = await response_details.json();
      const jsonNowPlaying = await response_now_playing.json();

      setData(json);
      setDetail(jsonDetails);
      setDataNowPlaying(jsonNowPlaying);
    };
    fetchData();
  }, [endPointTrending, movieGenre, endPointNowPlaying]);
  

  const genresArr = detail?.genres
  console.log(genresArr)

//   let movieId = movieIdDetail.filter(movieId => movieId.genres.id)
//   console.log(movieId)

  return (
    <>
    <section>
          <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
              {/* optional chaining because useEffect runs at the end, if no ? then won't find data at first then error */}
              {data?.results?.map((trending) => (
                  <SwiperSlide key={trending.id}>
                      <CarouselSlide trending={trending} genresArr={genresArr} />
                  </SwiperSlide>
              ))}
          </Swiper>
    </section>

    <section>
        
    </section>
    
    <section className="carousel-2-swiper-slide">
        <Swiper
            slidesPerView={1}
            spaceBetween={10}
            pagination={{
                clickable: true,
            }}
            breakpoints={{
                400: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                660: {
                    slidesPerView: 3,
                    spaceBetween: 15,
                },
                1000: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                }
            }}
            modules={[Pagination]}
            className="mySwiper"
        >
            {dataNowPlaying?.results?.map((oneNowPlaying)=>(
            <SwiperSlide key={oneNowPlaying.id}>
                <article>
                    <img src={`https://image.tmdb.org/t/p/w342${oneNowPlaying.poster_path}`} alt={oneNowPlaying.title} />
                </article>
            </SwiperSlide>
            )
            )}
        </Swiper>
    </section></>
        );

        }


//   return (
//     <>
//     {data.map(trending =>
//         <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
//             <SwiperSlide>
//                 <img></img>
//             </SwiperSlide>
//         )
//         </Swiper>}
//     </>
//     ): (
//         <h1>{console.log("Hello")}</h1>
//         )};
//         </>
//     );
// };

export default Carousel;