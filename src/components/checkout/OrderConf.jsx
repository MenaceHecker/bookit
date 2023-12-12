import { useNavigate } from 'react-router-dom';
import './check.css';
const OrderConf = () => {
    const navigate = useNavigate();
    return (
        <div id={'orderconf_cont'}>
            <h1 id={'orderconf_h1'}>Your Order Has Been Complete</h1>
            <p id={'orderconf_h1'}>Thank you for your purchase! We truly appreciate your support.</p>
            <button id={"checkout_button"} onClick={() => navigate('/')}>Complete</button>
        </div>
    );
};

export default OrderConf;
