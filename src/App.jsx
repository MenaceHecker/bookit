import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import MainAdmin from './Admin Pages/MainAdmin';
import ManageMovies from './Admin Pages/ManageMovies';
import ManagePromotions from './Admin Pages/ManagePromotions';
import ManageUsers from './Admin Pages/ManageUsers';
import Activate from './components/Activate/Activate';
import BookingPage from './components/BookMovie/BookingPage';
import Checkout from './components/checkout/Checkout';
import OF from './components/checkout/OF';
import EditProfile from './components/EditProfile/EditProfile';
import CreateNewPassword from './components/ForgotPassword/CreateNewPassword';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import Homepage from './components/Homepage/Homepage';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import TrailerPage from './components/TrailerPage/TrailerPage';
import Listing from './components/Listing/Listing';
import { API, APIContext } from './utils/API';
export default function App() {
    const api = new API('http://198.251.67.241:8080');
    const [dynamicRoutes, setDynamicRoutes] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.listMovies();
                const data = response.data;
                console.log(data);

                const listings = data.map(listing => ({
                    path: '/' + listing.movieTitle,
                    element: <Listing {...listing} />
                }));
                setDynamicRoutes(listings);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [api]);
    const staticRoutes = [
        { path: '/', element: <Homepage /> },
        { path: '/Activate', element: <Activate /> },
        { path: '/admin', element: <MainAdmin /> },
        { path: '/BookingPage', element: <BookingPage /> },
        { path: '/Checkout', element: <Checkout /> },
        { path: '/CreateNewPassword', element: <CreateNewPassword /> },
        { path: '/EditProfile', element: <EditProfile /> },
        { path: '/ForgotPassword', element: <ForgotPassword /> },
        { path: '/Homepage', element: <Homepage /> },
        { path: '/Login', element: <Login /> },
        { path: '/MainAdmin', element: <MainAdmin /> },
        { path: '/ManageMovies', element: <ManageMovies /> },
        { path: '/ManagePromotions', element: <ManagePromotions /> },
        { path: '/ManageUsers', element: <ManageUsers /> },
        { path: '/OrderConfirmation', element: <OF /> },
        { path: '/Signup', element: <Signup /> },
        { path: '/TrailerPage', element: <TrailerPage /> },
    ];
    const allRoutes = [...staticRoutes, ...dynamicRoutes];
    return (
        <APIContext.Provider value={api}>
            <Routes>
                {allRoutes.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element} />
                ))}
            </Routes>
        </APIContext.Provider>
    );
}
