import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Activate.css';
import Header from '../header/header';
import Footer from "../footer/footer";

function Activate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    code: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({
      code: '',
    });
    navigate('/');
  };

  const onClose = () => {
    navigate(-1);
  };

  const sendNewCode = () => {
    console.log('Requested new code');
  }

  return (
    <>
      <Header/>
      <div className="center_title">Activate Account</div>

      <div className="activate_form">
        <form onSubmit={handleSubmit} className="activate_container">
          <div>A 6-letter code has been sent to your email address.</div>
          <div>Please enter the code to activate your account.</div>

          <div className="activate_form_row">
              <input type="text" name="code" value={formData.code} onChange={handleInputChange}/>
          </div>

          <div className="activate_button_row">
            <button type="submit">Activate</button>
            <button type="button" className="cancel_activate" onClick={onClose}>Back</button>
          </div>

          <div>
            If you did not receive a code, then you can <a href="#" onClick={sendNewCode}>send another code</a>.
          </div>
        </form>
      </div>
      <Footer/>
    </>
  );
}

export default Activate;
