import React, { useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import Logo from '../../assets/bookit-high-resolution-logo-colo.png';
import DropDownMenu from './DropDownMenu';


const Header = () => {
  const [Mobile, setMobile] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const searchResultsRef = useRef(null);
  const searchBarId = useId();
  const searchBarKeyPress = async (event) => {
      await executeSearch();
  };
  const executeSearch = async () => {
    const response = await fetch('http://198.251.67.241:8080/api/getlistings');
    const allMovies = await response.json();
    const query = document.getElementById(searchBarId).value.toLowerCase();
    const results = allMovies
      .filter(({ movieTitle }) => movieTitle.toLowerCase().includes(query))
      .slice(0, 10)
      .map(({ movieTitle }, i) => <li key={i}><Link to="/BookingPage">{movieTitle}</Link></li>);
    const clickHandler = (event) => {
      if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
        document.removeEventListener('click', clickHandler);
        setSearchResults(null);
      }
    };
    document.addEventListener('click', clickHandler);
    setSearchResults(<ul className="search-results" ref={searchResultsRef}>{results}</ul>);
  };
  return (
    <>
      <header>
        <div className='container flexSB'>
          <nav className='flexSB'>
            <Link to='/Homepage'>
            <div className='logo'>
              <img src={Logo} alt='Logo' />
            </div>
            </Link>
            {/*<ul className='flexSB'>*/}
            <ul className={Mobile ? "navMenu-list" : "flexSB"} onClick={() => setMobile(false)}>
              <li>
                <a href='/'>Home</a>
              </li>
              <li>
                <a href='#moviesNowShowing'>Movies</a>
              </li>
              <li>
                <Link to='/TrailerPage'>Test</Link>
              </li>
              <li>
                <Link to='/MainAdmin'>Admin</Link>
              </li>
              <li>
                <a href='#footer'>Contact Us</a>
              </li>
            </ul>
            <button className='toggle' onClick={() => setMobile(!Mobile)}>
              {Mobile ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}
            </button>
          </nav>
          <div className='account flexSB'>
            <div className="search-bar">
              <input id={searchBarId} type="text" className="search-bar_input" placeholder="Search for Movies" onKeyPress={searchBarKeyPress}/>
              <i className='fa fa-search' onClick={executeSearch}></i>
              {searchResults}
            </div>
            <DropDownMenu/>
            <button className="btn_book">Book Now</button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
