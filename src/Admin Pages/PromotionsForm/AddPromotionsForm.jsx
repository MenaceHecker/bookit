import './AddPromotionsForm.css'
import {useContext, useState} from 'react';
import { toast } from 'react-toastify';
import {API, APIContext, useApiData} from "../../utils/API";
//Subject
//Body

//Send Button
//Cancel buttont that empties form? brings back to homepage?



function AddPromotionsForm({setShowPopout}) {

   // const [isPopoutOpen, setIsPopoutOpen] = useState(false);
    const api = useContext(APIContext);
    const [formData, setFormData] = useState({
        promotionName: '',
        promotionDescription: '',
        promotionPercentage: '',
        promotionExpDate: '',
        promoCode: '',
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        const promotionData = {
            promoCode: formData.promoCode,
            discountPct: formData.promotionPercentage,
            expirationDate: formData.promotionExpDate,
            name: formData.promotionName,
            description: formData.promotionDescription
        }
        const response = await api.createPromotion(promotionData);
        setShowPopout(false);

        if (response.ok)
            toast.success('Promotion added');
        else
            toast.error(`Error: ${response.message}`);
        /*
        setFormData({
          promotionName: '',
          promotionDescription: '',
          promotionPercentage: '',
          promotionExpDate: ''
        });*/
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
                        Promo Code:
                        <br />
                        <input
                            type="text"
                            name="promoCode"
                            value={formData.promoCode}
                            onChange={handleInputChange}
                        />
                    </label>

                  <label>
                  
                    Promotion Name:
                    <br />
                    <input type="text" name="promotionName" value={formData.promotionName} onChange={handleInputChange} />
                  </label>

                  <label>
                    Promotion Description:
                    <br />
                    <input type="text" name="promotionDescription" value={formData.promotionDescription} onChange={handleInputChange} />
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
                    <input type="number" name="promotionPercentage" value={formData.promotionPercentage} onChange={handleInputChange} />
                  </label>
                </div>

                
  
  
                <div className = "add_promotions_button_row">
                  <button type="submit" onClick={handleSubmit}>Submit</button>
                  <button className= "close_promotion" onClick={onClose}>Close</button>
                </div>
              </form>
              
            </div>
    );
};
export default AddPromotionsForm;
