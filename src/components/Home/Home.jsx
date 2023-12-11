import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import video1 from '../../assets/trailer.mp4';
import video2 from '../../assets/trailer2.mp4';
import video3 from '../../assets/trailer3.mp4';

const movies = [
  { id: -1, title: 'Avengers Infinity Wars', trailerLink: 'https://www.youtube.com/watch?v=6ZfuNTqbHE8&t=1s&ab_channel=MarvelEntertainment', video: video1 },
  { id: -2, title: 'Thor Ragnarok', trailerLink: 'https://www.youtube.com/watch?v=ue80QwXMRHg', video: video3 },
  { id: -3, title: 'Being the Ricardos', trailerLink: 'https://www.youtube.com/watch?v=WvrjCdtB0zM&t=26s', video: video2 },
  // Add more movies as needed
];

function Home() {
  const navigate = useNavigate();
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  const openYoutubeVideo = () => {
    window.open(movies[currentMovieIndex].trailerLink, '_blank');
  };

  const bookNow = (id, movieTitle) => {

  };

  const handlePrevMovie = () => {
    setCurrentMovieIndex((prevIndex) => (prevIndex === 0 ? movies.length - 1 : prevIndex - 1));
  };

  const handleNextMovie = () => {
    setCurrentMovieIndex((prevIndex) => (prevIndex === movies.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className='bgContainer'>
      <div className='overlay'>
        <video src={movies[currentMovieIndex].video} autoPlay loop muted />
        <div className='containervid'>
          <h3 className='title' onClick={() => bookNow(movies[currentMovieIndex].id, movies[currentMovieIndex].title)}>
            {movies[currentMovieIndex].title}
          </h3>
          <div className='rate'>
            <i className='fa fa-star'></i>
            <i className='fa fa-star'></i>
            <i className='fa fa-star'></i>
            <i className='fa fa-star'></i>
            <i className='fa fa-star'></i>
          </div>
          <h1 className='Status'>Now playing</h1>
          <div className='btnContainer'>
            <button className='arrowBtn' onClick={handlePrevMovie}>
              {'<'}
            </button>
            <button className='btn' onClick={openYoutubeVideo}>
              Watch Trailer
            </button>
            <button className='arrowBtn' onClick={handleNextMovie}>
              {'>'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
