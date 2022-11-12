import React from "react";
import "./navbar.styles.css";
const Navbar = (props) => {
  return (
    <form action='' onSubmit={props.handleSubmit}>
      <div className='input-contianer'>
        <span>Movie App</span>
        <div className='search'>
          <input onInput={props.searchMovie} placeholder='Search' type='text' />
          <button className='search-btn'>Search</button>
        </div>
      </div>
    </form>
  );
};

export default Navbar;
