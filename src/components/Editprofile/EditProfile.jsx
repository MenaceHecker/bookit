import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './EditProfile.css';
import Header from '../header/header';
import Footer from "../footer/footer";
import EditPersonal from './EditPersonal';
import EditPayment from './EditPayment';

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
  // };

  return (
    <>
      <Header/>
      <EditPersonal/>
      <EditPayment/>
      <Footer/>
    </>
  );
}

export default EditProfile;
