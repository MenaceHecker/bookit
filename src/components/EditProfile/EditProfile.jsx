import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './EditProfile.css';
import Header from '../header/header';
import Footer from "../footer/footer";
import EditPersonal from './EditPersonal';
import EditPayment from './EditPayment';
import OrderHistory from './OrderHistory';

function EditProfile() {
  return (
    <>
      <Header/>
      <EditPersonal/>
      <EditPayment/>
      <OrderHistory/>
      <Footer/>
    </>
  );
}

export default EditProfile;
