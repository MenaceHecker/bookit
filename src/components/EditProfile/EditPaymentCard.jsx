import React from 'react';
import './EditPaymentCard.css';
import EditPaymentForm from './EditPaymentForm';
import { useState } from 'react';

const EditPaymentCard = ({ firstName, lastName, lastFourDigits, expirationDate, onDelete}) => {
   //state for form to pop up on screen
  const [showPopout, setShowPopout] = useState(false);

  const onEdit = () => {
    setShowPopout(!showPopout);
  };

  return (

    <div className="payment-card">

      <div className="payment_card-info">
        <div>{firstName} {lastName}</div>
        <div>Last 4 Digits: {lastFourDigits}</div>
        <div>Expiration Date: {expirationDate}</div>
      </div>

      <div className="payment_card-actions">
        <button onClick={onDelete}>Delete</button> 
        <button onClick={onEdit}>Edit</button> 
        {/* connect EditPaymentForm to Edit button */}
        {showPopout && (<EditPaymentForm onClose={onEdit} setShowPopout={setShowPopout} />)}
        
        
      </div>

    </div>
  );
};

export default EditPaymentCard;
