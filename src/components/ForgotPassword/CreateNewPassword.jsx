import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateNewPassword.css';
import Header from '../header/header';
import Footer from "../footer/footer";

function CreateNewPassword() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    confirmNewPassword:'',
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
        newPassword: '',
        confirmNewPassword:'',
    });
    navigate('/Login');
  };

  const onClose = () => {
    navigate('/Login');
  };

  return (
    <>
      <Header/>
            <div className="create_password_center_title">Create New Password</div>
            <div className="create_password_form">
                <form onSubmit={handleSubmit} className="create_password_container">


                    <div className="create_password_form_row">
                        <label>
                            Email:
                            <br/>
                            <input type="text" name="email" value={formData.email} onChange={handleInputChange}/>
                        </label>
                    </div>
                
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
