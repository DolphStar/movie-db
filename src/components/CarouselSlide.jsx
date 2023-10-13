import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
//Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

//Import CSS styles
import "../styles/Carousel.css";

// import required modules
import { Navigation } from "swiper/modules";
import { apiKey } from "../globals/globalVariables";
import { Link } from "react-router-dom";

const CarouselSlide = ({ trending, genresArr }) => {
  // need to filter which genres id according to the list of genres
  const commonGenres = genresArr.filter((genre) =>
    trending.genre_ids.includes(genre.id)
  );
  console.log(commonGenres);

  //movie tagline
  const movieTagline = `https://api.themoviedb.org/3/movie/${trending.id}?api_key=${apiKey}`;

  const [tagLine, setTagLine] = useState(null);

  useEffect(() => {
    const tagLineData = async () => {
      const response_tagline = await fetch(movieTagline);
      const jsonTagLine = await response_tagline.json();
      setTagLine(jsonTagLine);
    };
    tagLineData();
  }, [movieTagline]);

  console.log(tagLine);

  const tagLineText = tagLine?.tagline;

  const generateKey = (pre) => {
    return `${pre}_${new Date().getTime()}`;
  };

  return (
    <article className="carousel-content-wrapper">
      <div className="carousel-content-image-wrapper">
        <picture>
          <source
            srcset={`https://image.tmdb.org/t/p/original${trending.poster_path}`}
            alt={trending.title}
            media="(max-width: 600px)"
          />
          <img
            src={`https://image.tmdb.org/t/p/original${trending.backdrop_path}`}
            alt={trending.title}
          />
        </picture>
        <div className="gradient-overlay"></div>
      </div>
      <div className="carousel-content">
        <h2>{trending.title}</h2>
        <p>{trending.release_date}</p>
        <div className="carousel-content-details">
          {commonGenres?.map((oneGenre) => (
            <span key={oneGenre.id}>{oneGenre.name}</span>
          ))}
        </div>
        <p>{tagLineText}</p>
        <Link to={`/movie/${trending.id}`} className="carousel-info-button">
          More Info
        </Link>
      </div>
    </article>

    // <article className="carousel-content-wrapper">
    //   <div className="carousel-content-image-wrapper">
    //     <picture>
    //       <source
    //         srcset={`https://image.tmdb.org/t/p/original${trending.poster_path}`}
    //         alt={trending.title}
    //         media="(max-width: 600px)"
    //       />
    //       <img
    //         src={`https://image.tmdb.org/t/p/original${trending.backdrop_path}`}
    //         alt={trending.title}
    //       />
    //     </picture>
    //     <div className="gradient-overlay"></div>
    //   </div>
    //   <div key={generateKey(trending.id)} className="carousel-content">
    //     <h2>{trending.title}</h2>
    //     <div className="carousel-content-details-wrapper">
    //       <p>{trending.release_date}</p>
    //       <div className="carousel-content-details">
    //         {commonGenres?.map((oneGenre) => (
    //           <span key={oneGenre.id}>{oneGenre.name}</span>
    //         ))}
    //       </div>
    //       <p>{tagLineText}</p>
    //       {/* <li key={trending.id}> */}
    //       <Link to={`/movie/${trending.id}`} className="carousel-info-button">
    //         More Info
    //       </Link>
    //       {/* </li> */}
    //     </div>
    //   </div>
    // </article>
  );
};

export default CarouselSlide;
