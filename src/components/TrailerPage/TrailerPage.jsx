import React from 'react';
import Header from '../header/header';
import './TrailerPage.css';
import YouTube from 'react-youtube';
import Footer from "../footer/footer";

const TrailerPage = () => {
  const videoId = 'nbp3Ra3Yp74'; 
  const opts = {
    height: '343.53',
    width: '826.55',
    playerVars: {
      autoplay: 0, 
    },
  };

  return (
    <div>
      <Header />
      <h3 className='TrailerHeader'>Now Playing</h3>
      <section className='TrailerPage'>
        <div className='TrailerHeading'>
          <h1>Avengers</h1> <span> | 10/1/2023 | </span> <span> HD </span>
        </div>
        <div className='container'>
          {/* react-youtube component with the videoId and opts */}
          <YouTube videoId={videoId} opts={opts} />
          <div className='para'>
            <h3>Date : Today</h3>
            <p>Very Good movie</p>
            <p>Thanos kills in a snap</p>
          </div>
          <div className='social'>
            <h3>Share : </h3>
            <img src='https://img.icons8.com/color/48/000000/facebook-new.png' alt='Facebook' />
            <img src='https://img.icons8.com/fluency/48/000000/twitter-circled.png' alt='Twitter' />
            <img src='https://img.icons8.com/fluency/48/000000/linkedin-circled.png' alt='LinkedIn' />
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default TrailerPage;
