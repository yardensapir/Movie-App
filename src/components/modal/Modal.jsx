import React from "react";
import ReactPlayer from "react-player/lazy";
import "./modal.styles.css";
const Modal = ({ closeMenu,trailerKey }) => {

  return (
    <div className='backdrop-modal'>
      <button onClick={() => closeMenu(false)} type='button'>
        X
    
      </button>
      {console.log(trailerKey)}
      <ReactPlayer url={`https://www.youtube.com/watch?v=${trailerKey}`} />
    </div>
  );
};

export default Modal;
