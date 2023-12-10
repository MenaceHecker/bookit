
import './OrderHistory.css'
import OrderHistoryCard from './OrderHistoryCard';
import { APIContext, useApiData } from '../../utils/API';
import { useState, useContext } from 'react';

const EditPayment = () => {
    // Dummy data for demonstration
    const dummyOrderHisoryMethods = [
      { id: 1,confirmationNumber: '1234', firstName: 'John', lastName: 'Doe', lastFourDigits: '9765', price: '25.99', date: '10/30/2023' },
      { id: 1,confirmationNumber: '4321', firstName: 'Jane', lastName: 'Doe', lastFourDigits: '5679', price: '13.99', date: '10/30/2023' },
    ];

    const api = useContext(APIContext);  
    const [orderHistory, setOrderHistory] = useState([]);
    console.log('Order History:',orderHistory);
  
    const [refreshBookings] = useApiData(async (api) => {
      try {
        const response = await api.listOrderEntries();
        if (response.ok)
        setOrderHistory(response.data);
        else
          console.error(response.message);
      } catch (err) {
        console.error(err);
      }
    });

 
    return (
      <div className="order_history_container">
        <div className="order_history_center_title">Order History</div>
  
        {orderHistory.map((OrderHistoryMethod) => (

          <OrderHistoryCard
            key={OrderHistoryMethod.id}
            confirmationNumber={OrderHistoryMethod.time}
            firstName={OrderHistoryMethod.firstName}
            lastName={OrderHistoryMethod.lastName}
            lastFourDigits={OrderHistoryMethod.lastFourDigits}
            price={OrderHistoryMethod.price}
         
          />
        ))}

      </div>
    );
  };
  

export default EditPayment;

