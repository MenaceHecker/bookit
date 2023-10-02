import React, { useState } from 'react';
import OrderConf from "./OrderConf";

const CheckoutU = () => {
    const [fields, setFields] = useState(
        [{ value: 'Country' }, {value: 'Name'}, {value: 'Address'}, {value: 'City'},
            {value: 'State'},{value: 'Zip Code'}, {value: 'Phone Number'}]);
    const [fields2, setFields2] = useState(
        [{ value: 'Name on Card' }, {value: 'Billing Address'}, {value: 'Card Number'}, {value: 'Expiration'},
            {value:'Security Code'}]);
    let items = ["1. Example Item One: $24.99", "2. Example Item Two: $31.60", "Total: $24.75"]
    let methods = [{name:"Card name: Joe Shamlock", number: "Card: ****98"},{name:"Card name: Johnny Jackson", number:"Card: ****71"}, {name:"Card name: Jeffrey Humor", number:"Card: ****25"}]
    const handleInputChange = (index, event) => {
        const values = [...fields];
        values[index].value = event.target.value;
        setFields(values);
    };
    const handleClear = (index, event) => {
        const values = [...fields];
        values[index].value = '';
        setFields(values);
    }
    const handleInputChange2 = (index, event) => {
        const values = [...fields2];
        values[index].value = event.target.value;
        setFields2(values);
    };
    const handleClear2 = (index, event) => {
        const values = [...fields2];
        values[index].value = '';
        setFields2(values);
    }

    function openConf() {

    }

    const submit = async () => {
        try {
            const response = await fetch('http://198.251.67.241:8080/api/billing', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fields),
            });

            const data = await response.json();
            console.log('Submitted successfully:', data);
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    return (
        <div id={"checkout_cont"}>
        <div className={"left"}>
            <h1>Billing Information</h1>
            {fields.map((field, index) => (
                <div key={index} id={"inp_cont"}>
                    <input
                        id={'ibox'}
                        type="text"
                        value={field.value}
                        onChange={(e) => handleInputChange(index, e)}
                        onClick={(e) => handleClear(index, e)}
                    />
                </div>
            ))}
            <h1>Payment Information</h1>
            {fields2.map((field, index) => (
                <div key={index} id={"inp_cont"}>
                    <input
                        id={'ibox'}
                        type="text"
                        value={field.value}
                        onChange={(e) => handleInputChange2(index, e)}
                        onClick={(e) => handleClear2(index, e)}
                    />
                </div>
            ))}
            <div id={"buttongroup"}>
                <button id={"checkout_button"} onClick={submit}>Submit</button>
                <button id={"checkout_button"} onClick={submit}>Save Payment Method</button>
            </div>
        </div>

        <div className={"right"}>
            {items.map((item, index) => (
                <div key={index} id={"inp_cont"}>
                    <p>{item}</p>
                </div>
            ))}
        </div>
            <div className={"right"}>
                {methods.map((item, index) => (
                    <div key={index} id={"inp_cont"}>
                        <div id={"list_slot"}>
                            <input type="radio" value="Male" name="gender" />
                            <p>{item.name}</p>
                            <p>{item.number}</p>
                        </div>
                    </div>
                ))}
                <button id={"checkout_button"}>Complete Purchase</button>
            </div>
        </div>
    );
};

export default CheckoutU;
