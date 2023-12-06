import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './movies.css';
import '../../logo.svg';

const Movies = ({ movies, refreshMovies }) => {
  const navigate = useNavigate();

  useEffect(() => { refreshMovies(); }, [refreshMovies]);

  const bookNow = () => {
    navigate('/BookingPage');
  };
  const navMovie = (id, movieTitle) => {
    const shortTitle = movieTitle.slice(0, 16);
    navigate(`/Listing/${id}/${encodeURIComponent(shortTitle)}`);
  }

  const displayMovie = ({ id, movieTrailerPicture, movieTitle, movieCast, movieCategory, movieTrailerVideo, movieSynopsis }) => (
    <div key={id} className='mov_cont'>
    <article className='movie__item'>
      <div className='movie__item-image'>
          <iframe width="480" height="275" src={movieTrailerVideo + '&autoplay=1&mute=1'} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
      </div>
      <h4 className='title' onClick={() => navMovie(id, movieTitle)}>{movieTitle}</h4>
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
    const threeWeeksLater = new Date(startTime);
    threeWeeksLater.setDate(threeWeeksLater.getDate() + 21); // Adding 21 days for "coming soon"
  
    return isNaN(startTime) || (Date.now() >= startTime && Date.now() < threeWeeksLater);
  };

  return (
    <>
      <section className="movie_section">
        <h5 className='title'>Now Showing</h5>
        <div className='container movie__container'>
          {movies.filter(({ movieShowDates }) => showDatesCurrent(movieShowDates)).map(displayMovie)}
        </div>
      </section>
      <section className="movie_section">
        <h5 className='title'>Coming Soon</h5>
        <div className='container movie__container'>
          {movies.filter(({ movieShowDates }) => !showDatesCurrent(movieShowDates)).map(displayMovie)}
        </div>
      </section>
    </>
  );
};

export default Movies;