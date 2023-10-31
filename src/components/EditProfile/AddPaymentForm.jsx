import React from 'react';
import './AddPaymentForm.css';

import { useState } from 'react';



const AddPaymentForm = ({setShowPopout}) => {
   

    

    const [formData, setFormData] = useState({
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
 
    });
  
  
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: type === 'checkbox' ? checked : value
      }));
    };

    
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
      setFormData({
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
      });
    };

  

    const onClose = () => {
      setShowPopout(false); // Call the setShowPopout function from 
    };
  
    return (
      <>
      <div className="popup_container">
        <div className="add_payment_form " >
          <form onSubmit={handleSubmit} className="add_payment_form_container" >
          
              <div>
                <h2 className="add_payment_form_title">Add Payment Information</h2>
                
                <h3 className="add_payment_form_h3">Add Card Information</h3>

                <div className="add_payment_form_row">

                  <div className="add_payment_form_column">
                    First Name
                    <input
                      type="text"
                      name="cardFirstName"
                      value={formData.cardFirstName}
                      onChange={handleChange}
                      placeholder="Card First Name"
                    />
                  </div>
  
                  
                  <div className="add_payment_form_column">
                    Last Name
                    <input
                      type="text"
                      name="cardLastName"
                      value={formData.cardLastName}
                      onChange={handleChange}
                      placeholder="Card Last Name"
                    />
                  </div>
                  
  
                  <div className="add_payment_form_column">
                    Card Number
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="Card Number"
                    />
                  </div>
  
                  <div className="add_payment_form_column">
                    Date
                    <input
                      
                      type="date"
                      name="expirationDate"
                      value={formData.expirationDate}
                      onChange={handleChange}
                      placeholder="Expiration Date"
                    />
                  </div>
  
                  <div className="add_payment_form_column">
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
                
                <h3 className="add_payment_form_h3">Add Billing Address</h3>
                <div className="add_payment_form_row">
                  <div className="add_payment_form_column">
                    First Name 
                    <input
                      type="text"
                      name="billingFirstName"
                      value={formData.billingFirstName}
                      onChange={handleChange}
                      placeholder="Billing First Name"
                    />
                  </div>
  
                  <div className="add_payment_form_column">
                    Last Name
                    <input
                      type="text"
                      name="billingLastName"
                      value={formData.billingLastName}
                      onChange={handleChange}
                      placeholder="Billing Last name"
                    />
                  </div>
                
                  <div className="add_payment_form_column">
                    Billing Street Address
                    <input
                      type="text"
                      name="billingStreetAddress"
                      value={formData.billingStreetAddress}
                      onChange={handleChange}
                      placeholder="Billing Street Address"
                    />
                  </div>
  
                  <div className="add_payment_form_column">
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
  
                <div className="add_payment_form_row">
                  <div className="add_payment_form_column">
                    Billing State
                    <input
                      type="text"
                      name="billingState"
                      value={formData.billingState}
                      onChange={handleChange}
                      placeholder="Billing State"
                    />
                  </div>
  
                  <div className="add_payment_form_column">
                    Billing Zip Code
                    <input
                      type="text"
                      name="billingZipCode"
                      value={formData.billingZipCode}
                      onChange={handleChange}
                      placeholder="Billing Zip Code"
                    />
                  </div>
  
  
                  <div className="add_payment_form_column">
                    Billing Phone Number
                    <input
                      type="text"
                      name="billingPhoneNumber"
                      value={formData.billingPhoneNumber}
                      onChange={handleChange}
                      placeholder="Billing Phone Number"
                    />
                  </div>
                </div>
  
                
                <button type="submit">Submit</button>
                <button className="close-button" onClick={onClose}>Close</button>
              </div>
          </form>
        </div> {/* End of add_payment_form*/}
      </div> {/* End of popup_container */}
      </>
    );
  };
  
  export default AddPaymentForm;
  