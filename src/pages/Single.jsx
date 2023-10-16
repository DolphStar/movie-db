import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { apiKey, imgPath } from "../globals/globalVariables";
import { youtubePath } from "../globals/globalVariables";
import { Swiper, SwiperSlide } from "swiper/react";
import { handleFavorites } from "../utilities/favoritesFunctions";
import FavoritesContext from "../context/FavoritesContext";
import favoriteIcon from "../icons/favorite.svg";
import notfavoriteIcon from "../icons/notfavorite.svg";
import Rating from "../components/Rating";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import { Pagination } from "swiper/modules";


function Single() {
  const { id } = useParams();
  const singleMovieDetails = `https://api.themoviedb.org/3/movie/${id}?append_to_response=videos%2Ccredits&language=en-US&api_key=${apiKey}`;

  const [singleMovieData, setSingleMovieData] = useState(null);
  // const [trailerData, setTrailerData] = useState(null);
  const allVideos = singleMovieData?.videos?.results;
  //use find instead of filter (find returns one. filter returns all that match)

  const { favorites, setFavorites } = useContext(FavoritesContext);

    // Function to handle adding/removing from favorites
    const handleFavs = (movie) => {
      handleFavorites(movie, favorites, setFavorites);
    };
    // check if movie is already in favorites, to detirmine which icon use
    const isFavorite = (movie) => {
      return favorites.some((favorite) => favorite.id === movie.id);
    };

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

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(singleMovieDetails);
      const json = await response.json();
      setSingleMovieData(json);

    };
    fetchData();
  }, [singleMovieDetails]);

  const singleMovieGenres = singleMovieData?.genres;
  const movieMinuteLength = singleMovieData?.runtime;

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

          <button
                    className="favorite-button"
                    onClick={() => handleFavs(singleMovieData)}
                  >
          <img
            className="favorite-icon"
            src={
              singleMovieData && isFavorite(singleMovieData) 
                ? favoriteIcon 
                : notfavoriteIcon
            }
            alt="Favorite"
          />
          </button>

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
