import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

//Import
import { apiKey } from "../globals/globalVariables";
import CarouselSlide from "./CarouselSlide";
import Rating from "./Rating";
import { Link } from "react-router-dom";

const Carousel = () => {
  // API stuff
  //Trending API endpoint
  const endPointTrending = `https://api.themoviedb.org/3/trending/movie/week?language=en-US&api_key=${apiKey}`;
  const movieGenre = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;
  const endPointNowPlaying = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;
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

  const genresArr = detail?.genres;

  return (
    <>
      <section className="hero-section-carousel">
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {/* optional chaining because useEffect runs at the end, if no ? then won't find data at first then error  */}
          {data?.results?.map((trending) => (
            <SwiperSlide key={trending.id}>
              <CarouselSlide trending={trending} genresArr={genresArr} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section></section>

      <section className="carousel-2-swiper-slide">
        <h2>Trending Now</h2>
        <Swiper
          slidesPerView={2}
          spaceBetween={10}
          navigation={true}
          pagination={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            359: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            660: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            800: {
              slidesPerView: 4,
              spaceBetween: 15,
            },
            1000: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {dataNowPlaying?.results?.map((oneNowPlaying) => (
            <SwiperSlide key={oneNowPlaying?.id}>
              <Link to={`/movie/${oneNowPlaying?.id}`}>
                <article className="carousel-2-swiper-slide-content">
                  <img
                    src={`https://image.tmdb.org/t/p/w342${oneNowPlaying.poster_path}`}
                    alt={oneNowPlaying.title}
                  />
                  <Rating rate={oneNowPlaying.vote_average} />
                  <div className="carousel-2-swiper-slide-title">
                    <p>{oneNowPlaying.original_title}</p>
                  </div>
                </article>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
};


export default Carousel;
