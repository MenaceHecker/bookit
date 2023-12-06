import { useContext, useId, useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import Logo from '../../assets/bookit-high-resolution-logo-colo.png';
import DropDownMenu from './DropDownMenu';
import { APIContext } from '../../utils/API';

import { showDatesCurrent } from '../Movies/movies.jsx';


const Header = () => {
  
  const api = useContext(APIContext);
  const [Mobile, setMobile] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const searchResultsRef = useRef(null);
  const searchBarId = useId();
  const searchBarKeyPress = async (event) => {
      await executeSearch();
  };
  const [showOnlyCurrentlyShowing, setShowOnlyCurrentlyShowing] = useState(false); 
  const [showOnlyComingSoon, setShowOnlyComingSoon] = useState(false); 

  const executeSearch = useCallback(async () => {
    const response = await api.listMovies();
    const allMovies = response.data;
    const query = document.getElementById(searchBarId).value.toLowerCase();
  
    const filterByStatusAndCategory = (movies, showCurrently, showComingSoon, categoryQuery = '') => {
      return movies.filter(({ movieTitle, movieShowDates, movieCategory }) => {
        const titleMatch = movieTitle.toLowerCase().includes(query);
        const isCurrentlyShowing = showDatesCurrent(movieShowDates);
        const categoryMatch = movieCategory.toLowerCase().includes(categoryQuery);
        const statusMatch =
          (!showCurrently && !showComingSoon) ||
          (showCurrently && isCurrentlyShowing) ||
          (showComingSoon && !isCurrentlyShowing);
  
        return (titleMatch || categoryMatch) && statusMatch;
      });
    };
  
    let results = [];
    const categoryPrefix = 'category:';
    if (query.startsWith(categoryPrefix)) { //Search by category and (optionally) filter between "currently showing" and "coming soon"
      const categoryQuery = query.replace(categoryPrefix, '').trim();
      const filteredByCategory = filterByStatusAndCategory(
        allMovies,
        showOnlyCurrentlyShowing,
        showOnlyComingSoon,
        categoryQuery
      );
  
      results = filteredByCategory.slice(0, 10).map(({ movieTitle }, i) => (
        <li key={i}>
          <Link to={`/${movieTitle}`}>{movieTitle}</Link>
        </li>
      ));
    } else { //Search by title and (optionally) filter between "currently showing" and "coming soon"
      const filteredMovies = filterByStatusAndCategory(
        allMovies,
        showOnlyCurrentlyShowing,
        showOnlyComingSoon
      );
  
      const titleFilteredMovies = filteredMovies.filter(({ movieTitle }) =>
        movieTitle.toLowerCase().includes(query)
      );
  
      results = titleFilteredMovies.slice(0, 10).map(({ movieTitle }, i) => (
        <li key={i}>
          <Link to={`/${movieTitle}`}>{movieTitle}</Link>
        </li>
      ));
    }
  
   
    // Render search results with checkboxes
    setSearchResults(
      <ul className="search-results" ref={searchResultsRef}>
        {results}
        {/* Checkbox for showing currently showing movies */}
        <li key="showOnlyCurrentlyShowing">
          <label htmlFor="showCurrentlyShowing">
            <input
              id="showCurrentlyShowing"
              type="checkbox"
              checked={showOnlyCurrentlyShowing}
              onChange={(e) => setShowOnlyCurrentlyShowing(e.target.checked)}
            />
            Only show currently showing
          </label>
        </li>
        {/* Checkbox for showing coming soon movies */}
        <li key="showOnlyComingSoon">
          <label htmlFor="showOnlyComingSoon">
            <input
              id="showComingSoon"
              type="checkbox"
              checked={showOnlyComingSoon}
              onChange={(e) => setShowOnlyComingSoon(e.target.checked)}
            />
            Only show coming soon
          </label>
        </li>
      </ul>
    );

  }, [api, searchBarId, showOnlyCurrentlyShowing, showOnlyComingSoon]);
  
  useEffect(() => {
    executeSearch();
  }, [executeSearch, showOnlyCurrentlyShowing, showOnlyComingSoon]); 

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
                <a href='#movies'>Movies</a>
              </li>
              <li>
                <Link to='/TrailerPage'>Test</Link>
              </li>
              <li>
                <Link to='/MainAdmin'>Admin</Link>
              </li>
              <li>
                <a href='/'>Contact Us</a>
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
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
