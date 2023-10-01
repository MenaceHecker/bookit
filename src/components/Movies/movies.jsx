import React from 'react'
import "./movies.css"
import Data from './Data'
const movies = () => {
  return (
    <section id="now_showing">
        <h5 className='title'>Now Showing</h5>
    <div className='container movie__container'>
    {
        Data.map(({id,poster,title,cast,desc,trailer}) => {
                return(
                    <article key={id} className='movie__item'>
                        <div className='movie__item-image'>
                        <img className='movie_poster' src={poster} alt={title} />
                        </div>
                        <h4 className='title'>{title}</h4>
                        <h3>Cast: {cast}</h3>
                        <h3>{desc}</h3>
                        <div className='movie__item-trailer'>
                            <button href={trailer}>Watch Trailer</button>
                        </div>
                    </article>
                    )}        
        )
    }

    </div>
    </section>
  )
}

export default movies