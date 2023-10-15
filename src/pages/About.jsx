import tmdblong from "../icons/tmdblong.svg";

const About = () => {
  return (
    <div>
      <div className = "about-wrapper">
        <section>
          <h2>About MoveNight</h2>
          <p>MovieNight is your go-to platform for all things cinema. Whether you're a casual moviegoer or a die-hard cinephile, we've got you covered. Our website offers a comprehensive database of movies, from the classics to the latest releases. Our user-friendly interface and rich features make it easier than ever to discover new movies and revisit old favorites. So grab some popcorn and dive into the world of cinema with MovieNight!</p>
        </section>
        <section>
          <h2>API Disclaimer</h2>
          <p>This product uses the TMDb API but is not endorsed or certified by TMDb. All movie data and images are credited to their respective owners and are used in compliance with the TMDb API terms of service.</p>
          <img
                    className="tmdb-icon"
                    src={tmdblong}
                    alt="tmbd-logo"
                  />
        </section>
        <section>
          <h2>Meet the Team</h2>
          <p>We are a team of skilled front-end developers based in Vancouver, all trained at BCIT. United by our passion for cinema and technology, we're dedicated to providing you with the best experience on MovieNight. Our collective expertise ensures that the platform is user-friendly, reliable, and constantly evolving to meet your movie-discovery needs.</p>
          <ul>
            <li>Nick Birkus</li>
            <li>Samir Afilal</li>
            <li>Jadie Lin</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About;
