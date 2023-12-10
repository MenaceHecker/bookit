import React, {useState, useContext, useEffect} from 'react';
import './check.css';
import { APIContext, useApiData } from '../../utils/API';

const CheckoutU = (props) => {
    const {
        id,
        selectedTickets,
        selectedSeats,
        selectedTime,
        selectedShowDate,
    } = props;
    console.log("Selected Seats:", selectedSeats);
    const childPrice = 11.99, adultPrice = 48.99, seniorPrice = 2.99;

    const api = useContext(APIContext);
    const [payments, setPayments] = useState([]);
    //console.log(payments);

    const [refreshPayments] = useApiData(async (api) => {
        try {
          const response = await api.listCards();
          if (response.ok)
            setPayments(response.data);
          else
            console.error(response.message);
        } catch (err) {
          console.error(err);
        }
      });

    //Billing Information
    const [fields, setFields] = useState(
        [{ value: 'Country' }, {value: 'Name'}, {value: 'Address'}, {value: 'City'},
            {value: 'State'},{value: 'Zip Code'}, {value: 'Phone Number'}]);

    //Payment Information
    const [fields2, setFields2] = useState(
        [{ value: 'Name on Card' }, {value: 'Billing Address'}, {value: 'Card Number'}, {value: 'Expiration'},
            {value:'Security Code'}]);


    let items = [], count = 1;
    // logic for generating purchases
    if (selectedTickets.child > 0) {
        items.push(count + '. Child Tickets: ' + selectedTickets.child + '    $' + selectedTickets.child*childPrice);
        count++;
    }
    if (selectedTickets.adult > 0) {
        items.push(count + '. Adult Tickets: ' + selectedTickets.adult + '    $' + selectedTickets.adult*adultPrice);
        count++;
    }
    if (selectedTickets.senior > 0) {
        items.push(count + '. Senior Tickets: ' + selectedTickets.senior + '    $' + selectedTickets.senior*seniorPrice);
        count++;
    }

    //Dummy Payment Methods
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
            <h1 id={'orderconf_h1'}>Billing Information</h1>
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

            <h1 id={'orderconf_h1'}>Payment Information</h1>
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
                    <p id={'orderconf_h1'}>{item}</p>
                    <p>Time of seeing: {selectedTime}</p>
                    <p>Date of seeing: {selectedShowDate}</p>
                    <p>Seats selected: {selectedSeats.map((seat, index) => (
                        <span key={index}>{seat}</span>
                    ))}</p>
                </div>
            ))}
        </div>

            <div className={"right"}>
                {payments.map((paymentMethod) => (
                    <div key={paymentMethod.cardId} id={"inp_cont"}>
                        <div id={"list_slot"}>
                            <input type="radio" value="Male" name="gender" />
                            <p id={'orderconf_h1'}>{paymentMethod.firstName} {paymentMethod.lastName}</p>
                            <p id={'orderconf_h1'}>{paymentMethod.lastFourDigits}</p>
                            <p id={'orderconf_h1'}>{paymentMethod.expirationDate}</p>
                        </div>
                    </div>
                ))}
                <button id={"checkout_button"}>Complete Purchase</button>
            </div>
        </div>
    );
};

export default CheckoutU;
