import React from "react";
import ReactPlayer from "react-player/lazy";
import "./modal.styles.css";
const Modal = ({ closeMenu, trailerKey }) => {
  return (
    <div className='backdrop-modal'>
      <button onClick={() => closeMenu(false)} type='button'>
        X
      </button>
      {trailerKey.length > 0 ? (
        <ReactPlayer url={`https://www.youtube.com/watch?v=${trailerKey}`} />
      ) : (
        <h1>Can Not Find The Trailer..</h1>
      )}
    </div>
  );
};

export default Modal;
