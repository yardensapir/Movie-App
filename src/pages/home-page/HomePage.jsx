import axios from "axios";
import React, { useEffect, useState } from "react";
import "./home-page.styles.css";
import MovieList from "../../components/movie-list/MovieList.jsx";
import Navbar from "../../components/navbar/Navbar";
import AddFavourites from "../../components/add-favour/AddFavourites";
import RemoveFavourites from "../../components/remove-favour/RemoveFavourites";
import environments from "../../environments/environments.js";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [favoruritesMovies, setFavoruritesMovies] = useState([]);
  const [userSearchKey, setUserSearchKey] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app", JSON.stringify(items));
  };

  //SEARCH FILMS
  const searchMovie = (event) => {
    const userInput = event.target.value.trim();
    setUserSearchKey(userInput);
  };
  //SUBMIT SEARCH
  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies(userSearchKey);
  };
  //Add To Favourites
  const addMovieToFavorurites = (movie) => {
    const movieID = favoruritesMovies.find(
      (movieID) => movieID.id === movie.id
    );
    if (!movieID) {
      const newFavoruriteList = [...favoruritesMovies, movie];
      setFavoruritesMovies(newFavoruriteList);
      saveToLocalStorage(newFavoruriteList);
    }
  };

  //Remove From Favourites
  const removeMovieFromFavourites = (movie) => {
    const filterArray = favoruritesMovies.filter(
      (movieID) => movieID.id !== movie.id
    );

    setFavoruritesMovies(filterArray);
    saveToLocalStorage(filterArray);
  };

  //FETCH MOVIES FROM API
  const API_URL = "https://api.themoviedb.org/3";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original/";
  const getMovies = async (searchKey) => {
    const type = searchKey ? "search" : "discover";
    try {
      const {
        data: { results },
      } = await axios.get(`${API_URL}/${type}/movie`, {
        params: {
          api_key: environments.REACT_APP_MOVIE_API_KEY,
          query: searchKey,
        },
      });

      if (results.length > 0) {
        setMovies(results);
        setSelectedMovie(results[0]);
      } else {
        alert("SOMETHING WENT WRONGM, TRY TO SEARCH SOMETHING ELSE");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMovies();
    const movieFavourites = JSON.parse(localStorage.getItem("react-movie-app"));
    setFavoruritesMovies(movieFavourites);
  }, []);

  return (
    <main className='main-container'>
      <Navbar handleSubmit={handleSubmit} searchMovie={searchMovie} />
      <div
        className='backdrop'
        style={{
          backgroundImage: `url(${IMAGE_PATH}/${selectedMovie.backdrop_path})`,
        }}
      >
        <h1 className='backdrop-title'>{selectedMovie.title}</h1>
        <p className='backdrop-p'>
          {selectedMovie.overview ? selectedMovie.overview : null}
        </p>
      </div>

      <div className='items-container'>
        <MovieList
          movies={movies}
          handelFavouritesClick={addMovieToFavorurites}
          favouriteComponent={AddFavourites}
        />
      </div>

      {favoruritesMovies.length > 0 ? (
        <div className='container-fluid movie-app'>
          <h1>Favorurites Movies</h1>
          <div className='row'>
            <MovieList
              movies={favoruritesMovies}
              favouriteComponent={RemoveFavourites}
              handelFavouritesClick={removeMovieFromFavourites}
            />
          </div>
        </div>
      ) : null}
    </main>
  );
};

export default HomePage;
