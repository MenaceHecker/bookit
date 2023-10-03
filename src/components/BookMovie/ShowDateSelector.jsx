import React from 'react';

const ShowDaySelector = ({ showDates, selectedShowDate, handleShowDateSelect }) => {
    return (
      <div>
        <h3>Select Show Date</h3>
        <select value={selectedShowDate} onChange={handleShowDateSelect}>
          {showDates.map(date => (
            <option key={date} value={date}>
              {new Date(date).toLocaleDateString()} {/* Format date as desired */}
            </option>
          ))}
        </select>
      </div>
    );
  };

export default ShowDaySelector;
