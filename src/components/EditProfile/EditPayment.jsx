
import './EditPayment.css'
import { useEffect, useState } from 'react';
import EditPaymentCard from './EditPaymentCard';
import AddPaymentForm from './AddPaymentForm';

const EditPayment = () => {
    const getCards = async () => {

    };

    const [payments, setPayments] = useState([]);
    console.log(payments);

    const updatePayments = async () => {
      const url = new URL('http://198.251.67.241:8080/api/listCards');
      url.searchParams.append('sid', localStorage.getItem('sessionId'));
      try {
        const response = await fetch(url);
        if (!response.ok)
          console.error(await response.text());
        setPayments(await response.json());
      } catch (err) {
        console.error(err);
      }
    };

    useEffect(() => {
      updatePayments();
    }, []);

    const handleDelete = async (id) => {
      const url = new URL('http://198.251.67.241:8080/api/deleteCard');
      url.searchParams.append('sid', localStorage.getItem('sessionId'));
      url.searchParams.append('cardId', id);
      try {
        const response = await fetch(url);
        if (!response.ok)
          console.error(await response.text());
        updatePayments();
      } catch (err) {
        console.error(err);
      }
    };
  
    const handleEdit = (id) => {
      // Handle edit action and open form for editing
    };

    //Methods to handle the Form for AddPayment from AddPaymentForm.jsx
    const [showPopout, setShowPopout] = useState(false);

    const onAdd = () => {
      setShowPopout(!showPopout);
    };

  
    return (
      <div className="edit_payment_container">

        <div className="edit_payment_center_title">Edit Payment Information</div>

        <button className = "edit_payment_button"onClick={onAdd}>Add Payment Method</button>
        {showPopout && (<AddPaymentForm onClose={onAdd} setShowPopout={setShowPopout} updatePayments={updatePayments} />)}



        {payments.map((paymentMethod) => (

          <EditPaymentCard
            key={paymentMethod.cardId}
            firstName={paymentMethod.firstName}
            lastName={paymentMethod.lastName}
            lastFourDigits={paymentMethod.lastFourDigits}
            expirationDate={paymentMethod.expirationDate}
            onDelete={() => handleDelete(paymentMethod.cardId)}
            onEdit={() => handleEdit(paymentMethod.cardId)}
          />
        ))}

      </div>
    );
  };
  

export default EditPayment;
