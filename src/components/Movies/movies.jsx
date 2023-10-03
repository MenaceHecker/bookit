import React, { useState, useEffect } from 'react';
import './movies.css';

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
          {moviesData.map(({ id, poster, title, cast, disc, link }) => (
              <article key={id} className='movie__item'>
                <div className='movie__item-image'>
                  <img className='movie_poster' src={poster} alt={title} />
                </div>
                <h4 className='title'>{title}</h4>
                <h3>Cast: {cast}</h3>
                <h3>{disc}</h3>
                <div className='movie__item-trailer'>
                  <a href={link}>Watch Trailer</a>
                </div>
              </article>
          ))}
        </div>
      </section>
  );
};

export default Movies;