import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Listing from './Listing';
import Footer from '../footer/footer';
import Header from '../header/header';

export default function Listings({ movies, refreshMovies }) {
  const { id } = useParams();
  useEffect(() => { refreshMovies(); }, [id, refreshMovies]);
  const selectedMovie = movies.find((movie) => movie.id === +id);
  return (
    <>
      <Header/>
      {selectedMovie && <Listing {...selectedMovie}/>}
      <Footer/>
    </>
  );
}
