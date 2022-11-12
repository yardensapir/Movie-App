import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./movie-page.styles.css";
import { useParams } from "react-router-dom";
import Modal from "../../components/modal/Modal";
import environments from "../../environments/environments.js";
const MoviePage = () => {
  const [movie, setMovie] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);
  const [trailerKey, setTrailerKey] = useState("");
  const params = useParams();
  const movieID = params.movieID;
  const navigate = useNavigate();
  const API_URL = "https://api.themoviedb.org/3/movie";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original/";

  //Fetch Movie

  const getMovies = async (searchKey) => {
    const { data } = await axios.get(`${API_URL}/${searchKey}`, {
      params: {
        api_key: environments.REACT_APP_MOVIE_API_KEY,
        query: searchKey,
        append_to_response: "videos",
      },
    });
    const trailerKey = await data.videos.results.find((element) =>
      element.name.includes("Trailer")
    );
    trailerKey
      ? setTrailerKey(trailerKey.key)
      : setTrailerKey(data.videos.results[0].key);
    setMovie(data);
  };

  useEffect(() => {
    getMovies(movieID);
  }, []);

  return (
    <div className='main-movie-container'>
      <div
        className='backdrop'
        style={{
          backgroundImage: `url(${IMAGE_PATH}/${movie.backdrop_path})`,
        }}
      >
        <h1 className='backdrop-title'>{movie.title}</h1>
        <p className='backdrop-p'>{movie.overview}</p>
      </div>

      <div className='movie-container'>
        <img src={`${IMAGE_PATH}${movie.poster_path}`} alt='' />
        <h1>{movie.tagline}</h1>
        <div className='text'>
          <p>{movie.overview}</p>
        </div>
        <div className='btn-container'>
          <button onClick={() => setOpenMenu(true)} className='backdrop-btn'>
            Play Trailer
          </button>

          <button onClick={() => navigate("/")} className='backdrop-btn'>
            Go Back
          </button>
        </div>
      </div>
      {openMenu && <Modal trailerKey={trailerKey} closeMenu={setOpenMenu} />}
      <div className='container-fluid movie-app'></div>
    </div>
  );
};

export default MoviePage;
