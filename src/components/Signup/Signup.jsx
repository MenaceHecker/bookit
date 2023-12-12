import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Signup.css';
import Header from '../header/header';
import Footer from '../footer/footer';
import { APIContext } from '../../utils/API';

const Signup = () => {
  const api = useContext(APIContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Error: Passwords do not match');
      return;
    }

    try {
      const userRegistrationResponse = await api.createCustomer(formData);

      if (userRegistrationResponse.ok) {
        toast.success('Signed up');
        navigate('/Activate');
      } else {
        toast.error(`Error: ${userRegistrationResponse.message}`);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error('An unexpected error occurred. Please try again.');
    }
  };

  const onClose = () => {
    navigate(-1);
  };

  return (
    <>
      <Header />
      <div className="signup_center_title">Sign Up</div>

      <div className="signup_form">
        <form onSubmit={handleSubmit} className="signup_container">
          <div>
            <h2 className="signup_form_title">Personal Information</h2>
            <div className="signup_form_row">
              <div className="signup_column">
                <label>
                  First Name:<span className="asterisk">*</span>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="FirstName"
                    required
                  />
                </label>
              </div>
              <div className="signup_column">
                <label>
                  Last Name:<span className="asterisk">*</span>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="LastName"
                    required
                  />
                </label>
              </div>
            </div>
            <div className="signup_form_row">
              <div className="signup_column">
                <label>
                  Phone Number:<span className="asterisk">*</span>
                  <input
                    type="number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                  />
                </label>
              </div>
              <div className="signup_column">
                <label>
                  Email address:<span className="asterisk">*</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                  />
                </label>
              </div>
            </div>
            <div className="signup_form_row">
              <div className="signup_column">
                <label>
                  Password:<span className="asterisk">*</span>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="signup_column">
                <label>
                  Confirm Password:<span className="asterisk">*</span>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
            </div>
            <div className="signup_form_row">
              <div className="signup_column">
                <label>
                  Sign up for promotions:
                  <input
                    type="checkbox"
                    name="promotions"
                    //checked={formData.promotions}
                    //onChange={handleChange}
                  />
                </label>
              </div>
              <p className="required_fields">* Required Fields</p>
            </div>
            <button type="button" onClick={onClose}>
              Close
            </button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
