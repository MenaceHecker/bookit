import React, { useState } from 'react';
import MovieDetail from './MovieDetail';
import ShowTimeSelector from './ShowTimeSelector';
import SeatSelector from './SeatSelector';
import AgeSelector from './AgeSelector';
import ShowDateSelector from './ShowDateSelector';
import { useNavigate } from 'react-router-dom';
import './BookMovie.css';

import { Link } from 'react-router-dom';

const BookMovie = (props) => {
 
  const {
      id,
    movieTitle,
    movieShowDates,
    movieShowTimes,
  } = props;
    const navigate = useNavigate();

  const [selectedShowDate, setSelectedShowDate] = useState(movieShowDates || '');

  const [selectedTime, setSelectedTime] = useState(movieShowTimes || '');


  // Seat and Ticket Selectors
  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const columns = [1, 2, 3, 4, 5, 6, 7, 8];
  const availableSeats = rows.flatMap(row => columns.map(col => `${row}${col}`));
  
  const [selectedSeats, setSelectedSeats] = useState([]);

  const [selectedTickets, setSelectedTickets] = useState({
    child: 0,
    adult: 0,
    senior: 0,
  });

  // Show Date and Show Time Selectors
  const handleTimeSelect = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleShowDateSelect = (e) => {
    setSelectedShowDate(e.target.value);
    console.log(selectedShowDate);
  };

    const checkNow = (id, movieTitle) => {
        //const shortTitle = movieTitle.slice(0, 16);
        const checkoutDetails = {
            id: id,
            selectedTickets: selectedTickets,
            selectedSeats: selectedSeats,
            selectedTime: selectedTime,
            selectedShowDate: selectedShowDate,
        }
        const encodedDetails = encodeURIComponent(JSON.stringify(checkoutDetails));
        console.log("Encoded Details:", encodedDetails);
        navigate(`/Checkout/${encodedDetails}`);
    };

  return (
    <div className="book_movie_container">

      <div className="movie_detail">
        <MovieDetail selectedMovie={movieTitle} />
      </div>

      <div className="show_day_selector">
        <ShowDateSelector
          showDates={movieShowDates}
          selectedShowDate={selectedShowDate}
          handleShowDateSelect={handleShowDateSelect} // Pass the handleShowDateSelect function as a prop
        />
      </div>

      
      <div className="show_time_selector">
        <ShowTimeSelector
          selectedTime={movieShowTimes}
          handleTimeSelect={handleTimeSelect}
        />
      </div>

      <div className="seat_selector">
        <SeatSelector availableSeats={availableSeats} setSelectedSeats={setSelectedSeats} />
      </div>
      
      <div className="age_selector">
        <AgeSelector selectedSeats={selectedTickets} setSelectedTickets={setSelectedTickets} />
        {/* Select tickets based on age: child, adult, senior */}
      </div>


        <button onClick={() => checkNow(id, movieTitle)} className="book_movie_button">Proceed to Checkout</button>

    </div>
  );
};
 
export default BookMovie;