import React from 'react';

const ShowTimeSelector = ({ showTimes, selectedTime, handleTimeSelect }) => {
  return (
    <div>
      <h3>Select Show Time</h3>
      <select value={selectedTime} onChange={handleTimeSelect}>
        {showTimes.map(time => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ShowTimeSelector;
