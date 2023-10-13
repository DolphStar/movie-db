import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiKey, imgPath } from "../globals/globalVariables";
import { youtubePath } from "../globals/globalVariables";
import { Swiper, SwiperSlide } from "swiper/react";
import Rating from "../components/Rating";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import { Pagination } from "swiper/modules";
import "../styles/Acting.css";

function Single() {
  const { id } = useParams();
  const singleMovieDetails = `https://api.themoviedb.org/3/movie/${id}?append_to_response=videos%2Ccredits&language=en-US&api_key=${apiKey}`;
  const [singleMovieData, setSingleMovieData] = useState(null);
  // const [trailerData, setTrailerData] = useState(null);
  const allVideos = singleMovieData?.videos?.results;
  //use find instead of filter (find returns one. filter returns all that match)

  const trailerPath = allVideos?.find(
    (movie) =>
      //toLowerCase is safer in case data is not clean
      movie?.type?.toLowerCase() === "trailer" &&
      movie?.official &&
      movie?.site?.toLowerCase() === "youtube"
  );

  const castDetails = singleMovieData?.credits?.cast;
  const actingCast = castDetails?.filter(
    (castType) => castType?.known_for_department?.toLowerCase() === "acting"
  );

  const trailer = `${youtubePath}${trailerPath?.key}`;

  console.log(trailer);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(singleMovieDetails);
      // const response_trailer = await fetch(trailerData);
      const json = await response.json();
      // const json_trailer = await response_trailer.json();
      setSingleMovieData(json);
      // setTrailerData(json_trailer);
    };
    fetchData();
  }, [singleMovieDetails]);

  const singleMovieGenres = singleMovieData?.genres;
  const movieMinuteLength = singleMovieData?.runtime;

  //needed: 1. video link (filter) 2. poster ok 3. actors(swiper)
  //content: 1. date 2. genres 3.film length 4. director 5.writer

  //Changing time format
  function MinutestoHours(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return { hours: hours, minutes: minutes };
  }

  return (
    <div className="single-movie-content-wrapper">
      <section>
        <article id="single-movie-info">
          <iframe
            height="320"
            width="240"
            src={trailer}
            allowFullScreen
          ></iframe>

          <h2>{singleMovieData?.title}</h2>
          <div className="single-movie-rating-genre-wrapper">
            <Rating rate={singleMovieData?.vote_average} />

            <div id="single-movie-genres">
              {singleMovieGenres?.map((singleMovieGenre) => (
                <p key={singleMovieGenre.id}>{singleMovieGenre.name}</p>
              ))}
            </div>
          </div>
          <p>Release Date: {singleMovieData?.release_date}</p>
          <time>
            Film length:
            {/* time tag, date */}
            {` ${MinutestoHours(movieMinuteLength)?.hours} hour${
              MinutestoHours(movieMinuteLength)?.hours > 1 ? "s" : ""
            } `}
            {`${MinutestoHours(movieMinuteLength)?.minutes} minute${
              MinutestoHours(movieMinuteLength)?.minutes > 1 ? "s" : ""
            }`}
          </time>
          <h3>Overview</h3>
          <p>{singleMovieData?.overview}</p>

          <img
            id="acting-profile-picture"
            src={`https://image.tmdb.org/t/p/w342${singleMovieData?.poster_path}`}
            alt={singleMovieData?.title}
          />

          <h3>Cast</h3>
        </article>
      </section>

      <section>
        <Swiper
          slidesPerView={2}
          spaceBetween={10}
          navigation={true}
          pagination={true}
          breakpoints={{
            400: {
              slidesPerView: 3,
              spaceBetween: 10,
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
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {actingCast?.map((actCast) => (
            <SwiperSlide key={actCast?.cast_id}>
              <article className="acting-bio">
                <img
                  src={`https://image.tmdb.org/t/p/w342${actCast.profile_path}`}
                  alt={actCast.name}
                />
                <div>
                  <span key={actCast?.id}>{actCast?.name}</span>
                  <p>{actCast?.character}</p>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
}

export default Single;
