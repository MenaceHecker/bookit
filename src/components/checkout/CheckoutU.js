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
    const [paymentFormData, setPFD] = useState({
        //Payment Information/Card Info
        firstName: '',
        lastName: '',
        cardNumber: '',
        expirationDate: '',
        billingStreetAddress: '',
        code: '',
    });
    const [billingFormData, setBFD] = useState(
        {
            firstName: '',
            lastName: '',
            billingStreetAddress: '',
        });
    const api = useContext(APIContext);
    const [payments, setPayments] = useState([]);
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

    const addCard = async (card) => {
        try {
            const response = await api.createCard(card);
            if (!response.ok)
                console.error(response.message);
            setPFD({
                email: '',
                subscribe: 'off',
                password: '',
                password2: '',
            });
            refreshPayments();
        } catch (err) {
            console.error(err);
        }
    };
    const save_payment = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', paymentFormData);
        addCard(paymentFormData);
    };
    const submit = async (e) => {

    }

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


/*
    const handleInputChange = (index, event) => {
        const values = [...billingFormData];
        values[index].value = event.target.value;
        setBFD(values);
    };
    const handleClear = (index, event) => {
        const values = [...billingFormData];
        values[index].value = '';
        setBFD(values);
    }
    const handleInputChange2 = (index, event) => {
        const values = [...paymentFormData];
        values[index].value = event.target.value;
        setPFD(values);
    };
    const handleClear2 = (index, event) => {
        const values = [...paymentFormData];
        values[index].value = '';
        setPFD(values);
    }
    */

    const handleInputChange = (key, value) => {
        setPFD((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };
    const handleInputChange2 = (key, value) => {
        setBFD((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    return (
        <div id={"checkout_cont"}>
        <div className={"left"}>
            {/*
            <h1 id={'orderconf_h1'}>Payment Information</h1>
            {paymentFormData.map((field, index) => (
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

            <h1 id={'orderconf_h1'}>Billing Information</h1>
            {billingFormData.map((field, index) => (
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
            */}
            <h1 id={'orderconf_h1'}>Payment Information</h1>
            {Object.keys(paymentFormData).map((key) => (
                <div key={key} id={"inp_cont"}>
                    <p htmlFor={key}>{key}</p>
                    <input
                        id={'ibox'}
                        type="text"
                        value={paymentFormData[key]}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                    />
                </div>
            ))}
            <h1 id={'orderconf_h1'}>Billing Information</h1>
            {Object.keys(billingFormData).map((key) => (
                <div key={key} id={"inp_cont"}>
                    <p htmlFor={key}>{key}</p>
                    <input
                        id={'ibox'}
                        type="text"
                        value={billingFormData[key]}
                        onChange={(e) => handleInputChange2(key, e.target.value)}
                    />
                </div>
            ))}

            
            <div id={"buttongroup"}>
                <button id={"checkout_button"} onClick={save_payment}>Save Payment Method</button>
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
                <button  id={"checkout_button"} onClick={submit}>Complete Purchase</button>
            </div>
        </div>
    );
};

export default CheckoutU;
