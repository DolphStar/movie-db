import tmdblong from "../icons/tmdblong.svg";
import linkedin from "../icons/linkedin.svg";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-wrapper">
        <section className="about-section">
          <h2 className="section-title">About MovieNight</h2>
          <p className="section-content">
          Think you know cinema? Buckle up. MovieNight is the ultimate rabbit hole for film junkies and casual streamers alike. It's not just a database—it's your backstage pass to the world's cinematic treasury, from ageless classics to the newest blockbusters. With our killer interface and dynamite features, discovering your next binge-watch or cult favorite is just a click away. So ditch the popcorn. You won't have time to eat it.
          </p>
        </section>
        <section className="team-section">
          <h2 className="section-title">Unveil the Squad</h2>
          <p className="section-content">
          Straight outta BCIT and fueled by Vancouver's cutting-edge tech scene, we're the renegades behind MovieNight. We're not just coders; we're film aficionados on a quest to redefine your cinematic journey. Our platform isn't just user-friendly—it's a constantly evolving masterpiece engineered to quench your movie-hunting thirst. Get ready for a next-level experience.
          </p>
          <ul className="team-list">
            <li className="team-member"><a href="https://linkedin.com/"><img className="linkedin-icon" src={linkedin} alt="linkedin-logo" />Nick Birkus</a></li>
            <li className="team-member"><a href="https://linkedin.com/"><img className="linkedin-icon" src={linkedin} alt="linkedin-logo" />Samir Afilal</a></li>
            <li className="team-member"><a href="https://linkedin.com/"><img className="linkedin-icon" src={linkedin} alt="linkedin-logo" />Jadie Lin</a></li>
          </ul>
        </section>
        <section className="api-section">
          <h2 className="section-title">API Disclaimer</h2>
          <p className="section-content">
          This product uses the TMDb API but is not endorsed or certified by TMDb. All movie data and images are credited to their respective owners and are used in compliance with the TMDb API terms of service.
          </p>
          <img className="tmdb-icon" src={tmdblong} alt="tmbd-logo" />
        </section>
      </div>
    </div>
  );
};

export default About;

