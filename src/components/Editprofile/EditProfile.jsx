import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './EditProfile.css';
import Header from '../header/header';
import Footer from "../footer/footer";
function EditProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    subscribe: 'off',
    password: '',
    password2: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({
      email: '',
      subscribe: 'off',
      password: '',
      password2: '',
    });
  };

  const onClose = () => {
    navigate(-1);
  };

  return (
    <>
      <Header/>
      <div className="edit_profile_center_title">Edit Profile</div>

      <div className="edit_profile_form">
        <form onSubmit={handleSubmit} className="edit_profile_container">
          <div className="edit_profile_form_row">
            <label>
              Email address:
              <br/>
              <input type="text" name="email" value={formData.email} onChange={handleInputChange}/>
            </label>
          </div>

          <div className="edit_profile_form_row">
            <label>
              Subscribe to promotions?{' '}
              <input type="checkbox" name="subscribe" value={formData.subscribe} onChange={handleInputChange}/>
            </label>
          </div>

          <hr/>

          <div className="edit_profile_form_row">
            <label>
              New password:
              <br/>
              <input type="password" name="password" value={formData.password} onChange={handleInputChange}/>
            </label>
          </div>

          <div className="edit_profile_form_row">
            <label>
              Confirm new password:
              <br/>
              <input type="password" name="password" value={formData.password2} onChange={handleInputChange}/>
            </label>
          </div>

          <div className="edit_profile_button_row">
            <button type="submit">Save Changes</button>
            <button type="button" className="cancel_edit_profile" onClick={onClose}>Exit</button>
          </div>
        </form>
      </div>
      <Footer/>
    </>
  );
}

export default EditProfile;
