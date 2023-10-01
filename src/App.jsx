import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import Homepage from '../src/components/Homepage/Homepage'
import Login from './components/Login';
import TrailerPage from './components/TrailerPage/TrailerPage';
const App = () => {
  return (
    <>
        <Routes>
          <Route exact path='/' element={<Homepage/>} />
          <Route exact path='/' element={<TrailerPage/>}/>
          <Route exact path="/login" element={<Login/>}/>
        </Routes>
    </>
  );
};

export default App;
