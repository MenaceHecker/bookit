import Header from "../header/header";
import CheckoutU from "./CheckoutU";
import Footer from "../footer/footer";
import {useParams} from 'react-router-dom';
import { useEffect } from 'react';
const Checkout = ({movies, refreshMovies}) => {
    const {encodedDetails } = useParams();
    const decodedDetails = JSON.parse(decodeURIComponent(encodedDetails));
    return (
        <>
            <Header/>
            {decodedDetails && <CheckoutU {...decodedDetails}/>}
            <Footer/>
        </>
    );
}

export default Checkout;