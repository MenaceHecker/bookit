import React, {useState, useContext, useEffect} from 'react';
import './check.css';
import { APIContext, useApiData } from '../../utils/API';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CheckoutU = ({ pendingOrder, setPendingOrder }) => {
    const navigate = useNavigate();
    const [ticketTypes, setTicketTypes] = useState(null);
    const [paymentCards, setPaymentCards] = useState(null);
    const [promoCode, setPromoCode] = useState('');
    const [promotion, setPromotion] = useState(null);
    const [selectedCardId, setSelectedCardId] = useState(null);

    useApiData(async (api) => {
        const response = await api.listTicketTypes();
        if (response.ok)
            setTicketTypes(response.data);
        else if (response.type !== 'aborted')
            toast.error(`Error fetching ticket types: ${response.message}`);
    });

    const [refreshPaymentCards] = useApiData(async (api) => {
        const response = await api.listCards();
        if (response.ok)
            setPaymentCards(response.data);
        else if (response.type !== 'aborted')
            toast.error(`Error fetching cards: ${response.message}`);
    });

    useEffect(() => {
        if (!paymentCards || paymentCards.length === 0)
            setSelectedCardId(null);
        else if (!paymentCards.some((card) => card.cardId === selectedCardId))
            setSelectedCardId(paymentCards[0].cardId);
    }, [paymentCards, selectedCardId]);

    let totalPrice = 0.0;
    if (ticketTypes)
        for (const { type } of pendingOrder.tickets)
            totalPrice += ticketTypes.find((t) => t.name === type).price;
    if (promotion)
        totalPrice *= (100 - promotion.discountPct) / 100;
    totalPrice = Math.round(totalPrice * 100) / 100;

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

    const previousPaymentSelected = true;

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
        refreshPaymentCards();
    };
    const save_payment = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', paymentFormData);
        addCard(paymentFormData);
    };
    const submit = async (e) => {
        e.preventDefault();
        const book = {
            showingId: pendingOrder.showingId,
            cardId: selectedCardId,
            promoCode: promotion !== null ? promoCode : null,
            tickets: pendingOrder.tickets,
        };
        const response = await api.createBooking(book);
        if (response.ok) {
            toast.success('Tickets have been booked');
            navigate('/OrderConfirmation');
            setPendingOrder((order) => ({ ...order, showingId: null, bookingId: null }));
        } else {
            toast.error(`Error: ${response.message}`);
        }
    };

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
        setPromoCode(s);
        setPromotion(null);
    };
    const checkPromo = async () => {
        const response = await api.getPromotionFromCode(promoCode);
        if (response.ok) {
            setPromotion(response.data);
            toast.success('Promo code applied');
        } else {
            toast.error(`Error: ${response.message}`);
        }
    };

    if (!ticketTypes || !paymentCards)
        return <></>;

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
            <div id={"inp_cont"}>
                <h2 id={'orderconf_h1'}>Tickets:</h2>
                {pendingOrder.tickets.map(({ type, seatNum }) => {
                    let price = ticketTypes.find((t) => t.name === type).price;
                    return (<p key={seatNum}>{type}: ${price.toFixed(2)}</p>);
                })}
            </div>
            <p>Total Price: {totalPrice}</p>
            {promotion !== null && <p id={'orderconf_h1'}>Discount: {promotion.name}</p>}
            {promotion !== null && <p>Percentage: {promotion.discountPct}</p>}
            {promotion !== null && <p>Description: {promotion.description}</p>}
            {promotion !== null && <p>Exp. Date: {promotion.expirationDate}</p>}

        </div>
            <div className={"right"}>
                <h2>Enter Promo Code:</h2>
                <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => handleInputChangePromo(e.target.value)}
                /><button onClick={checkPromo}>Enter</button>
            </div>

            <div className={"right"}>
                {paymentCards.map((card) => (
                    <div key={card.cardId} id={"inp_cont"}>
                        <div id={"list_slot"}>
                            <input
                                type="radio"
                                value={card.cardId}
                                name="paymentCard"
                                checked={selectedCardId === card.cardId}
                                onChange={() => setSelectedCardId(card.cardId)}
                            />
                            <p id={'orderconf_h1'}>{card.firstName} {card.lastName}</p>
                            <p id={'orderconf_h1'}>{card.lastFourDigits}</p>
                            <p id={'orderconf_h1'}>{card.expirationDate}</p>
                        </div>
                    </div>
                ))}
                <button id={"checkout_button"} onClick={submit}>Complete Purchase</button>
            </div>
        </div>
    );
};

export default CheckoutU;
