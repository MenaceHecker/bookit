import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import Header from '../header/header';
import Footer from "../footer/footer";

function Login() {
  const navigate = useNavigate();
  const [isUp, setIsUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fail: false,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const onClose = () => {
    navigate(-1);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://198.251.67.241:8080/api/login?email=' +
          formData.email + '&password=' + formData.password, {
        method: 'GET',
      });
  
      if (!response.ok) {
        console.error('Login failed');
        setIsUp(true);
      } else {
        const data = await response.json();
        console.log(data);
        localStorage.setItem('sessionId', data.sessionId);
        localStorage.setItem('isPriveleged', data.isPrivileged);
        localStorage.setItem('email', formData.email)
        console.log('Login successful:', data);
        // Handle the successful case here
        if (formData.email === 'bookit@example.com') {
          navigate('/ManageMovies');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle the error case here
    }
  };

  return (
    <>
      <Header/>
      <div className="login_center_title">Log In</div>

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
          <div>{isUp && <label>Invalid</label>}</div>
          <div>
            <Link to="/ForgotPassword">Forgot your Password?</Link>
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
