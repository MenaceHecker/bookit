import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './movies.css';
import '../../logo.svg';
import { useApiData } from '../../utils/API';

const Movies = () => {
  const [moviesData, setMoviesData] = useState([]);
  const navigate = useNavigate();

  useApiData(async (api) => {
    try {
      const response = await api.listMovies();
      if (response.ok)
        setMoviesData(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  });

  const bookNow = () => {
    navigate('/BookingPage');
  };

  const displayMovie = ({ id, movieTrailerPicture, movieTitle, movieCast, movieCategory, movieTrailerVideo, movieSynopsis }) => (
    <div key={id} className='mov_cont'>
    <article className='movie__item'>
      <div className='movie__item-image'>
          <iframe width="480" height="275" src={movieTrailerVideo + '&autoplay=1&mute=1'} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
      </div>
      <h4 className='title' onClick={bookNow}>{movieTitle}</h4>
      <h3>Cast:<br></br>{movieCast}</h3>
        <h3>Description:<br></br>{movieSynopsis}</h3>
      <h3>Category:<br></br>{movieCategory}</h3>
        <div className='button_div'>
          <button onClick={bookNow}>Book Now</button>
        </div>
    </article>
    </div>
  );

  const showDatesCurrent = (dates) => {
    const firstDate = dates.split(',')[0];
    const startTime = Date.parse(firstDate + 'T00:00:00');
    return isNaN(startTime) || Date.now() >= startTime;
  };

  return (
    <>
      <section className="movie_section">
        <h5 className='title'>Now Showing</h5>
        <div className='container movie__container'>
          {moviesData.filter(({ movieShowDates }) => showDatesCurrent(movieShowDates)).map(displayMovie)}
        </div>
      </section>
      <section className="movie_section">
        <h5 className='title'>Coming Soon</h5>
        <div className='container movie__container'>
          {moviesData.filter(({ movieShowDates }) => !showDatesCurrent(movieShowDates)).map(displayMovie)}
        </div>
      </section>
    </>
  );
};

export default Movies;
