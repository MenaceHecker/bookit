// AddMoviePopup.js
import '../Table/Table.css';
import './MovieForm.css';
import React, { useState } from 'react';


const AddMoviePopout = ({setShowPopout }) => {
    
        const [formData, setFormData] = useState({
          title: '',
          category: '',
          cast: '',
          director: '',
          producer: '',
          synopsis: '',
          reviews: '',
          trailerPicture: '',
          trailerVideo: '',
          mpaaRating: '',
          showDates: '',
          showTimes: '',
        });
      
        const handleInputChange = (e) => {
          console.log('Input changed:', e.target.name, e.target.value);
          const { name, value } = e.target;
          setFormData(prevState => ({ ...prevState })); // Dummy update to trigger re-render
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
                  <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
                </label>
      
                <label>
                  Category:
                  <br />
                  <input type="text" name="category" value={formData.category} onChange={handleInputChange} />
                </label>
              </div>
      
              <div className="form_row">
                <label>
                  Cast:
                  <br />
                  <input type="text" name="cast" value={formData.cast} onChange={handleInputChange} />
                </label>
      
                <label>
                  Director:
                  <br />
                  <input type="text" name="director" value={formData.director} onChange={handleInputChange} />
                </label>
              </div>
      
              <div className="form_row">
                <label>
                  Producer:
                  <br />
                  <input type="text" name="producer" value={formData.producer} onChange={handleInputChange} />
                </label>
      
                <label>
                  MPAA Rating:
                  <br />
                  <input type="text" name="mpaaRating" value={formData.mpaaRating} onChange={handleInputChange} />
                </label>
              </div>
      
              <div className="form_row">
                <label>
                  Synopsis:
                  <br />
                  <textarea name="synopsis" value={formData.synopsis} onChange={handleInputChange} />
                </label>
              </div>
      
              <div className="form_row">
                <label>
                  Reviews:
                  <br />
                  <textarea name="reviews" value={formData.reviews} onChange={handleInputChange} />
                </label>
              </div>
      
              <div className="form_row">
                <label>
                  Trailer Picture:
                  <br />
                  <input type="text" name="trailerPicture" value={formData.trailerPicture} onChange={handleInputChange} />
                </label>
      
                <label>
                  Trailer Video:
                  <br />
                  <input type="text" name="trailerVideo" value={formData.trailerVideo} onChange={handleInputChange} />
                </label>
              </div>
      
              <div className="form_row">
                <label>
                  Show Date:
                  <br />
                  <input type="date" id = "date" name="showDate" value={formData.showDates} onChange={handleInputChange}/>
                </label>
              </div>


              <div className="form_row">
                <label>
                  Show Time:
                  <br />
                  <input type="time" name="showTime" value={formData.showTimes} onChange={handleInputChange} />
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
