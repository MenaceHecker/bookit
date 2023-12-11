
import './EditUserForm.css';
import React, { useState } from 'react';

const EditUserForm = ({onClose}) => {
    
        const [formData, setFormData] = useState({
          email: '',
          firstName: '',
          lastName: '',
          //verificationStatus: '',
          password: '',
          type: '', //customer or administrator
          wantsPromotions: '',
          
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
          <div className="edit_user_form">
            <form onSubmit={handleSubmit} className="edit_user_form_container">
            
              <div className="edit_user_form_row">
                <label>
        
                  Email:
                  <br />
                  <input type="text" name="email" value={formData.email} onChange={handleInputChange} />
                </label>
      
                <label>
                  First Name:
                  <br />
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                </label>
              </div>
      
              <div className="edit_user_form_row">
                <label>
                  Last Name:
                  <br />
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                </label>
      
                
                <label>
                  Subscribe/Unsubscribe to promotions?
                  <input type="checkbox" name="wantsPromotions" checked={formData.wantsPromotions} onChange={handleInputChange}/>
                </label>
              </div>

              <div className="edit_user_form_row">
                <label>
                  Type:
                  <br />
                  <input type="text" name="type" value={formData.type} onChange={handleInputChange} />
                </label>
      
                
              </div>

              <div className = "edit_user_button_row">
                <button type="submit">Submit</button>
                <button type = "button" onClick={handleClose}>Close</button>
              </div>
            </form>
            
          </div>
        );
      };
export default EditUserForm;
