import React, { useState } from 'react';
import MovieDetail from './MovieDetail';
import ShowTimeSelector from './ShowTimeSelector';
import SeatSelector from './SeatSelector';
import AgeSelector from './AgeSelector';
import ShowDateSelector from './ShowDateSelector';
import './BookMovie.css';

const BookMovie = (props) => {
  const {
    movieTitle,
    movieShowDates,
    movieShowTimes,
  } = props;


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

  // Handle checkout logic here or redirect to checkout page
  const handleProceedToCheckout = () => {
    
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

      <button className="book_movie_button" onClick={handleProceedToCheckout}>
        Proceed to Checkout
      </button>
    </div>
  );
};
 
export default BookMovie;