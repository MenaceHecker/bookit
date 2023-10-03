import React, { useState } from 'react';
import MovieDetail from './MovieDetail';
import ShowTimeSelector from './ShowTimeSelector';
import SeatSelector from './SeatSelector';
import AgeSelector from './AgeSelector';
import ShowDateSelector from './ShowDateSelector';
import './BookMovie.css';
import { Link } from 'react-router-dom';

const BookMovie = () => {
  const [selectedMovie] = useState({ movieTitle: 'Inception' });
  const [showDates] = useState([
    '2023-10-10', // Assuming this is in YYYY-MM-DD format
    '2023-10-11',
    '2023-10-12',
  ]);

  const [selectedShowDate, setSelectedShowDate] = useState(showDates[0]); // Initialize selected show day
  const [showTimes] = useState(['10:00 AM', '2:00 PM', '6:00 PM']);
  const [selectedTime, setSelectedTime] = useState(showTimes[0]);
 
  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const columns = [1, 2, 3, 4, 5, 6, 7, 8];
  const availableSeats = rows.flatMap(row => columns.map(col => `${row}${col}`));
  
  const [selectedSeats, setSelectedSeats] = useState([]);

  const [selectedTickets, setSelectedTickets] = useState({
    child: 0,
    adult: 0,
    senior: 0,
  });

  

  const handleTimeSelect = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleShowDateSelect = (e) => {
    setSelectedShowDate(e.target.value);
  };

  return (
    <div className="book_movie_container">
      
      <div className = "movie_detail">
      <MovieDetail selectedMovie={selectedMovie} />
      </div>

      <div className = "show_day_selector">
      <ShowDateSelector
        showDates={showDates}
        selectedShowDate={selectedShowDate}
        handleShowDateSelect={handleShowDateSelect}
      />
      </div>

      <div className = "show_time_selector">
      <ShowTimeSelector showTimes={showTimes} selectedTime={selectedTime} handleTimeSelect={handleTimeSelect} />
      </div>

      <div className = "seat_selector">
      <SeatSelector availableSeats={availableSeats} setSelectedSeats={setSelectedSeats} />
      </div>
      
      <div className = "age_selector" >
      <AgeSelector selectedSeats={selectedTickets} setSelectedTickets={setSelectedTickets} /> {/** Change to Select tickets based on age: child, adult, senior */}
      </div>

      <Link to = "/Checkout">
        <button className="book_movie_button">Proceed to Checkout</button>
      </Link>
      
    </div>
  );
};
 
export default BookMovie;
