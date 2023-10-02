import '../Table/Table.css';
import './EditMoviePopout.css';
import React, { useState } from 'react';

const EditMoviePopout = ({ onClose } ) => {

    //const [isPopoutOpen, setIsPopoutOpen] = useState(false);

    const [formData, setFormData] = useState({
        newTitle: '',
        newCategory: '',
        newCast: '',
        newDirector: '',
        newProducer: '',
        newSynopsis: '',
        newReviews: '',
        newTrailerPicture: '',
        newTrailerVideo: '',
        newMpaaRating: '',
        newShowDates: '',
        newShowTimes: ''
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // form submission logic here, put in database
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
                    <input type="text" name="title" value={formData.newTitle} onChange={handleInputChange} />
                  </label>
        
                  <label>
                    Category:
                    <br />
                    <input type="text" name="category" value={formData.newCategory} onChange={handleInputChange} />
                  </label>
                </div>
        
                <div className="edit_form_row">
                  <label>
                    Cast:
                    <br />
                    <input type="text" name="cast" value={formData.newCast} onChange={handleInputChange} />
                  </label>
        
                  <label>
                    Director:
                    <br />
                    <input type="text" name="director" value={formData.newDirector} onChange={handleInputChange} />
                  </label>
                </div>
        
                <div className="edit_form_row">
                  <label>
                    Producer:
                    <br />
                    <input type="text" name="producer" value={formData.newProducer} onChange={handleInputChange} />
                  </label>
        
                  <label>
                    MPAA Rating:
                    <br />
                    <input type="text" name="mpaaRating" value={formData.newMpaaRating} onChange={handleInputChange} />
                  </label>
                </div>
        
                <div className="edit_form_row">
                  <label>
                    Synopsis:
                    <br />
                    <textarea name="synopsis" value={formData.newSynopsis} onChange={handleInputChange} />
                  </label>
                </div>
        
                <div className="edit_form_row">
                  <label>
                    Reviews:
                    <br />
                    <textarea name="reviews" value={formData.newReviews} onChange={handleInputChange} />
                  </label>
                </div>
        
                <div className="edit_form_row">
                  <label>
                    Trailer Picture:
                    <br />
                    <input type="text" name="trailerPicture" value={formData.newTrailerPicture} onChange={handleInputChange} />
                  </label>
        
                  <label>
                    Trailer Video:
                    <br />
                    <input type="text" name="trailerVideo" value={formData.newTrailerVideo} onChange={handleInputChange} />
                  </label>
                </div>
        
                <div className="edit_form_row">
                  <label>
                    Show Date:
                    <br />
                    <input type="date" name="showDate" value={formData.newShowDates} onChange={handleInputChange} />
                  </label>
                </div>
  
  
                <div className="edit_form_row">
                  <label>
                    Show Time:
                    <br />
                    <input type="time" name="showTime" value={formData.newShowTimes} onChange={handleInputChange} />
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