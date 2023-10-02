// header and sidebar
// table with movies
// searchbar for movies to the left 
// add movie button opens form on the right side 
// edit, delete, add movie (brings up form to edit, add, delete?)

//create searchbar.jsx (reuse in manage users)
//create table.jsx  (reuse in manage users)

//create AddMovieForm.jsx
//create EditMoveForm.jsx

import Table from './Table/Table';
import './ManageMovies.css'
import AdminHeader from "./AdminHeader/AdminHeader";
import AdminSideBar from "./AdminSideBar/AdminSideBar";
import AddMoviePopout from './MovieForms/AddMoviePopout';
import { useState } from 'react';
import './MovieForms/MovieForm.css'

function ManageMovies() {

  const [movieType, setMovieType] = useState('currentlyShowing'); //This will allow the admin to switch between the "Currently Showing" movies and the "Coming soon" movies
  //different data from the database will be fetched depending on state

  const handleMovieTypeChange = (type) => {
    setMovieType(type);
  };

  
  const [showPopout, setShowPopout] = useState(false);

  const togglePopout = () => {
    setShowPopout(!showPopout);
  };

  
  const mockData = [
    {
      id: 1,
      movieName: 'Movie 1',
      movieDirector: 'Director 1',
      rooms: 3,
      bookingDates: ['2023-09-20', '2023-09-21'],
    },
    {
      id: 2,
      movieName: 'Movie 2',
      movieDirector: 'Director 2',
      rooms: 2,
      bookingDates: ['2023-09-22', '2023-09-23'],
    },
    
  ];




    return (
      <div className = "content">
        <AdminHeader/>
        <AdminSideBar/>

      
        <div className="center_title">
            Manage Movies
        </div>


        
        <div className = "navigation">
          <button onClick={() => handleMovieTypeChange('currentlyShowing')}>Currently Showing</button>
          <button onClick={() => handleMovieTypeChange('comingSoon')}>Coming Soon</button>
        </div>


        <div className="add_button">
          <button onClick={togglePopout}>Add Movie</button>
          {showPopout && <AddMoviePopout mode="add" onClose={togglePopout} setShowPopout={setShowPopout} />}
        </div>

        <div className = "table">
          <Table data={mockData} pageType="ManageMovies" movieType={movieType}  />
        </div>

      </div>
     
    );
  }

  //divide between currently showing and coming soon
  // table that shows title, director, image, trailer, room, and show dates
  //form below table for submitting new movie


  export default ManageMovies;