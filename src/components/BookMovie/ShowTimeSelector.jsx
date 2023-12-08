import React from 'react';


const ShowTimeSelector = ({ selectedTime, handleShowDateSelect }) => {
  return (
    <div>
      <h3>Select Show Time</h3>
      <select value={selectedTime} onChange={handleShowDateSelect}>
        <option value={selectedTime}>
          {selectedTime}
        </option>
      </select>
    </div>
  );
};




export default ShowTimeSelector;
