import React from 'react';
import BookMovie from './BookMovie';
import Header from '../header/header';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';


function BookingPage ({movies, refreshMovies}) {
  const { id } = useParams();
  useEffect(() => { refreshMovies(); }, [id, refreshMovies]);
  const selectedMovie = movies.find((movie) => movie.id === +id);
    return (
        <div>
            <Header/>
            {selectedMovie && <BookMovie {...selectedMovie} />}
        </div>
    );
};

export default BookingPage;