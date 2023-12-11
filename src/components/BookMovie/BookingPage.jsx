import React, {useContext} from 'react';
import BookMovie from './BookMovie';
import Header from '../header/header';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {SessionContext} from "../../utils/Session";
import Login from "../Login/Login";


function BookingPage ({movies, refreshMovies}) {
  const { id } = useParams();
  const session = useContext(SessionContext);
  useEffect(() => { refreshMovies(); }, [id, refreshMovies]);
  const selectedMovie = movies.find((movie) => movie.id === +id);
    return (
        <div>
          {session.currentUser !== null && <Header/>}
          {session.currentUser !== null && selectedMovie && <BookMovie {...selectedMovie} />}
          {session.currentUser == null && <Login/>}
        </div>
    );
};

export default BookingPage;