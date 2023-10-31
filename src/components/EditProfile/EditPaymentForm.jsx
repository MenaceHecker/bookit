import React from 'react';
import './EditPaymentForm.css';

import { useState } from 'react';



const EditPaymentForm = ({setShowPopout}) => {
   

    

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
      setShowPopout(false); // Call the setShowPopout function from EditPaymentCard.jsx
    };
  
    return (
      <>
      <div className="popup_container">
        <div className="edit_payment_form " >
          <form onSubmit={handleSubmit} className="edit_payment_form_container" >
          
              <div>
                <h2 className="edit_payment_form_title">Edit Payment Information</h2>
                
                <h3 className="edit_payment_form_h3">Edit Card Information</h3>

                <div className="edit_payment_form_row">

                  <div className="edit_payment_form_column">
                    First Name
                    <input
                      type="text"
                      name="cardFirstName"
                      value={formData.cardFirstName}
                      onChange={handleChange}
                      placeholder="Card First Name"
                    />
                  </div>
  
                  
                  <div className="edit_payment_form_column">
                    Last Name
                    <input
                      type="text"
                      name="cardLastName"
                      value={formData.cardLastName}
                      onChange={handleChange}
                      placeholder="Card Last Name"
                    />
                  </div>
                  
  
                  <div className="edit_payment_form_column">
                    Card Number
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="Card Number"
                    />
                  </div>
  
                  <div className="edit_payment_form_column">
                    Date
                    <input
                      
                      type="date"
                      name="expirationDate"
                      value={formData.expirationDate}
                      onChange={handleChange}
                      placeholder="Expiration Date"
                    />
                  </div>
  
                  <div className="edit_payment_form_column">
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
                
                <h3 className="edit_payment_form_h3">Edit Billing Address</h3>
                <div className="edit_payment_form_row">
                  <div className="edit_payment_form_column">
                    First Name 
                    <input
                      type="text"
                      name="billingFirstName"
                      value={formData.billingFirstName}
                      onChange={handleChange}
                      placeholder="Billing First Name"
                    />
                  </div>
  
                  <div className="edit_payment_form_column">
                    Last Name
                    <input
                      type="text"
                      name="billingLastName"
                      value={formData.billingLastName}
                      onChange={handleChange}
                      placeholder="Billing Last name"
                    />
                  </div>
                
                  <div className="edit_payment_form_column">
                    Billing Street Address
                    <input
                      type="text"
                      name="billingStreetAddress"
                      value={formData.billingStreetAddress}
                      onChange={handleChange}
                      placeholder="Billing Street Address"
                    />
                  </div>
  
                  <div className="edit_payment_form_column">
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
  
                <div className="edit_payment_form_row">
                  <div className="edit_payment_form_column">
                    Billing State
                    <input
                      type="text"
                      name="billingState"
                      value={formData.billingState}
                      onChange={handleChange}
                      placeholder="Billing State"
                    />
                  </div>
  
                  <div className="edit_payment_form_column">
                    Billing Zip Code
                    <input
                      type="number"
                      name="billingZipCode"
                      value={formData.billingZipCode}
                      onChange={handleChange}
                      placeholder="Billing Zip Code"
                    />
                  </div>
  
  
                  <div className="edit_payment_form_column">
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
  
                
                <button type="submit">Submit</button>
                <button className="close-button" onClick={onClose}>Close</button>
              </div>
          </form>
        </div> {/* End of edit_payment_form*/}
      </div> {/* End of popup_container */}
      </>
    );
  };
  
  export default EditPaymentForm;
  