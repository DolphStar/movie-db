// Normally api keys are kept secret, but for demo purposes I will leave this here.
export const apiKey = "9de5ef6478cb7a1b5b666488d964d267";

export const appTitle = "Movie Time";

export const youtubeApiKey = "AIzaSyBgitWTtZ1hFrkPFDWfvHfOOuTIdQ-fbxg";

export const imgPath = "https://image.tmdb.org/t/p/original";

export const MOVIE_START = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US";

export const VIDEO_START = "https://api.themoviedb.org/3/movie/";

export const SEARCH_START = "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&";

export const youtubePath = "https://www.youtube.com/embed/";



// Range of pages that trailr will choose from
export const moviePage = 10;

export const firebaseConfig = {
  apiKey: "AIzaSyCOrtwzJP4I2Xi7mfOBx1qiqSN9Q8MlraM",
  authDomain: "trailr-be84b.firebaseapp.com",
  projectId: "trailr-be84b",
  storageBucket: "trailr-be84b.appspot.com",
  messagingSenderId: "1096065471677",
  appId: "1:1096065471677:web:1cbf71f9839de157da13d4"
};

// Input phrases
export const randomPlaceholders = [
  'Maybe Spiderman?',
  'Is that Fifty Shades?',
  'Is that Matt Damon?',
  "Maybe it's a Marvel movie?",
  'Could it be Harry Potter?',
  'Is this a Star Wars film?',
  "Perhaps it's Jurassic Park?",
  "Maybe it's a James Bond movie?",
  'Is this a Disney classic?',
  'Could it be The Matrix?',
  'Is that Tom Hanks?',
  "Maybe it's a Pixar Movie?",
  'Fast and Furious 15?',
  'Is that Christopher Nolan?',
  'Could it be a horror movie?',
  "Is that Meryl Streep?",
];

// Init values
export const roomInit = {
  round: 0,
  videoKeyFrameA: '',
  videoKeyFrameB: '',
  movieInfo: {
    title: '',
    movieID: '',
    poster: '',
    backdrop: '',
    rating: null,
    releaseDate: '',
  },
};

export const playerAInit = {
  uid: 'Not ready',
  hp: 0,
  guess: {
    title: '',
    movieID: '',
    poster: '',
    backdrop: '',
    rating: null,
    releaseDate: '',
  },
  ready: false,
  frameReady: false,
  present: true,
};

export const playerBInit = {
  uid: "Not ready",
  hp: 0,
  guess: {
    title: '',
    movieID: '',
    poster: '',
    backdrop: '',
    rating: null,
    releaseDate: '',
  },
  ready: false,
  frameReady: false,
  present: false,
};
