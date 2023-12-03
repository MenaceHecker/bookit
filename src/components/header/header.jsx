import { useContext, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import Logo from '../../assets/bookit-high-resolution-logo-colo.png';
import DropDownMenu from './DropDownMenu';
import { APIContext } from '../../utils/API';

const Header = () => {
  const api = useContext(APIContext);
  const [Mobile, setMobile] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const searchResultsRef = useRef(null);
  const searchBarId = useId();
  const searchBarKeyPress = async (event) => {
      await executeSearch();
  };


  // const executeSearch = async () => {
  //   const response = await api.listMovies();
  //   const allMovies = response.data;
  //   const query = document.getElementById(searchBarId).value.toLowerCase();
  //   const results = allMovies
  //     .filter(({ movieTitle }) => movieTitle.toLowerCase().includes(query))
  //     .slice(0, 10)
  //     .map(({ movieTitle }, i) => <li key={i}><Link to={`/${movieTitle}`}>{movieTitle}</Link></li>);

  const showDatesCurrent = (dates) => {
    const firstDate = dates.split(',')[0];
    const startTime = Date.parse(firstDate + 'T00:00:00');
    return isNaN(startTime) || Date.now() >= startTime;
  };

  const executeSearch = async () => {
    const response = await api.listMovies();
    const allMovies = response.data;
    const query = document.getElementById(searchBarId).value.toLowerCase();

    const isCategorySearch = query.startsWith('category:'); // Check if it's a category search

    const isStatusSearch = query.toLowerCase() === 'comingsoon:' || query.toLowerCase() === 'currentlyshowing:'; //Check if it's searching by showtime


    let results;
    if (isCategorySearch) { //Search by Category
      const categoryQuery = query.replace('category:', '').trim();
      results = allMovies
        .filter(({ movieCategory }) => movieCategory.toLowerCase().includes(categoryQuery))
        .slice(0, 10)
        .map(({ movieTitle }, i) => (
          <li key={i}>
            <Link to={`/${movieTitle}`}>{movieTitle}</Link>
          </li>
        ));
        
    } else if (isStatusSearch) { //Search by either "currently showing" or "coming soon"
        const statusQuery = query.toLowerCase();
        const filteredByStatus = allMovies.filter(({ movieShowDates }) =>
          statusQuery === 'comingsoon:'
            ? !showDatesCurrent(movieShowDates)
            : showDatesCurrent(movieShowDates)
        );
        results = filteredByStatus
          .slice(0, 10)
          .map(({ movieTitle }, i) => (
            <li key={i}>
              <Link to={`/${movieTitle}`}>{movieTitle}</Link>
            </li>
          ));
          
    } else { //Search by Title, Default 
        results = allMovies
        .filter(({ movieTitle }) => movieTitle.toLowerCase().includes(query))
        .slice(0, 10)
        .map(({ movieTitle }, i) => (
          <li key={i}>
            <Link to={`/${movieTitle}`}>{movieTitle}</Link>
          </li>
        ));
    }


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
