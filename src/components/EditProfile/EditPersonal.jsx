import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditPersonal.css';
import axios from 'axios';
function EditPersonal() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    //subscribe: '',
    password: '',
    password2: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // + '&wantsPromotions=' + formData.subscribe


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log('Form submitted:', formData);
  //   try {
  //     const response = await fetch('http://198.251.67.241:8080/api/mpc' + '?email=' +
  //     localStorage.email + '&sid=' + localStorage.sessionId + '&pChange=' + formData.password2 + '&ufChange='
  //         + formData.firstName + '&ulChange=' + formData.lastName,
  //         {
  //       method: 'GET',
  //     });

  //     if (!response.ok) {
  //       console.error('joe');
  //     } else {
  //       const sid = await response.text();
  //       console.log('joe', sid);

  //       // Handle the successful case here
  //       navigate('/');
  //     }
  //   } catch (error) {
  //     console.error('An error occurred:', error);
  //     // Handle the error case here
  //   }
  //   // setFormData({
  //   //   email: '',
  //   //   subscribe: 'off',
  //   //   password: '',
  //   //   password2: '',
  //   // });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    try {
      const response = await fetch('http://198.251.67.241:8080/api/updatePassword?' + '&sid=' + localStorage.sessionId + '&oldPassword=' + formData.password + '&newPassword='
          + formData.password2 ,
          {
        method: 'GET',
      });

      if (!response.ok) {
        console.error('error');
      } else {
        const sid = await response.text();
        console.log('error', sid);

        // Handle the successful case here
        navigate('/');
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
              <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange}/>
            </label>
          </div>

          <div className="edit_personal_form_row">
            <label>
              Last Name:
              <br/>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange}/>
            </label>
          </div>

          <div className="edit_personal_form_row">
            <label>
              Subscribe/Unsubscribe to promotions?
              <input type="checkbox" name="subscribe" value={formData.subscribe} onChange={handleInputChange}/>
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
