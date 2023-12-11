import AdminHeader from "./AdminHeader/AdminHeader";
import AdminSideBar from "./AdminSideBar/AdminSideBar";
import AddPromotionsForm from "./PromotionsForm/AddPromotionsForm";
import './ManagePromotions.css';
import Table from "./Table/Table";
import { useContext, useState } from "react";
import Footer from "../components/footer/footer";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SessionContext } from '../utils/Session';
import {useApiData} from "../utils/API";

function ManagePromotions() {
    const { currentUser } = useContext(SessionContext);
    const [showPopout, setShowPopout] = useState(false);
    const navigate = useNavigate();

    const [promos, setPromos] = useState([]);
    const [refreshPromos] = useApiData(async (api) => {
        const response = await api.listAllPromotions();
        if (response.ok) {
            setPromos(response.data);
            console.log(promos);
        } else if (response.type !== 'aborted') {
            toast.error(`Error fetching promotions: ${response.message}`);
        }
    });

    const togglePopout = () => {
      setShowPopout(!showPopout);
      refreshPromos();
    };

    function joe() {
        navigate('/')
    }
    if (!currentUser?.privileged) {
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
                <Table data={promos} pageType="ManagePromotions" refresh={refreshPromos} />
            </div>

        <Footer/>
        </div>
    );
}

export default ManagePromotions;


// form for emailing
// two buttons: Send, Cancel (cancel goes back to main page, or empties form)
