import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import Header from '../header/header';
import Footer from "../footer/footer";


const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e) => {
    console.log(e);
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

//  verification code should be sent to user's email address upon registration
const handleSubmit = async (e) => {
  e.preventDefault();
  if (formData.password !== formData.confirmPassword) {
    console.log("Passwords do not match");
    return;
  }

  try {
    const response = await fetch('http://198.251.67.241:8080/api/add' +
        '?firstName=' + formData.firstName + '&lastName=' + formData.lastName
        + '&password=' + formData.password + '&email=' + formData.email + '&address=' + formData.address + '&phoneNumber=' + formData.phoneNumber, {
      method: 'GET',
    });
    if (!response.ok) {
      console.error('Failed to add a new user');
      // Display a toast or an alert message to inform the user that the registration failed
    } else {
      console.log('New user added successfully');
      // Handle successful user registration here
      navigate('/Activate');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    // Handle the error case here
  }
};

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);
  const isStep1Complete =
  formData.firstName != null &&
  formData.lastName != null &&
  formData.phoneNumber != null &&
  formData.email != null &&
  formData.password != null &&
  formData.confirmPassword != null;

const isStep3Complete =
  formData.streetAddress != null &&
  formData.city != null &&
  formData.state != null &&
  formData.zipcode != null &&
  formData.country != null;

const isFormComplete = isStep1Complete;// && isStep3Complete;


  const onClose = () => {
    navigate(-1);
  };

  return (
    <>
      <Header/>

      <div className="signup_center_title">Sign Up</div>

      <div className="signup_form" >
        <form onSubmit={handleSubmit} className="signup_container" >
        
          {currentStep === 1 && (
            
            <div>
            <h2 className="signup_form_title">Personal Information</h2>
            <div className="signup_form_row">
              <div className="signup_column">
                <label >
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
               <p className = "required_fields">* Required Fields</p>
               </div>


            <button type="button" onClick={onClose}>Close</button>
            <button type="button" onClick={nextStep} disabled={!isStep1Complete}>Next</button>
          </div>
          
          )}

        {currentStep === 2 && (
          <div>
            <h2 className="signup_form_title">Payment Information</h2>
{/* 
            {formData.paymentMethods.map((paymentMethods, index) => (
              <div key={index}> */}
                {/* <h3 className="sign_up_h3">Payment Method #{index + 1}</h3> */}
                <h3 className="sign_up_h3">Payment Method </h3>
                {/* Card Information */}
                <div className="signup_form_row">
                  <div className="signup_column">
                    First Name
                    <input
                      type="text"
                      name="cardFirstName"
                      value={formData.cardFirstName}
                    onChange={handleChange}
                      placeholder="Card First Name"
                    />
                  </div>
{/* {`cardLastName${index}`} dynamic index names are not working*/} 
                  <div className="signup_column">
                    Last Name
                    <input
                      type="text"
                      name="cardLastName"
                      value={formData.cardLastName}
                      onChange={handleChange}
                      placeholder="Card Last Name"
                    />
                  </div>

                <div className="signup_column">
                  Card Number
                  <input
                    type="number"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="Card Number"
                  />
                </div>

                  <div className="signup_column">
                    Date
                    <input
                      type="date"
                      name="expirationDate"
                      value={formData.expirationDate}
                      onChange={handleChange}
                      placeholder="Expiration Date"
                    />
                  </div>

                  <div className="signup_column">
                    Security Code
                    <input
                      type="text"
                      name="securityCode"
                      value={formData.securityCode}
                      onChange={handleChange}
                      placeholder="Security Code"
                    />
                  </div>
                </div>

                {/* Billing Address */}
                <h3 className="sign_up_h3">Billing Address</h3>
                <div className="signup_form_row">
                  <div className="signup_column">
                    First Name 
                    <input
                      type="text"
                      name="billingFirstName"
                      value={formData.billingFirstName}
                      onChange={handleChange}
                      placeholder="Billing First Name"
                    />
                  </div>

                <div className="signup_column">
                  Last Name
                  <input
                    type="text"
                    name="billingLastName"
                    value={formData.billingLastName}
                    onChange={handleChange}
                    placeholder="Billing Last name"
                  />
                </div>
              
                <div className="signup_column">
                  Billing Street Address
                  <input
                    type="text"
                    name="billingStreetAddress"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Billing Street Address"
                  />
                </div>

                  <div className="signup_column">
                    Billing City
                    <input
                      type="text"
                      name="billingCity"
                      value={formData.billingCity}
                      onChange={handleChange}
                      placeholder="Billing City"
                    />
                  </div>

                  <div className="signup_column">
                    Billing State
                    <input
                      type="text"
                      name="billingState"
                      value={formData.billingState}
                      onChange={handleChange}
                      placeholder="Billing State"
                    />
                  </div>

                <div className="signup_column">
                  Billing Zip Code
                  <input
                    type="number"
                    name="billingZipCode"
                    value={formData.billingZipCode}
                    onChange={handleChange}
                    placeholder="Billing Zip Code"
                  />
                </div>


                <div className="signup_column">
                  Billing Phone Number
                  <input
                    type="number"
                    name="billingPhoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Billing Phone Number"
                  />
                </div>
              </div>

            
            
            
        
              
              

              <button type="button" onClick={prevStep}>Previous</button>
              <button type="button" onClick={nextStep} >Next</button>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="signup_form_title">Home Address Information</h2>
              <div className="signup_form_row">
                <div className="signup_column">
                  Street Address
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    placeholder="Street"
                  />
                </div>
              
                <div className="signup_column">
                  City
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                  />
                </div>

                <div className="signup_column">
                  State
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                  />
                </div>

                <div className="signup_column">
                  Zip Code
                  <input
                    type="number"
                    name="zipcode"
                    value={formData.zipcode}
                    onChange={handleChange}
                    placeholder="Zipcode"
                  />
                </div>

                <div className="signup_column">
                  Zip Code
                  <input
                    type="number"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Country"
                  />
                </div>

              </div>
              <button type="button" onClick={prevStep}>Previous</button>
              <button type="submit" disabled={!isFormComplete}>Submit</button>
            </div>
          )}
        </form>
      </div>
      <Footer/>
    </>
  );
};

export default Signup;
