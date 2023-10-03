import React, { useState } from 'react';
import './SeatSelector.css'; // Assuming you have a CSS file named SeatSelector.css

const SeatSelector = ({ availableSeats }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatSelect = (seat) => {
    setSelectedSeats(prevSeats =>
      prevSeats.includes(seat)
        ? prevSeats.filter(s => s !== seat)
        : [...prevSeats, seat]
    );
  };

  return (
    <div>
      <h3>Select Seats</h3>
      <ul class="showcase">
        <li>
          <div class="seat"></div>
          <small>N/A</small>
        </li>

        <li>
          <div class="seat selected"></div>
          <small>Selected</small>
        </li>

        <li>
          <div class="seat occupied"></div>
          <small>Occupied</small>
        </li>    
        
      </ul>

      <div className="screen"></div>
      <div className="seat-container">
        {availableSeats.map(seat => (
          <div
            key={seat}
            className={`seat ${selectedSeats.includes(seat) ? 'selected' : ''}`}
            onClick={() => handleSeatSelect(seat)}
          >
            {seat}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatSelector;

