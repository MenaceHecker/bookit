import './EditUserForm.css';
import React, {useContext, useState} from 'react';
import {APIContext} from "../../utils/API";

const EditUserForm = ({onClose, selected}) => {
    const api = useContext(APIContext);
        const [formData, setFormData] = useState({
          firstName: selected.firstName,
          lastName: selected.lastName,
            address: selected.address,
          phoneNumber: selected.phoneNumber,
          wantsPromotions: selected.wantsPromotions,
            suspended: selected.suspended,
        });

        const handleInputChange = (e) => {
          const { name, value } = e.target;
          setFormData({ ...formData, [name]: value });
        };
      
        const handleSubmit = async (e) => {
          e.preventDefault();
            try {
                console.log(formData);
                const response = await api.updateTargetUser(selected.id,formData);
                console.log(response);
                onClose();
                if (!response.ok) {
                    console.error(response.message);
                }
            } catch (err) {
                console.error(err);
            }
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
                  First Name:
                  <br />
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                </label>
                  <label>
                      Subscribe/Unsubscribe to promotions?
                      <input type="checkbox" name="wantsPromotions" checked={formData.wantsPromotions} onChange={handleInputChange}/>
                  </label>
              </div>
      
              <div className="edit_user_form_row">
                <label>
                  Last Name:
                  <br />
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                </label>
              </div>
                  <div className="edit_user_form_row">
                  <label>

                      Address:
                      <br />
                      <input type="text" name="address" value={formData.address} onChange={handleInputChange} />

                  </label>
                      <label>
                          Suspended
                          <input type="checkbox" name="suspended" checked={formData.suspended} onChange={handleInputChange}/>
                      </label>
                  </div>
                  <div className="edit_user_form_row">
                  <label>
                      Phone Number:
                      <br/>
                      <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange}/>
                  </label>
                  </div>

              <div className="edit_user_form_row">


                
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
