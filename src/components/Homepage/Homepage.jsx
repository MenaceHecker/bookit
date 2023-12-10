import Footer from '../footer/footer';
import Header from '../header/header';
import Home from '../Home/Home';
import Movies from '../Movies/movies';

const Homepage = ({ movies, refreshMovies }) => {
  return (
    <>
      <Header/>
      <Home/>
      <Movies {...{movies, refreshMovies}}/>
      <Footer/>
    </>
  )
};

export default Homepage;
