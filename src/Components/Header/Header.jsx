import React from 'react';
import logo from "./logo.png";
import { Link } from 'react-router-dom';
import {ImSearch} from 'react-icons/im';
const Header = () => {
  return (
    <nav className="header">
        <img src={logo} alt="logo" />
        <div>
          <Link to="/tvShows">TV Shows</Link>
          <Link to="/tvShows">Movies</Link>
          <Link to="/tvShows">Recently Added</Link>
          <Link to="/tvShows">My List</Link>
        </div>
          <div className='search'>
            <input type={'text'} />
                <ImSearch/>
        </div>
    </nav>
  )
}

export default Header