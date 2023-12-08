import React from 'react';


const ShowTimeSelector = ({ selectedTime, handleTimeSelect}) => {
  return (
    <div>
      <h3>Select Show Time</h3>
      <select value={selectedTime} onChange={handleTimeSelect}>
        <option value={selectedTime}>
          {selectedTime}
        </option>
      </select>
    </div>
  );
};




export default ShowTimeSelector;
