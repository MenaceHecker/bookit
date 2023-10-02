import React, { useState } from 'react';
import './check.css';
const OrderConf = () => {
    return (
        <div id={'orderconf_cont'}>
            <h1 id={'orderconf_h1'}>Your Order Has Been Complete</h1>
            <p id={'orderconf_h1'}>Thank you for your purchase! We truly appreciate your support.</p>
            <button id={"checkout_button"}>Complete</button>
            <button id={"checkout_button"}>Print Reciept</button>
        </div>
    );
};

export default OrderConf;
