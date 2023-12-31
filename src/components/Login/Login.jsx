import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Login.css';
import Header from '../header/header';
import Footer from '../footer/footer';
import { SessionContext } from '../../utils/Session';

function Login() {
  const session = useContext(SessionContext);
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
      const response = await session.login(formData.email, formData.password);
      if (!response.ok) {
        toast.error(`Error: ${response.message}`);
        setIsUp(true);
      } else {
        const data = response.data;
        toast.success('Logged in');
        // Handle the successful case here
        if (data.privileged) {
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
