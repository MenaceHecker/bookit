import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import Homepage from '../src/components/Homepage/Homepage'
import TrailerPage from './components/TrailerPage/TrailerPage';
import MainAdmin from './Admin Pages/MainAdmin';
import Checkout from "./components/checkout/Checkout.jsx";
import OF from "./components/checkout/OF";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import ManageMovies from "./Admin Pages/ManageMovies";
import ManageUsers from "./Admin Pages/ManageUsers";
import ManagePromotions from "./Admin Pages/ManagePromotions";
const App = () => {
  return (
    <>
        <Routes>
          <Route exact path='/' element={<Homepage/>} />
          <Route exact path='/TrailerPage' element={<TrailerPage/>}/>
          <Route exact path='/MainAdmin' element={<MainAdmin/>}/>
            <Route exact path='/Checkout' element={<Checkout/>}/>
            <Route exact path='/OrderConfirmation' element={<OF/>}/>
            <Route exact path='/Login' element={<Login/>}/>
          <Route exact path='/Signup' element={<Signup/>}/>
          <Route exact path='/admin' element={<MainAdmin/>}/>
          <Route exact path='/manage-movies' element={<ManageMovies/>}/>
          <Route exact path='/manage-users' element={<ManageUsers/>}/>
          <Route exact path='/manage-promo' element={<ManagePromotions/>}/>

        </Routes>
    </>
  );
};

export default App;
