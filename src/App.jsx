import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header/header';
import Home from './components/header/Home/Home';
import Login from './components/Login';
import 'font-awesome/css/font-awesome.min.css';
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<><Header/><Home/></>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
  );
}

export default App
