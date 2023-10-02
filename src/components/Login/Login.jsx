import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import Header from '../header/header';
import Footer from "../footer/footer";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    });
    navigate('/');
  };

  const onClose = () => {
    navigate(-1);
  };

  return (
    <>
      <Header/>
      <div className="center_title">Log In</div>

      <div className="login_form">
        <form onSubmit={handleSubmit} className="login_container">
          <div className="login_form_row">
            <label>
              Email address:
              <br/>
              <input type="text" name="email" value={formData.email} onChange={handleInputChange}/>
            </label>
          </div>

          <div className="login_form_row">
            <label>
              Password:
              <br/>
              <input type="password" name="password" value={formData.password} onChange={handleInputChange}/>
            </label>
          </div>

          <div className="login_button_row">
            <button type="submit">Log In</button>
            <button type="button" className="cancel_login" onClick={onClose}>Cancel</button>
          </div>

          <div>
            Don’t have an account? <Link to="/Signup">Sign up!</Link>
          </div>
        </form>
      </div>
      <Footer/>
    </>
  );
}

export default Login;
