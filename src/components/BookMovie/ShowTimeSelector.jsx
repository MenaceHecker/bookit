import React from 'react';

const ShowTimeSelector = ({ showings, pendingOrder, handleTimeSelect }) => {
  const showTimes = showings.map(({ id, startTime }) => (
    <option key={id} value={id}>{new Date(startTime).toLocaleString()}</option>
  ));
  return (
    <div>
      <h3>Select Show Time</h3>
      <select value={pendingOrder.showingId} onChange={handleTimeSelect}>
        {showTimes}
      </select>
    </div>
  );
};

export default ShowTimeSelector;
