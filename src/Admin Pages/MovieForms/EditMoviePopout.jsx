import '../Table/Table.css';
import './EditMoviePopout.css';
import React, { useState, useEffect, useContext } from 'react';
import { APIContext, useApiData } from '../../utils/API';

const EditMoviePopout = ({ onClose, movieData } ) => {
  //pass "data here"
  const api = useContext(APIContext);
    //const [isPopoutOpen, setIsPopoutOpen] = useState(false);
    useEffect(() => {
      console.log('Movie Data received:', movieData);
      if (movieData) {
        setFormData({
          
          movieTitle: movieData.movieTitle,
          movieCategory: movieData.movieCategory,
          movieCast: movieData.movieCast,
          movieDirector: movieData.movieDirector,
          movieProducer: movieData.movieProducer,
          movieSynopsis: movieData.movieSynopsis,
          movieReviews: movieData.movieReviews,
          movieTrailerPicture: movieData.movieTrailerPicture,
          movieTrailerVideo: movieData.movieTrailerVideo,
          movieMpaaRating: movieData.movieMpaaRating,
          movieShowDates: movieData.movieShowDates,
          movieShowTimes: movieData.movieShowTimes,
       
        });
      }
    }, [movieData]);


    const [formData, setFormData] = useState({
     
      movieTitle: '',
      movieCategory: '',
      movieCast: '',
      movieDirector: '',
      movieProducer: '',
      movieSynopsis: '',
      movieReviews: '',
      movieTrailerPicture: '',
      movieTrailerVideo: '',
      movieMpaaRating: '',
      movieShowDates: '',
      movieShowTimes: '',
      });
     
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
          ...prevFormData,
          [name]: value,
        }));
      };
      
      const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log('Form submitted:', formData);
        setFormData({
          
          movieTitle: '',
          movieCategory: '',
          movieCast: '',
          movieDirector: '',
          movieProducer: '',
          movieSynopsis: '',
          movieReviews: '',
          movieTrailerPicture: '',
          movieTrailerVideo: '',
          movieMpaaRating: '',
          movieShowDates: '',
          movieShowTimes: '',
        });

      
        try {

          const submitData = {
          
            movieTitle: formData.movieTitle,
            movieCategory: formData.movieCategory,
            movieCast: formData.movieCast,
            movieDirector: formData.movieDirector,
            movieProducer: formData.movieProducer,
            movieSynopsis: formData.movieSynopsis,
            movieReviews: formData.movieReviews,
            movieTrailerPicture: formData.movieTrailerPicture,
            movieTrailerVideo: formData.movieTrailerVideo,
            movieMpaaRating: formData.movieMpaaRating,
            movieShowDates: formData.movieShowDates,
            movieShowTimes: formData.movieShowTimes,
          };
          
          const response = await api.updateMovie(submitData);
          if (response.ok) {
            const movieDataResponse = response.message;
            console.log('Form submitted successfully!', movieDataResponse);
            onClose();
          } else {
            console.error('Error submitting form:', response.message);
          }
        } catch (error) {
          console.error('Error:', error);
        }

      };
    
      const handleClose = () => {
        onClose();
        // close button logic here, close form
      };

    return (
      
        
          
            <div className="edit_movie_form">
              <form onSubmit={handleSubmit} className="edit_form_container">
               Edit Movie
                <div className="edit_form_row">
                  <label>
                  
                    Title:
                    <br />
                    <input type="text" name="movieTitle" value={formData.movieTitle} onChange={handleInputChange} />
                  </label>
        
                  <label>
                    Category:
                    <br />
                    <input type="text" name="movieCategory" value={formData.movieCategory} onChange={handleInputChange} />
                  </label>
                </div>
        
                <div className="edit_form_row">
                  <label>
                    Cast:
                    <br />
                    <input type="text" name="movieCast" value={formData.movieCast} onChange={handleInputChange} />
                  </label>
        
                  <label>
                    Director:
                    <br />
                    <input type="text" name="movieDirector" value={formData.movieDirector} onChange={handleInputChange} />
                  </label>
                </div>
        
                <div className="edit_form_row">
                  <label>
                    Producer:
                    <br />
                    <input type="text" name="movieProducer" value={formData.movieProducer} onChange={handleInputChange} />
                  </label>
        
                  <label>
                    MPAA Rating:
                    <br />
                    <input type="text" name="movieMpaaRating" value={formData.movieMpaaRating} onChange={handleInputChange} />
                  </label>
                </div>
        
                <div className="edit_form_row">
                  <label>
                    Synopsis:
                    <br />
                    <textarea name="movieSynopsis" value={formData.movieSynopsis} onChange={handleInputChange} />
                  </label>
                </div>
        
                <div className="edit_form_row">
                  <label>
                    Reviews:
                    <br />
                    <textarea name="movieReviews" value={formData.movieReviews} onChange={handleInputChange} />
                  </label>
                </div>
        
                <div className="edit_form_row">
                  <label>
                    Trailer Picture:
                    <br />
                    <input type="text" name="movieTrailerPicture" value={formData.movieTrailerPicture} onChange={handleInputChange} />
                  </label>
        
                  <label>
                    Trailer Video:
                    <br />
                    <input type="text" name="movieTrailerVideo" value={formData.movieTrailerVideo} onChange={handleInputChange} />
                  </label>
                </div>
        
                <div className="edit_form_row">
                  <label>
                    Show Date:
                    <br />
                    <input type="date" name="movieShowDate" value={formData.movieShowDates} onChange={handleInputChange} />
                  </label>
                </div>
  
  
                <div className="edit_form_row">
                  <label>
                    Show Time:
                    <br />
                    <input type="time" name="movieShowTime" value={formData.movieShowTimes} onChange={handleInputChange} />
                  </label>
                </div>
  
  
                <div className = "edit_button_row">
                  <button type="submit">Submit</button>
                  <button className= "close_button" onClick={handleClose}>Close</button>
                </div>
              </form>
              
            </div>
    );
};

export default EditMoviePopout;

