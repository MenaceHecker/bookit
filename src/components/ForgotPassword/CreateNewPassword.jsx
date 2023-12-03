import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CreateNewPassword.css';
import Header from '../header/header';
import Footer from '../footer/footer';
import { APIContext } from '../../utils/API';

function CreateNewPassword() {
  const api = useContext(APIContext);
  const navigate = useNavigate();
  const { search } = useLocation();
  
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmNewPassword:'',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const loginWithPasswordToken = async (token, newPassword) => {
    try {
      const response = await api.loginWithPasswordToken(token, newPassword);
      if (!response.ok) {
        console.error(response.message);
        return;        
      }
      const data = await response.data;
      setFormData({
        newPassword: '',
        confirmNewPassword:'',
      });
      localStorage.setItem('sessionId', data.sessionId);
      localStorage.setItem('isPrivileged', +data.isPrivileged);
      if (data.isPrivileged) {
        navigate('/ManageMovies');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    if (formData.newPassword !== formData.confirmNewPassword) {
      console.error("Passwords don't match");
      return;
    }
    const token = new URLSearchParams(search).get('token');
    if (token === null) {
      console.error('Missing token in URL');
      return;
    }
    loginWithPasswordToken(token, formData.newPassword);
  };

  const onClose = () => {
    navigate('/Login');
  };

  return (
    <>
      <Header/>
            <div className="create_password_center_title">Reset Password</div>
            <div className="create_password_form">
                <form onSubmit={handleSubmit} className="create_password_container">


                    <div className="create_password_form_row">
                        <label>
                            New Password:
                            <br/>
                            <input type="text" name="newPassword" value={formData.newPassword} onChange={handleInputChange}/>
                        </label>
                    </div>

                    <div className="create_password_form_row">
                        <label>
                            Confirm New Password:
                            <br/>
                            <input type="text" name="confirmNewPassword" value={formData.confirmNewPassword} onChange={handleInputChange}/>
                        </label>
                    </div>

        
                    <div className="create_password_button_row">
                        <button type="submit">Send</button>
                        <button type="button" className="cancel_create" onClick={onClose}>Cancel</button>
                    </div>

                </form>
            </div>
      <Footer/>
    </>
  );
}

export default CreateNewPassword;
