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
import { useEffect, useState } from 'react';
import './MovieForms/MovieForm.css'
import Footer from "../components/footer/footer";

function ManageMovies() {

  const [movieType, setMovieType] = useState('currentlyShowing'); //This will allow the admin to switch between the "Currently Showing" movies and the "Coming soon" movies
  //different data from the database will be fetched depending on state
  const [data, setData] = useState([]);

  const handleMovieTypeChange = (type) => {
    setMovieType(type);
  };

  const [showPopout, setShowPopout] = useState(false);

  const togglePopout = () => {
    fetchData();
    setShowPopout(!showPopout);
  };
  useEffect(() => {
    (async () => {
      const response = await fetch('http://198.251.67.241:8080/api/getlistings');
      const newData = await response.json();
      setData(newData);
    })();
  }, []);
  var input = 'http://198.251.67.241:8080/api/getlistings';
  function fetchData() {
    fetch(input)
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => console.error('Error:', error));
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
        {showPopout && <AddMoviePopout mode="add" onClose={togglePopout} setShowPopout={setShowPopout} />}
      </div>

      <div className="table">
        <Table data={data} pageType="ManageMovies" movieType={movieType}  />
      </div>
      <Footer/>
    </div>
  );
}

  //divide between currently showing and coming soon
  // table that shows title, director, image, trailer, room, and show dates
  //form below table for submitting new movie


  export default ManageMovies;
