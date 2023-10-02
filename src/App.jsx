import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import Homepage from '../src/components/Homepage/Homepage'
import Signup from './components/Signup/Signup';
import TrailerPage from './components/TrailerPage/TrailerPage';
import MainAdmin from './Admin Pages/MainAdmin';
import Login from './components/Login/Login';
const App = () => {
  return (
    <>
        <Routes>
          <Route exact path='/' element={<Homepage/>} />
          <Route exact path='/TrailerPage' element={<TrailerPage/>}/>
          <Route exact path='/MainAdmin' element={<MainAdmin/>}/>

        </Routes>
    </>
  );
};

export default App;
