import './EditPaymentForm.css';
import { useContext, useState, useEffect } from 'react';
import { APIContext } from '../../utils/API';

const EditPaymentForm = ({setShowPopout, editingCard}) => {

  useEffect(() => {
    if (editingCard) {
      setFormData({
        
        firstName: editingCard.firstName,
        lastName: editingCard.lastName,
        cardNumber: editingCard.lastFourDigits,
        expirationDate: editingCard.expirationDate,
        securityCode: editingCard.securityCode,
        billingAddress: editingCard.billingAddress,
     
      });
    }
  }, [editingCard]);

  const api = useContext(APIContext);
    const [formData, setFormData] = useState({
      //Payment Information/Card Info
      
        firstName: '',
        lastName: '',
        cardNumber: '',
        expirationDate: '',
        securityCode:'',
        // billingFirstName: editingCard.billingFirstName,
        // billingLastName: editingCard.billingLastName,
        billingAddress: '',
 
    });
  
  
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: type === 'checkbox' ? checked : value
      }));
    };

    
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
      setFormData({
        //Payment Information/Card Info
       
        firstName: '',
        lastName: '',
        cardNumber: '',
        expirationDate: '',
        securityCode: '',
        //Billing Address
        // billingFirstName: '',
        // billingLastName: '',
        billingAddress: '',
        // billingCity: '',
        // billingState: '',
        // billingCountry: '',
        // billingZipCode: '',
        // billingPhoneNumber: '',
      });

      try {
        // const billingAddress = [formData.billingStreetAddress, formData.billingCity, formData.billingState, formData.billingZipCode].join(' ');
        const cardData = {
          cardId: editingCard.cardId,
          lastFourDigits: formData.cardNumber,
          firstName: formData.firstName,
          lastName: formData.lastName,
          securityCode: formData.securityCode,
          billingAddress: formData.billingAddress,
          expirationDate: formData.expirationDate
        };
        const response = api.updateCard(cardData);
        if (response.ok) {
          const payments = response.message;
          console.log('Form submitted successfully!', payments);
          onClose();
        } else {
          console.error('Error submitting form:', response.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
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
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Card First Name"
                    />
                  </div>
  
                  
                  <div className="edit_payment_form_column">
                    Last Name
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
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
                  {/* <div className="edit_payment_form_column">
                    First Name 
                    <input
                      type="text"
                      name="billingFirstName"
                      value={formData.billingFirstName}
                      onChange={handleChange}
                      placeholder="Billing First Name"
                    />
                  </div>
   */}
                  {/* <div className="edit_payment_form_column">
                    Last Name
                    <input
                      type="text"
                      name="billingLastName"
                      value={formData.billingLastName}
                      onChange={handleChange}
                      placeholder="Billing Last name"
                    />
                  </div> */}
                
                  {/* <div className="edit_payment_form_column"> */}
                    Billing Street Address
                    <input
                      type="text"
                      name="billingAddress"
                      value={formData.billingAddress}
                      onChange={handleChange}
                      placeholder="Billing Address"
                    />
                  </div>
  
                  {/* <div className="edit_payment_form_column">
                    Billing City
                    <input
                      type="text"
                      name="billingCity"
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
   */}
                
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
  
