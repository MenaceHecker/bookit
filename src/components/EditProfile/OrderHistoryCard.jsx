import React from 'react';
import './OrderHistoryCard.css';

const OrderHistoryCard = ({ time, firstName, lastName, lastFourDigits, price}) => {

  return (

    <div className="order_history_card">

      <div className="order_history_card_info">
        <div>Confirmation Number: {time}</div>
        <div>{firstName} {lastName}</div>
        <div>Last 4 Digits of Payment Method: {lastFourDigits}</div>
        <div>Price: ${price}</div>
      </div>


    </div>
  );
};

export default OrderHistoryCard;