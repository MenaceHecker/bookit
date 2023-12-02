import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';
import Header from '../header/header';
import Footer from '../footer/footer';
import { APIContext } from '../../utils/API';

function ForgotPassword() {
  const api = useContext(APIContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendPasswordToken = async (email) => {
    const url = new URL('http://198.251.67.241:8080/api/sendPasswordToken');
    url.searchParams.append('email', email);
    try {
      const response = await fetch(url);
      if (!response.ok)
        console.error(await response.text());
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    sendPasswordToken(formData.email);
    setFormData({
      email: '',
    });
    
  };

  const onClose = () => {
    navigate('/Login');
  };

  
  const sendNewEmail = (e) => {
    e.preventDefault();
    console.log('Requested new email');
    
  }

  return (
    <>
      <Header/>
            <div className="forgot_password_center_title">Forgot Password</div>
            <div className="forgot_password_form">
                <form onSubmit={handleSubmit} className="forgot_password_container">

                    <div className="forgot_password_form_row">
                        <label>
                            Email address:
                            <br/>
                            <input type="text" name="email" value={formData.email} onChange={handleInputChange}/>
                        </label>
                    </div>

        
                    <div className="forgot_password_button_row">
                        <button type="submit">Send</button>
                        <button type="button" className="cancel_login" onClick={onClose}>Cancel</button>
                    </div>

                    <div>
                        If you did not receive an email, then you can <a href="/#" onClick={sendNewEmail}>send another email</a>.
                    </div>
                
                </form>
            </div>
      <Footer/>
    </>
  );
}

export default ForgotPassword;
