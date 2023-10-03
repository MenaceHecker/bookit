// AddMoviePopup.js
import '../Table/Table.css';
import './MovieForm.css';
import React, { useState } from 'react';


const AddMoviePopout = ({setShowPopout }) => {
    
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
          console.log('Input changed:', e.target.name, e.target.value);
          const { name, value } = e.target;
          if (name === 'showDate') {
            // Handle date input
            setFormData({ ...formData, [name]: value });
          } else if (name === 'showTime') {
            // Handle time input
            setFormData({ ...formData, [name]: value });
          } else {
            // Handle other inputs
            setFormData({ ...formData, [name]: value });
          }
        };
        
      
        const handleSubmit = async (e) => {
          e.preventDefault();
        
          try {
            const response = await fetch('http://198.251.67.241:8080/api/newmovie', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData)
            });
        
            if (response.ok) {
              const data = await response.json(); // This line parses the response body as JSON
        
              // Handle success, e.g., show a success message
              console.log('Form submitted successfully!', data);
            } else {
              // Handle errors, e.g., show an error message
              console.error('Error submitting form:', response.statusText);
            }
          } catch (error) {
            console.error('Error:', error);
          }
        };
        
      //http://198.251.67.241:8080/api/newmovie
      const handleClose = () => {
        setShowPopout(false); // Call the setShowPopout function from ManageMovies
      };
    
        return (
          <div className="movie_form">
            <form onSubmit={handleSubmit} className="form_container">
            
              <div className="form_row">
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
      
              <div className="form_row">
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
      
              <div className="form_row">
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
      
              <div className="form_row">
                <label>
                  Synopsis:
                  <br />
                  <textarea name="movieSynopsis" value={formData.movieSynopsis} onChange={handleInputChange} />
                </label>
              </div>
      
              <div className="form_row">
                <label>
                  Reviews:
                  <br />
                  <textarea name="movieReviews" value={formData.movieReviews} onChange={handleInputChange} />
                </label>
              </div>
      
              <div className="form_row">
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
      
              <div className="form_row">
                <label>
                  Show Date:
                  <br />
                  <input type="date" id = "date" name="movieShowDates" value={formData.movieShowDates} onChange={handleInputChange}/>
                </label>
              </div>


              <div className="form_row">
                <label>
                  Show Time:
                  <br />
                  <input type="time" name="movieShowTimes" value={formData.movieShowTimes} onChange={handleInputChange} />
                </label>
              </div>


              <div className = "button_row">
                <button type="submit">Submit</button>
                <button className= "close_button" onClick={handleClose}>Close</button>
              </div>
            </form>
            
          </div>
        );
      };
export default AddMoviePopout;
