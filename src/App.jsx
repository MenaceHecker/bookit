import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import Activate from './components/Activate/Activate';
import Homepage from '../src/components/Homepage/Homepage'
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import TrailerPage from './components/TrailerPage/TrailerPage';
const App = () => {
  return (
    <>
        <Routes>
          <Route exact path='/' element={<Homepage/>} />
          <Route exact path='/' element={<TrailerPage/>}/>
          <Route exact path="/activate" element={<Activate/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/signup" element={<Signup/>}/>
        </Routes>
    </>
  );
};

export default App;
