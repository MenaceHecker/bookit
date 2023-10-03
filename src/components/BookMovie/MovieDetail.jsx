import React from 'react';
//Might just delete this
const MovieDetail = ({ selectedMovie }) => {
  return (
    <div>
      <h2>You Selected: {selectedMovie.movieTitle}</h2>
      
    </div>
  );
};

export default MovieDetail;
