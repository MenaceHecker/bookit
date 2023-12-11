import AdminHeader from "./AdminHeader/AdminHeader";
import AdminSideBar from "./AdminSideBar/AdminSideBar";
import AddPromotionsForm from "./PromotionsForm/AddPromotionsForm";
import './ManagePromotions.css';
import Table from "./Table/Table";
import { useContext, useState } from "react";
import Footer from "../components/footer/footer";
import { Link, useNavigate } from 'react-router-dom';
import { SessionContext } from '../utils/Session';

function ManagePromotions() {
    const { currentUser } = useContext(SessionContext);
    const [showPopout, setShowPopout] = useState(false);
    const navigate = useNavigate();
    const togglePopout = () => {
      setShowPopout(!showPopout);
    };




    const mockData = [
        {
          id: 1,
          promotionName: 'Halloween Special',
          promotionDescription: '50% off Scary Movies',
          promotionPercentage: 30,
          promotionExpDate: ['2023-09-20', '2023-09-21'],
        },
        {
            id: 1,
            promotionName: 'Christmas Special',
            promotionDescription: '30% off Christmas-Themed Movies',
            promotionPercentage: 30,
            promotionExpDate: ['2023-09-20', '2023-09-21'],
        },
        
      ];


    function joe() {
        navigate('/')
    }
    if (!currentUser.privileged) {
        return (
            <div className={'center_title'}>
                <h1>You are not granted access</h1>
                <button onClick={joe}>Home</button>
            </div>
        );
    }

    return (
        <div>
            <AdminHeader/>
            <AdminSideBar/>
        
            <div className="center_title">
                Manage Promotions
            </div>

            <div className="add_promotions">
                <button className="addPromotions_button" onClick={togglePopout}>Add Promotion</button>
                {showPopout && <AddPromotionsForm onClose={togglePopout} setShowPopout={setShowPopout} />}-
            </div>


            <div className = "table">
                <Table data={mockData} pageType="ManagePromotions" />
            </div>

        <Footer/>
        </div>
    );
}

export default ManagePromotions;


// form for emailing
// two buttons: Send, Cancel (cancel goes back to main page, or empties form)
