import { useMemo, useState } from 'react';
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
import Listings from './components/Listing/Listings';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import TrailerPage from './components/TrailerPage/TrailerPage';
import { API, APIContext, useApiData } from './utils/API';

export default function App() {
  const api = useMemo(() => new API('http://198.251.67.241:8080'), []);
  const [movies, setMovies] = useState([]);
  const [refreshMovies] = useApiData(async (api, tools) => {
    try {
      const response = await api.listMovies();
      if (response.ok)
        setMovies(response.data);
      tools.refreshOnTimeout(60000);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, { api });
  return (
    <APIContext.Provider value={api}>
      <Routes>
        <Route path="/" element={<Homepage {...{movies, refreshMovies}}/>}/>
        <Route path="/Activate" element={<Activate/>}/>
        <Route path="/admin" element={<MainAdmin/>}/>
        <Route path="/BookingPage" element={<BookingPage/>}/>
        <Route path="/Checkout" element={<Checkout/>}/>
        <Route path="/CreateNewPassword" element={<CreateNewPassword/>}/>
        <Route path="/EditProfile" element={<EditProfile/>}/>
        <Route path="/ForgotPassword" element={<ForgotPassword/>}/>
        <Route path="/Homepage" element={<Homepage {...{movies, refreshMovies}}/>}/>
        <Route path="/Listing/:id/*" element={<Listings {...{movies, refreshMovies}}/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/MainAdmin" element={<MainAdmin/>}/>
        <Route path="/ManageMovies" element={<ManageMovies/>}/>
        <Route path="/ManagePromotions" element={<ManagePromotions/>}/>
        <Route path="/ManageUsers" element={<ManageUsers/>}/>
        <Route path="/OrderConfirmation" element={<OF/>}/>
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/TrailerPage" element={<TrailerPage/>}/>
      </Routes>
    </APIContext.Provider>
  );
}
