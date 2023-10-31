
import './OrderHistory.css'
import OrderHistoryCard from './OrderHistoryCard';

const EditPayment = () => {
    // Dummy data for demonstration
    const dummyOrderHisoryMethods = [
      { id: 1,confirmationNumber: '1234', firstName: 'John', lastName: 'Doe', lastFourDigits: '9765', price: '25.99', date: '10/30/2023' },
      { id: 1,confirmationNumber: '4321', firstName: 'Jane', lastName: 'Doe', lastFourDigits: '5679', price: '13.99', date: '10/30/2023' },
    ];
 
    return (
      <div className="order_history_container">
        <div className="order_history_center_title">Order History</div>
  
        {dummyOrderHisoryMethods.map((OrderHistory) => (

          <OrderHistoryCard
            key={OrderHistory.id}
            confirmationNumber={OrderHistory.confirmationNumber}
            firstName={OrderHistory.firstName}
            lastName={OrderHistory.lastName}
            lastFourDigits={OrderHistory.lastFourDigits}
            expirationDate={OrderHistory.expirationDate}
            price={OrderHistory.price}
            date={OrderHistory.date}
          />
        ))}

      </div>
    );
  };
  

export default EditPayment;
