import CheckoutHeader from './CheckoutHeader';
import CheckoutU from './CheckoutU';
import Footer from '../footer/footer';

const Checkout = ({ pendingOrder, setPendingOrder }) => {
    return (
        <>
            <CheckoutHeader/>
            <CheckoutU {...{pendingOrder, setPendingOrder}}/>
            <Footer/>
        </>
    );
}

export default Checkout;
