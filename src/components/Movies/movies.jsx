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
              <article key={id} className='movie__item'>
                <div className='movie__item-image'>
                  <img className='movie_poster' src={movieTrailerPicture} alt={movieTitle} />
                </div>
                <h4 className='title'>{movieTitle}</h4>
                <h3>Cast: {movieCast}</h3>
                  <h3>{movieSynopsis}</h3>
                <h3>{movieCategory}</h3>
                <div className='movie__item-trailer'>
                  <a href={movieTrailerVideo}>Watch Trailer</a>
                </div>
              </article>
          ))}
        </div>
      </section>
  );
};

export default Movies;