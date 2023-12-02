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
import EditProfile from './components/Editprofile/EditProfile';
import CreateNewPassword from './components/ForgotPassword/CreateNewPassword';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import Homepage from './components/Homepage/Homepage';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import TrailerPage from './components/TrailerPage/TrailerPage';
import { API, APIContext } from './utils/API';

export default function App() {
  const api = new API('http://198.251.67.241:8080');
  return (
    <APIContext.Provider value={api}>
      <Routes>
        <Route exact path="/" element={<Homepage/>}/>
        <Route exact path="/Activate" element={<Activate/>}/>
        <Route exact path="/admin" element={<MainAdmin/>}/>
        <Route exact path="/BookingPage" element={<BookingPage/>}/>
        <Route exact path="/Checkout" element={<Checkout/>}/>
        <Route exact path="/CreateNewPassword" element={<CreateNewPassword/>}/>
        <Route exact path="/EditProfile" element={<EditProfile/>}/>
        <Route exact path="/ForgotPassword" element={<ForgotPassword/>}/>
        <Route exact path="/Homepage" element={<Homepage/>}/>
        <Route exact path="/Login" element={<Login/>}/>
        <Route exact path="/MainAdmin" element={<MainAdmin/>}/>
        <Route exact path="/ManageMovies" element={<ManageMovies/>}/>
        <Route exact path="/ManagePromotions" element={<ManagePromotions/>}/>
        <Route exact path="/ManageUsers" element={<ManageUsers/>}/>
        <Route exact path="/OrderConfirmation" element={<OF/>}/>
        <Route exact path="/Signup" element={<Signup/>}/>
        <Route exact path="/TrailerPage" element={<TrailerPage/>}/>
      </Routes>
    </APIContext.Provider>
  );
}
