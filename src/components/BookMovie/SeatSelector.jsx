import React, { useState } from 'react';
import './SeatSelector.css'; // SeatSelector: Red Seat for occupied, Transparent for not.

const SeatSelector = ({ seatNames, freeSeats, pendingOrder, setPendingOrder }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatSelect = (seatNum) => {
    setPendingOrder(prevSeats => {
      const { tickets } = prevSeats;
      const occupied = !freeSeats.includes(seatNum);
      const selected = tickets.some((t) => t.seatNum === seatNum);
      const include = !occupied && !selected;
      return {
        ...prevSeats,
        tickets: !occupied && !selected
          ? [...tickets, { type: 'Adult', seatNum }]
          : tickets.filter((t) => t.seatNum !== seatNum)
      };
    });
  };

  return (
    <div>
      <h3>Select Seats</h3>
      <ul className="showcase">
        <li>
          <div className="seat"></div>
          <small>N/A</small>
        </li>

        <li>
          <div className="seat selected"></div>
          <small>Selected</small>
        </li>

        <li>
          <div className="seat occupied"></div>
          <small>Occupied</small>
        </li>    
        
      </ul>

      <div className="screen"></div>
      <div className="seat-container">
        {seatNames.map((seatName, i) => (
          <div
            key={i}
            className={`seat ${
              pendingOrder.tickets.some((t) => t.seatNum === i) ? 'selected' : ''
            } ${
              !freeSeats.includes(i) ? 'occupied' : ''
            }`}
            onClick={() => handleSeatSelect(i)}
          >
            {seatName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatSelector;

