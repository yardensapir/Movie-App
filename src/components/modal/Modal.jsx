import React from "react";
import YouTube from "react-youtube";
import "./modal.styles.css";
const Modal = ({ closeMenu, trailerKey }) => {
  return (
    <div className='backdrop-modal'>
      <button onClick={() => closeMenu(false)} type='button'>
        X
      </button>
      {trailerKey.length > 0 ? (
        <YouTube videoId={trailerKey} />
      ) : (
        <h1>Can Not Find The Trailer..</h1>
      )}
    </div>
  );
};

export default Modal;
