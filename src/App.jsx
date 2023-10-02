import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import Homepage from '../src/components/Homepage/Homepage'
import TrailerPage from './components/TrailerPage/TrailerPage';
import MainAdmin from './Admin Pages/MainAdmin';
import Checkout from "./components/checkout/Checkout.jsx";
import OF from "./components/checkout/OF";
const App = () => {
  return (
    <>
        <Routes>
          <Route exact path='/' element={<Homepage/>} />
          <Route exact path='/TrailerPage' element={<TrailerPage/>}/>
          <Route exact path='/MainAdmin' element={<MainAdmin/>}/>
            <Route exact path='/Checkout' element={<Checkout/>}/>
            <Route exact path='/OrderConfirmation' element={<OF/>}/>

        </Routes>
    </>
  );
};

export default App;
