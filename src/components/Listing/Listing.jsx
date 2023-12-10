import React from 'react';
import './Listing.css';
import { useNavigate } from 'react-router-dom';
import bookMovie from "../BookMovie/BookMovie";

const Listing = (props) => {
    const navigate = useNavigate();
    const {
        id,
        movieTitle,
        movieCategory,
        movieCast,
        movieDirector,
        movieProducer,
        movieSynopsis,
        movieReviews,
        movieTrailerPicture,
        movieTrailerVideo,
        movieMpaaRating,
        movieShowDates,
        movieShowTimes,
    } = props;
    const bookNow = (id, movieTitle) => {
        const shortTitle = movieTitle.slice(0, 16);
        navigate(`/BookingPage/${id}/${encodeURIComponent(shortTitle)}`);
      };
    return (
        <>
            <div id={'list_cont'}>
                <div id={'list_right'}>
                    <iframe width='800' height='600' src={movieTrailerVideo + '&autoplay=1&mute=1'} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </div>
                <div id={'list_left'}>
                <h2>{movieTitle}</h2>
                <p><strong>Category:</strong> {movieCategory}</p>
                <p><strong>Cast:</strong> {movieCast}</p>
                <p><strong>Director:</strong> {movieDirector}</p>
                <p><strong>Producer:</strong> {movieProducer}</p>
                <p><strong>Synopsis:</strong> {movieSynopsis}</p>
                <p><strong>Reviews:</strong> {movieReviews}</p>
                {/* Add more details as needed */}
                    {/*<img src={movieTrailerPicture} alt="Movie Trailer" />*/}
                <p><strong>MPAA Rating:</strong> {movieMpaaRating}</p>
                <p><strong>Show Dates:</strong> {movieShowDates}</p>
                <p><strong>Show Times:</strong> {movieShowTimes}</p>
                    <button className="btn_book"onClick={() => bookNow(id, movieTitle)}>Book Now</button>
                </div>
            </div>
        </>
    );
};

export default Listing;
