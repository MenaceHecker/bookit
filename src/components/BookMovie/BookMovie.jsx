import React, { useState } from 'react';
import MovieDetail from './MovieDetail';
import ShowTimeSelector from './ShowTimeSelector';
import SeatSelector from './SeatSelector';
import AgeSelector from './AgeSelector';
import ShowDateSelector from './ShowDateSelector';
import { useNavigate } from 'react-router-dom';
import './BookMovie.css';

const BookMovie = (props) => {
  const {
    id,
    movieTitle,
    movieShowDates,
    movieShowTimes,
    setCheckoutDetails,
  } = props;
  const navigate = useNavigate();

  const [selectedShowDate, setSelectedShowDate] = useState(movieShowDates || '');
  const [selectedTime, setSelectedTime] = useState(movieShowTimes || '');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTickets, setSelectedTickets] = useState([]);

  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const columns = [1, 2, 3, 4, 5, 6, 7, 8];
  const availableSeats = rows.flatMap(row => columns.map(col => `${row}${col}`));

  const handleTimeSelect = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleShowDateSelect = (e) => {
    setSelectedShowDate(e.target.value);
  };

  const checkNow = () => {
    if (selectedSeats.length === 0) {
      alert("Please select seats before proceeding to checkout.");
    } else {
      const checkoutDetails = {
        id: id,
        selectedTickets: selectedTickets,
        selectedSeats: selectedSeats,
        selectedTime: selectedTime,
        selectedShowDate: selectedShowDate,
      };

      setCheckoutDetails(checkoutDetails);
      navigate('/Checkout');
    }
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
          handleShowDateSelect={handleShowDateSelect}
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
        <AgeSelector selectedSeats={selectedSeats} setSelectedTickets={setSelectedTickets} />
      </div>

      <button onClick={() => checkNow(id, movieTitle)} className="book_movie_button">Proceed to Checkout</button>
    </div>
  );
};

export default BookMovie;
