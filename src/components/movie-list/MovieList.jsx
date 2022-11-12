import React from "react";
import "./movie-list.styles.css";
import { useNavigate } from "react-router-dom";
const MovieList = (props) => {
  const FavouriteComponent = props.favouriteComponent;
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original/";
  const navigate = useNavigate();
  return (
    <>
      {props.movies.map((movie) => {
        return (
          <div key={movie.id} className='movie-card'>
            <img
              className='movie-card-img'
              onClick={() => navigate(`${movie.id}`)}
              src={`${IMAGE_PATH}${movie.poster_path}`}
              alt=''
            />
            <div
              onClick={() => props.handelFavouritesClick(movie)}
              className='overlay'
            >
              <h5 className='title'>
                <FavouriteComponent />
              </h5>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MovieList;
