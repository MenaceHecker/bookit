import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import Header from '../header/header';
import Footer from "../footer/footer";
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [isUp, setIsUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    const url = 'http://198.251.67.241:8080/api/login?email=bookit@example.com&password=bookit';
    console.log('Request URL:', url); // Print the URL before making the request
    try {
      const response = await axios.post(url, {
        email,
        password,
      });
      const sessionId = response.data;
      // Save the session ID to local storage
      localStorage.setItem('sessionId', sessionId);
  
      // Handle the successful case here
      console.log('Login successful:', response.data);
      navigate('/');
    } catch (error) {
      // Handle the error case here
      console.error('An error occurred:', error);
      setIsUp(true);
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
