import React, {useContext} from 'react';
import BookMovie from './BookMovie';
import Header from '../header/header';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {SessionContext} from "../../utils/Session";
import Login from "../Login/Login";


function BookingPage ({ movies, refreshMovies, pendingOrder, setPendingOrder }) {
  const { id } = useParams();
  const session = useContext(SessionContext);
  useEffect(() => { refreshMovies(); }, [id, refreshMovies]);
  if (session.currentUser === null)
    return <Login/>;
  const selectedMovie = movies.find((movie) => movie.id === +id);
  if (!selectedMovie)
    return <Header/>;
  return (
    <div>
      <Header/>
      <BookMovie {...{selectedMovie, pendingOrder, setPendingOrder}}/>
    </div>
  );
};

export default BookingPage;
