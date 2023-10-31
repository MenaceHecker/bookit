import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import Header from '../header/header';
import Footer from "../footer/footer";


const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    //Personal Information
    firstName: '',
    lastName: ' ',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    //Payment Information/Card Info
    cardFirstName: '',
    cardLastName: '',
    cardNumber: '',
    expirationDate: '',
    securityCode: '',
    //Billing Address
    billingFirstName: '',
    billingLastName: '',
    billingStreetAddress: '',
    billingCity: '',
    billingState: '',
    billingCountry: '',
    billingZipCode: '',
    billingPhoneNumber: '',
    //Home address
    streetAddress: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
  });

  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
//  verification code should be sent to user's email address upon registration
const handleSubmit = (e) => {
  e.preventDefault();
  if (formData.password !== formData.confirmPassword) {
    // You can add an alert or a toast message to inform the user that the passwords do not match
    console.log("Passwords do not match");
    return;
  }
  console.log('Form submitted:', formData);
  setFormData({
    // remaining code remains the same
    //Personal Information
    firstName: '',
    lastName: ' ',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    //Payment Information/Card Info
    cardFirstName: '',
    cardLastName: '',
    cardNumber: '',
    expirationDate: '',
    securityCode: '',
    //Billing Address
    billingFirstName: '',
    billingLastName: '',
    billingStreetAddress: '',
    billingCity: '',
    billingState: '',
    billingCountry: '',
    billingZipCode: '',
    billingPhoneNumber: '',
    //Home address
    streetAddress: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
  });
  navigate('/Activate');
};



  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);
  const isStep1Complete =
  formData.firstName &&
  formData.lastName &&
  formData.phoneNumber &&
  formData.email &&
  formData.password &&
  formData.confirmPassword;

const isStep2Complete =
  formData.cardFirstName &&
  formData.cardLastName &&
  formData.cardNumber &&
  formData.expirationDate &&
  formData.securityCode &&
  formData.billingFirstName &&
  formData.billingLastName &&
  formData.billingStreetAddress &&
  formData.billingCity &&
  formData.billingState &&
  formData.billingZipCode &&
  formData.billingPhoneNumber;

const isStep3Complete =
  formData.streetAddress &&
  formData.city &&
  formData.state &&
  formData.zipcode &&
  formData.country;

const isFormComplete = isStep1Complete && isStep2Complete && isStep3Complete;


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
                    checked={formData.promotions}
                    onChange={handleChange}
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
              
              <h3 className="sign_up_h3">Card Information</h3>
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
              </div>{/* </div> sign-up form row end */}
              
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
                    value={formData.billingStreetAddress}
                    onChange={handleChange}
                    placeholder="Billing Street Address"
                  />
                </div>

                <div className="signup_column">
                  Billing City
                  <input
                    type="text"
                    name=" billingCity"
                    value={formData.billingCity}
                    onChange={handleChange}
                    placeholder="Billing City"
                  />
                </div>
              </div>

              <div className="signup_form_row">
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
                    value={formData.billingPhoneNumber}
                    onChange={handleChange}
                    placeholder="Billing Phone Number"
                  />
                </div>
              </div>

              
              

              <button type="button" onClick={prevStep}>Previous</button>
              <button type="button" onClick={nextStep} disabled={!isStep2Complete}>Next</button>
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
