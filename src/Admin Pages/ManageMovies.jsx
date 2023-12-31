// header and sidebar
// table with movies
// searchbar for movies to the left
// add movie button opens form on the right side
// edit, delete, add movie (brings up form to edit, add, delete?)

//create searchbar.jsx (reuse in manage users)
//create table.jsx  (reuse in manage users)

//create AddMovieForm.jsx
//create EditMoveForm.jsx

import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './ManageMovies.css';
import './MovieForms/MovieForm.css';
import AdminHeader from './AdminHeader/AdminHeader';
import AdminSideBar from './AdminSideBar/AdminSideBar';
import AddMoviePopout from './MovieForms/AddMoviePopout';
import Table from './Table/Table';
import Footer from '../components/footer/footer';
import { useApiData } from '../utils/API';
import { SessionContext } from '../utils/Session';

function ManageMovies({ movies, refreshMovies }) {
  const { currentUser } = useContext(SessionContext);
  const navigate = useNavigate();
  const [movieType, setMovieType] = useState('currentlyShowing'); //This will allow the admin to switch between the "Currently Showing" movies and the "Coming soon" movies
  //different data from the database will be fetched depending on state
  const handleMovieTypeChange = (type) => {
    setMovieType(type);
  };

  const [showPopout, setShowPopout] = useState(false);

  const togglePopout = () => {
    console.log('toggling popout!');
    setShowPopout(!showPopout);
    refreshMovies();
  };

    function joe() {
        navigate('/')
    }
    if (!currentUser?.privileged) {
        return (
            <div className={'center_title'}>
                <h1>You are not granted access</h1>
                <button onClick={joe}>Home</button>
            </div>
        );
    }

  return (
    <div className="content">
      <AdminHeader/>
      <AdminSideBar/>

      <div className="center_title">
          Manage Movies
      </div>

      {/*<div className="navigation">
        <button type="button" onClick={() => handleMovieTypeChange('currentlyShowing')}>Currently Showing</button>
        <button type="button" onClick={() => handleMovieTypeChange('comingSoon')}>Coming Soon</button>
      </div>*/}

      <div className="add_button">
        <button onClick={togglePopout}>Add Movie</button>
        {showPopout && <AddMoviePopout mode="add" onClose={togglePopout}/>}
      </div>

      <div className="table">
        <Table data={movies} pageType="ManageMovies" movieType={movieType} refresh={refreshMovies}/>
      </div>
      <Footer/>
    </div>
  );
}

  //divide between currently showing and coming soon
  // table that shows title, director, image, trailer, room, and show dates
  //form below table for submitting new movie


  export default ManageMovies;
