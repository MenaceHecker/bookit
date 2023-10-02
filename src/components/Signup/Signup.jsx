import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import Header from '../header/header';
function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
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
      password: '',
      password2: '',
    });
    navigate('/activate');
  };

  const onClose = () => {
    navigate(-1);
  };

  return (
    <>
      <Header/>
      <div className="center_title">Sign Up</div>

      <div className="signup_form">
        <form onSubmit={handleSubmit} className="signup_container">
          <div className="signup_form_row">
            <label>
              Email address:
              <br/>
              <input type="text" name="email" value={formData.email} onChange={handleInputChange}/>
            </label>
          </div>

          <div className="signup_form_row">
            <label>
              Password:
              <br/>
              <input type="password" name="password" value={formData.password} onChange={handleInputChange}/>
            </label>
          </div>

          <div className="signup_form_row">
            <label>
              Repeat password:
              <br/>
              <input type="password" name="password2" value={formData.password2} onChange={handleInputChange}/>
            </label>
          </div>

          <div className="signup_button_row">
            <button type="submit">Sign Up</button>
            <button type="button" className="cancel_signup" onClick={onClose}>Back</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;
