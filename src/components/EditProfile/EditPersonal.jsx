import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditPersonal.css';
import { APIContext, useApiData } from '../../utils/API';

function EditPersonal() {
  const api = useContext(APIContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // api/mpc
    firstName: '',
    lastName: '',
    wantsPromotions: false,
    // api/updatePassword
    password: '',
    password2: '',
  });

  useApiData(async (api) => {
    try {
      const response = await api.getCurrentUser();

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const userData = response.data;

      // Update the placeholder text with data from the backend
      document.getElementById('firstNameInput').placeholder = userData.firstName;
      document.getElementById('lastNameInput').placeholder = userData.lastName;

      setFormData({
        firstName: userData.firstName,
        lastName: userData.lastName,
        wantsPromotions: userData.wantsPromotions,
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  });

  const handleInputChange = (e) => {
    const { type, name } = e.target;
    const value = type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    //update password
    try {
      const response = await api.updatePassword(formData.password, formData.password2);

      if (!response.ok) {
        console.error('error with password');
      } else {
        const sid = response.message;
        console.log('error', sid);

        // Handle the successful case here
        // navigate('/');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle the error case here
    }

    //update first name, last name, and subscription.
    try {
      const response = await api.updateProfile(formData);

      if (!response.ok) {
        console.error('error with mpc');
      } else {
        const sid = response.message;
        console.log('error', sid);

        // Handle the successful case here
        // navigate('/');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle the error case here
    }



    // setFormData({
    //   email: '',
    //   subscribe: 'off',
    //   password: '',
    //   password2: '',
    // });
  };


  

  const onClose = () => {
    navigate(-1);
  };

  return (
    <>
      
      

      <div className="edit_personal_form">
        
        <form onSubmit={handleSubmit} className="edit_personal_container">
        <div className="edit_personal_center_title">Edit Personal Information</div>
          
          <div className="edit_personal_form_row">
            <label>
              First Name:
              <br/>
              <input type="text" name="firstName"  id="firstNameInput" value={formData.firstName} onChange={handleInputChange}/>
            </label>
          </div>

          <div className="edit_personal_form_row">
            <label>
              Last Name:
              <br/>
              <input type="text" name="lastName" id="lastNameInput" value={formData.lastName} onChange={handleInputChange}/>
            </label>
          </div>

          <div className="edit_personal_form_row">
            <label>
              Subscribe/Unsubscribe to promotions?
              <input type="checkbox" name="wantsPromotions" checked={formData.wantsPromotions} onChange={handleInputChange}/>
            </label>
          </div>

          <hr/>

          <div className="edit_personal_form_row">
            <label>
              Old Password:
              <br/>
              <input type="password" name="password" value={formData.password} onChange={handleInputChange}/>
            </label>
          </div>

          <div className="edit_personal_form_row">
            <label>
              New Password:
              <br/>
              <input type="password" name="password2" value={formData.password2} onChange={handleInputChange}/>
            </label>
          </div>

          <div className="edit_personal_button_row">
            <button type="submit">Save Changes</button>
            <button type="button" className="cancel_edit_personal" onClick={onClose}>Exit</button>
          </div>
        </form>
      </div>
     
    </>
  );
}

export default EditPersonal;
