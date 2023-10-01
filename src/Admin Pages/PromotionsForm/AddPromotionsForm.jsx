import './AddPromotionsForm.css'
import { useState } from 'react';
//Subject
//Body

//Send Button
//Cancel buttont that empties form? brings back to homepage?



function AddPromotionsForm({setShowPopout}) {

   // const [isPopoutOpen, setIsPopoutOpen] = useState(false);

    const [formData, setFormData] = useState({
        promotionName: '',
        promotionDescription: '',
        promotionPercentage: '',
        promotionExpDate: '',
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setFormData({
          promotionName: '',
          promotionDescription: '',
          promotionPercentage: '',
          promotionExpDate: ''
        });
    };
    
      const onClose = () => {
        setShowPopout(false);
        // close button logic here, close form
      };

    //   const handleCancel = () => {
    //     console.log('Form cancelled');
    // };

    return (
      
        
          
            <div className="add_promotions_form">
              <form onSubmit={handleSubmit} className="add_promotions_container">
               Add Promotion

                <div className="add_promotions_form_row">
                  <label>
                  
                    Promotion Name:
                    <br />
                    <input type="text" name="name" value={formData.promotionName} onChange={handleInputChange} />
                  </label>

                  <label>
                    Promotion Description:
                    <br />
                    <input type="text" name="description" value={formData.promotionDescription} onChange={handleInputChange} />
                  </label>

                </div>
        
                <div className="add_promotions_form_row">
                  <label>
                    Promotion Expiration Date:
                    <br />
                    <input type= "date" name = "promotionExpDate" value={formData.promotionExpDate} onChange={handleInputChange} />
                  </label>

                  <label>
                    Promotion Percentage:
                    <br />
                    <input type="number" name="producer" value={formData.promotionPercentage} onChange={handleInputChange} />
                  </label>
                </div>

                
  
  
                <div className = "add_promotions_button_row">
                  <button type="submit">Submit</button>
                  <button className= "close_promotion" onClick={onClose}>Close</button>
                </div>
              </form>
              
            </div>
    );
};
export default AddPromotionsForm;