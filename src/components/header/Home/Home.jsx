import React from 'react'
import video from "../../../assets/trailer.mp4"
import './Home.css'
function Home () {
    return (
        <div className='bgContainer'>
            <div className='overlay'>
                <video src={video} autoPlay loop muted/>
                <div className='containervid'>
                    <h3 className='title'>Avengers Infinity Wars </h3>
                    <h1 className='Status'>Now playing</h1>
                    <div className='btnContainer'>
                    <button href='https://www.youtube.com/watch?v=6ZfuNTqbHE8&t=1s&ab_channel=MarvelEntertainment' className='btn'>Watch Trailer</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home