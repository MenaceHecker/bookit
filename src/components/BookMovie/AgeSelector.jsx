import React from 'react';
import './AgeSelector.css'

const AgeSelector = ({ selectedSeats, setSelectedTickets }) => {
  
  const handleTicketSelect = (e) => {
    const selectedValue = e.target.value;
    setSelectedTickets(prevTickets => ({
      ...prevTickets,
      [selectedValue]: prevTickets[selectedValue] + 1
    }));
  };

  return (
    <div className="select_tickets_row">
      <h3>Select Tickets</h3>
      <label>
        Child Tickets:{' '}
        <input
          type="number"
          value={selectedSeats.child}
          min="0"
          onChange={handleTicketSelect}
          name="child"
        />
      </label>
      <label>
        Adult Tickets:{' '}
        <input
          type="number"
          value={selectedSeats.adult}
          min="0"
          onChange={handleTicketSelect}
          name="adult"
        />
      </label>
      <label>
        Senior Tickets:{' '}
        <input
          type="number"
          value={selectedSeats.senior}
          min="0"
          onChange={handleTicketSelect}
          name="senior"
        />
      </label>
    </div>
  );
};

export default AgeSelector;

