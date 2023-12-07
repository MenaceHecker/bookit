import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './movies.css';
import '../../logo.svg';

const showDatesCurrent = (dates) => {
  const firstDate = dates.split(',')[0];
  const startTime = Date.parse(firstDate + 'T00:00:00');
  const threeWeeksLater = new Date(startTime);
  threeWeeksLater.setDate(threeWeeksLater.getDate() + 21); // Adding 21 days for "coming soon"

  const now = Date.now();
  const twentyOneDaysAgo = new Date(now);
  twentyOneDaysAgo.setDate(twentyOneDaysAgo.getDate() - 21); // Subtracting 21 days to check if it's in the past

  return (
    isNaN(startTime) ||
    (now >= startTime && now < threeWeeksLater) || // Within the next 21 days
    (startTime < twentyOneDaysAgo) // Started more than 21 days ago
  );
};

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

export {showDatesCurrent};
export default Movies;