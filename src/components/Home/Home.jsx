import React from 'react';
import { useNavigate } from 'react-router-dom';
import video from '../../assets/trailer.mp4';
import './Home.css';


function Home() {
  const navigate = useNavigate();

  const openYoutubeVideo = () => {
    // Open the YouTube video in a new tab when the button is clicked
    window.open('https://www.youtube.com/watch?v=6ZfuNTqbHE8&t=1s&ab_channel=MarvelEntertainment', '_blank');
  };

  const bookNow = () => {
    navigate('/BookingPage');
  };

  return (
    <div className='bgContainer'>
      <div className='overlay'>
        <video src={video} autoPlay loop muted />
        <div className='containervid'>
          <h3 className='title' onClick={bookNow}>Avengers Infinity Wars</h3>
          <div className='rate'>
            <i className='fa fa-star'></i>
            <i className='fa fa-star'></i>
            <i className='fa fa-star'></i>
            <i className='fa fa-star'></i>
            <i className='fa fa-star'></i>
          </div>
          <h1 className='Status'>Now playing</h1>
          <div className='btnContainer'>
            <button
              className='btn'
              onClick={openYoutubeVideo} // Call the function to open YouTube video
            >
              Watch Trailer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
