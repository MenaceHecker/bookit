import React, { useState } from 'react';
import Header from "../header/header";

const OrderConf = () => {
    return (
        <div id={'orderconf_cont'}>
            <h1>Your Order Has Been Complete</h1>
            <p>Thank you for your purchase! We truly appreciate your support.</p>
            <button id={"checkout_button"}>Complete</button>
            <button id={"checkout_button"}>Print Reciept</button>
        </div>
    );
};

export default OrderConf;
