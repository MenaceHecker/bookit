
import './AddUserForm.css';
import React, {useContext, useState} from 'react';
const AddUserForm = ({setShowPopout }) => {
        const [formData, setFormData] = useState({
          email: '',
          firstName: '',
          lastName: '',
          password: '',
          // verificationStatus: '',
          type: '', //customer or administrator
          wantsPromotions: false,//wants promotions
  
        });
      //
        const handleInputChange = (e) => {
          const { name, value } = e.target;
          setFormData({ ...formData, [name]: value });
        };
      
        const handleSubmit = async (e) => {
          e.preventDefault();
          console.log('Form submitted:', formData);
          // form submission logic here, put in database
        };
      
        const onClose = () => {
          setShowPopout(false);
          // close button logic here, close form
        };

        return (
          <div className="user_form">
            <form onSubmit={handleSubmit} className="user_form_container">
            
              <div className="user_form_row">
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
      
              <div className="user_form_row">
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

              <div className="user_form_row">
                <label>
                  Type:
                  <br />
                  <input type="text" name="type" value={formData.type} onChange={handleInputChange} />
                </label>
      
                
              </div>

              <div className = "user_button_row">
                <button type="submit">Submit</button>
                <button type = "button" onClick={onClose}>Close</button>
              </div>
            </form>
            
          </div>
        );
      };
export default AddUserForm;
