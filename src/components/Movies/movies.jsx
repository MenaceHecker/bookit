import React, { useState, useEffect } from 'react';
import './movies.css';
import '../../logo.svg'
const Movies = () => {
  const [moviesData, setMoviesData] = useState([]);

  useEffect(() => {
    const input = 'http://198.251.67.241:8080/api/getlistings';
    fetch(input)
        .then(response => response.json())
        .then(data => setMoviesData(data))
        .catch(error => console.error('Error:', error));
  }, []);

  return (
      <section id="now_showing">
        <h5 className='title'>Now Showing</h5>
        <div className='container movie__container'>
          {moviesData.map(({ id, movieTrailerPicture, movieTitle, movieCast, movieCategory, movieTrailerVideo, movieSynopsis }) => (
              <div id={'mov_cont'}>
              <article key={id} className='movie__item'>
                <div className='movie__item-image'>
                    <iframe width="480" height="275" src={movieTrailerVideo + '&autoplay=1&mute=1'} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </div>
                <h4 className='title'>{movieTitle}</h4>
                <h3>Cast:<br></br>{movieCast}</h3>
                  <h3>Description:<br></br>{movieSynopsis}</h3>
                <h3>Category:<br></br>{movieCategory}</h3>
                  <div id={'button_div'}>
                    <button>Book Now</button>
                  </div>
              </article>
              </div>
          ))}
        </div>
      </section>
  );
};

export default Movies;