import React from 'react';
import './OrderHistoryCard.css';

const OrderHistoryCard = ({ confirmationNumber, firstName, lastName, lastFourDigits, price, date}) => {

  return (

    <div className="order_history_card">

      <div className="order_history_card_info">
        <div>Confirmation Number: {confirmationNumber}</div>
        <div>{firstName} {lastName}</div>
        <div>Last 4 Digits of Payment Method: {lastFourDigits}</div>
        <div>Date: {date}</div>
        <div>Price: ${price}</div>
      </div>


    </div>
  );
};

export default OrderHistoryCard;