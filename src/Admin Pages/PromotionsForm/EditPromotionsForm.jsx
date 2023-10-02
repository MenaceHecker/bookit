import './EditPromotions.css'
import { useState } from 'react';
//Subject
//Body

//Send Button
//Cancel buttont that empties form? brings back to homepage?



function EditPromotionsForm({onClose}) {

   // const [isPopoutOpen, setIsPopoutOpen] = useState(false);

    const [formData, setFormData] = useState({
        editPromotionName: '',
        editPromotionDescription: '',
        editPromotionPercentage: '',
        editPromotionExpDate: '',
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setFormData({
            editPromotionName: '',
            editPromotionDescription: '',
            editPromotionPercentage: '',
            editPromotionExpDate: ''
        });
    };
    
      const handleClose = () => {
        onClose();
        // close button logic here, close form
      };

    //   const handleCancel = () => {
    //     console.log('Form cancelled');
    // };

    return (
      
        
          
            <div className="edit_promotions_form">
              <form onSubmit={handleSubmit} className="edit_promotions_container">
               Edit Promotion

                <div className="edit_promotions_form_row">
                  <label>
                  
                    Promotion Name:
                    <br />
                    <input type="text" name="name" value={formData.editPromotionName} onChange={handleInputChange} />
                  </label>

                  <label>
                    Promotion Description:
                    <br />
                    <input type="text" name="description" value={formData.editPromotionDescription} onChange={handleInputChange} />
                  </label>

                </div>
        
                <div className="edit_promotions_form_row">
                  <label>
                    Promotion Expiration Date:
                    <br />
                    <input type= "date" name = "promotionExpDate" value={formData.editPromotionExpDate} onChange={handleInputChange} />
                  </label>

                  <label>
                    Promotion Percentage:
                    <br />
                    <input type="number" name="producer" value={formData.editPromotionPercentage} onChange={handleInputChange} />
                  </label>
                </div>

                
  
  
                <div className = "edit_button_row">
                  <button type="submit">Submit</button>
                  <button className= "close_promotion" onClick={handleClose}>Close</button>
                </div>
              </form>
              
            </div>
    );
};
export default EditPromotionsForm;