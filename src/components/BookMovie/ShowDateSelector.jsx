import React from 'react';

const ShowDateSelector = ({ selectedShowDate, handleShowDateSelect, showDates }) => {
  const formattedDate = new Date(showDates + 'T00:00:00').toLocaleDateString(); 
  return (
    <div>
      <h3>Select Show Date</h3>
      <select value={selectedShowDate} onChange={handleShowDateSelect}>
        <option value={showDates}>{formattedDate}</option>
      </select>
    </div>
  );
};

export default ShowDateSelector;
