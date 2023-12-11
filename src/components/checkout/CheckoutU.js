import React, {useState, useContext, useEffect} from 'react';
import './check.css';
import { APIContext, useApiData } from '../../utils/API';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CheckoutU = (props) => {
    let navigate = useNavigate();
    let totalPrice = 0.0;
    let [pCode, setPC] = useState('');
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
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [previousPaymentSelected, setPPS] = useState(false);
    const handlePaymentChange = (paymentMethod) => {
        setSelectedPayment(selectedPayment === paymentMethod ? null : paymentMethod);
        setPPS(!previousPaymentSelected);
    };
    const [refreshPayments] = useApiData(async (api) => {
        try {
          const response = await api.listCards();
          if (response.ok)
            setPayments(response.data);
          else if (response.type !== 'aborted')
            toast.error(`Error fetching cards: ${response.message}`);
        } catch (err) {
          console.error(err);
        }
      });

    const addCard = async (card) => {
        const response = await api.createCard(card);
        if (response.ok)
            toast.success('Card added');
        else
            toast.error(`Error: ${response.message}`);
        /*setPFD({
            email: '',
            subscribe: 'off',
            password: '',
            password2: '',
        });*/
        refreshPayments();
    };
    const save_payment = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', paymentFormData);
        addCard(paymentFormData);
    };
    const submit = async (e) => {
        e.preventDefault();
        if (selectedPayment) {
            const book = {
                showingId: id,
                cardId: selectedPayment.cardId,
                promoCode: pCode,
                tickets: selectedTickets,
            };
            const response = await api.createBooking(book);
            if (response.ok) {
                toast.success('Tickets have been booked');
                navigate('/OF');
            } else {
                toast.error(`Error: ${response.message}`);
            }
        } else {
            toast.error(`Error: No payment method selected`);
        }
    }

    let items = [], count = 1;
    // logic for generating purchases
    if (selectedTickets.child > 0) {
        items.push(count + '. Child Tickets: ' + selectedTickets.child + '    $' + selectedTickets.child*childPrice);
        totalPrice += selectedTickets.child*childPrice;
        count++;
    }
    if (selectedTickets.adult > 0) {
        items.push(count + '. Adult Tickets: ' + selectedTickets.adult + '    $' + selectedTickets.adult*adultPrice);
        totalPrice += selectedTickets.adult*adultPrice;
        count++;
    }
    if (selectedTickets.senior > 0) {
        items.push(count + '. Senior Tickets: ' + selectedTickets.senior + '    $' + selectedTickets.senior*seniorPrice);
        totalPrice += selectedTickets.senior*seniorPrice;
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
    const [validPromo, setVP] = useState(false);
    const [promo, setPromo] = useState({});
    const handleInputChangePromo = (s) => {
        setPC(s);
    }
    const checkPromo = async () => {
        const response = await api.getPromotionFromCode(pCode);
        setPromo(response.data);
        console.log(promo);
        setVP(true);
    }
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
            {!previousPaymentSelected && Object.keys(paymentFormData).map((key) => (
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
            {previousPaymentSelected && <p>Card Code:</p>}
            {previousPaymentSelected && <input
                id={'ibox'}
                type="text"
                value={paymentFormData.code}
                onChange={(e) => handleInputChange('code', e.target.value)}
            />}
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
                {!previousPaymentSelected && <button id={"checkout_button"} onClick={save_payment}>Save Payment Method</button>}
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
            {validPromo && <p>Total Price: {totalPrice - (totalPrice*(promo.discountPct/100))}</p>}
            {validPromo && <p id={'orderconf_h1'}>Discount: {promo.name}</p>}
            {validPromo  && <p>Percentage: {promo.discountPct}</p>}
            {validPromo   && <p>Description: {promo.description}</p>}
            {validPromo  && <p>Exp. Date: {promo.expirationDate}</p>}

        </div>
            <div className={"right"}>
                <h2>Enter Promo:</h2>
                <input
                    type="text"
                    value={pCode}
                    onChange={(e) => handleInputChangePromo(e.target.value)}
                /><button onClick={checkPromo}>Enter</button>
                {validPromo && <p>Promotional Code Applied</p>}
            </div>

            <div className={"right"}>
                {payments.map((paymentMethod) => (
                    <div key={paymentMethod.cardId} id={"inp_cont"}>
                        <div id={"list_slot"}>
                            <input
                                type="checkbox"
                                value={paymentMethod.cardId}
                                name="paymentMethod"
                                onChange={() => handlePaymentChange(paymentMethod)}
                            />
                            <p id={'orderconf_h1'}>{paymentMethod.firstName} {paymentMethod.lastName}</p>
                            <p id={'orderconf_h1'}>{paymentMethod.lastFourDigits}</p>
                            <p id={'orderconf_h1'}>{paymentMethod.expirationDate}</p>
                        </div>
                    </div>
                ))}
                <button id={"checkout_button"} onClick={submit}>Complete Purchase</button>
            </div>
        </div>
    );
};

export default CheckoutU;
