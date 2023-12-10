import React from 'react';
import { Link } from 'react-router-dom';
import './CheckoutHeader.css';
import Logo from '../../assets/bookit-high-resolution-logo-colo.png';

function CheckoutHeader() {
    return (
        <div className="Checkout_header">
            <Link to='/Homepage'>
                <div className="checkout_logo"> 
                    <img src={Logo} alt='Logo' />
                </div>
            </Link>
            <div className="checkout">
                Checkout
            </div>
            <div className="right_cancel">
                <Link to='/Homepage'>
                <button className="button">Cancel</button>
                </Link>
            </div>
        </div>
    );
}

export default CheckoutHeader;
