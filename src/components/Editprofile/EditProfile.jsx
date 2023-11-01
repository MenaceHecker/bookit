import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './EditProfile.css';
import Header from '../header/header';
import Footer from "../footer/footer";
import EditPersonal from './EditPersonal';
import EditPayment from './EditPayment';
import OrderHistory from './OrderHistory';

function EditProfile() {
  // const navigate = useNavigate();
  // const [formData, setFormData] = useState({
  //   email: '',
  //   subscribe: 'off',
  //   password: '',
  //   password2: '',
  // });

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Form submitted:', formData);
  //   setFormData({
  //     email: '',
  //     subscribe: 'off',
  //     password: '',
  //     password2: '',
  //   });
  // };
  // const onClose = () => {
  //   navigate(-1);
  // };\
    let payments = [];
    const handleGetter = async () => {
        try {
            const response = await fetch('http://198.251.67.241:8080/api/listCards?sid=' + localStorage.getItem('sessionId'), {
                method: 'GET',
            });

            if (response.ok) {
                payments = await response.json();
                console.log('Form submitted successfully!', payments);
            } else {
                console.error('Error submitting form:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    handleGetter();

  return (
    <>
      <Header/>
      <EditPersonal/>
      <EditPayment payments={payments}/>
      <OrderHistory/>
      <Footer/>
    </>
  );
}

export default EditProfile;
