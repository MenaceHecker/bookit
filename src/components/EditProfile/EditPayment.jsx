import './EditPayment.css'
import { useContext, useState } from 'react';
import EditPaymentCard from './EditPaymentCard';
import AddPaymentForm from './AddPaymentForm';
import { APIContext, useApiData } from '../../utils/API';

const EditPayment = () => {
  const api = useContext(APIContext);

  const [payments, setPayments] = useState([]);
  console.log(payments);

  const [refreshPayments] = useApiData(async (api) => {
    try {
      const response = await api.listCards();
      if (response.ok)
        setPayments(response.data);
      else
        console.error(response.message);
    } catch (err) {
      console.error(err);
    }
  });

  const handleDelete = async (id) => {
    try {
      const response = await api.deleteCard(id);
      if (!response.ok)
        console.error(response.message);
      refreshPayments();
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
        {showPopout && (<AddPaymentForm onClose={onAdd} setShowPopout={setShowPopout} refreshPayments={refreshPayments} />)}



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
