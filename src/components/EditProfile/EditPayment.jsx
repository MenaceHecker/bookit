
import './EditPayment.css'
import { useState } from 'react';
import EditPaymentCard from './EditPaymentCard';
import AddPaymentForm from './AddPaymentForm';

const EditPayment = () => {
    // Dummy data for demonstration
    const dummyPaymentMethods = [
      { id: 1, firstName: 'John', lastName: 'Doe', lastFourDigits: '1234', expirationDate: '12/24' },
      { id: 2, firstName: 'Jane', lastName: 'Doe', lastFourDigits: '5678', expirationDate: '06/23' },
    ];
  
    const handleDelete = (id) => {
      // Handle delete action
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
        {showPopout && (<AddPaymentForm onClose={onAdd} setShowPopout={setShowPopout} />)}



        {dummyPaymentMethods.map((paymentMethod) => (

          <EditPaymentCard
            key={paymentMethod.id}
            firstName={paymentMethod.firstName}
            lastName={paymentMethod.lastName}
            lastFourDigits={paymentMethod.lastFourDigits}
            expirationDate={paymentMethod.expirationDate}
            onDelete={() => handleDelete(paymentMethod.id)}
            onEdit={() => handleEdit(paymentMethod.id)}
          />
        ))}

      </div>
    );
  };
  

export default EditPayment;
