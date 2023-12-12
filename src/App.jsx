import { useEffect, useMemo, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Slide, ToastContainer, toast } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
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
import { SessionContext, getSessionFromStorage, useSession } from './utils/Session';
import BookMovie from './components/BookMovie/BookMovie';

export default function App() {
  injectStyle();
  const [sessionData, setSessionData] = useState(getSessionFromStorage);
  const [checkoutDetails, setCheckoutDetails] = useState(null);
  const api = useMemo(() => {
    const sessionId = sessionData !== null ? sessionData.sessionId : null;
    return new API('http://198.251.67.241:8080', sessionId);
  }, [sessionData]);
  const session = useSession(api, sessionData, setSessionData);
  const [movies, setMovies] = useState([]);
  const [refreshMovies] = useApiData(async (api, tools) => {
    const response = await api.listMovies();
    if (response.ok)
      setMovies(response.data);
    else if (response.type !== 'aborted')
      toast.error(`Error fetching listings: ${response.message}`);
    tools.refreshOnTimeout(60000);
  }, { api });
  const [pendingOrder, setPendingOrder] = useState({ showingId: null, tickets: null, cardId: null });
  return (
    <APIContext.Provider value={api}>
      <SessionContext.Provider value={session}>
        <ToastContainer
          position="top-center" autoClose={2000} closeButton={false} transition={Slide}
          hideProgressBar draggable={false} theme="light"
        />
        <Routes>
          <Route path="/" element={<Homepage {...{movies, refreshMovies}}/>}/>
          <Route path="/Activate" element={<Activate/>}/>
          <Route path="/admin" element={<MainAdmin/>}/>
          <Route path="/BookingPage/:id/*" element={
            <BookingPage {...{movies, refreshMovies, pendingOrder, setPendingOrder}}/>
          }/>
          <Route path="/Checkout/" element={<Checkout {...{pendingOrder, setPendingOrder}}/>}/>
          <Route path="/CreateNewPassword" element={<CreateNewPassword/>}/>
          <Route path="/EditProfile" element={<EditProfile/>}/>
          <Route path="/ForgotPassword" element={<ForgotPassword/>}/>
          <Route path="/Homepage" element={<Homepage {...{movies, refreshMovies}}/>}/>
          <Route path="/Listing/:id/*" element={<Listings {...{movies, refreshMovies}}/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/MainAdmin" element={<MainAdmin/>}/>
          <Route path="/ManageMovies" element={<ManageMovies {...{movies, refreshMovies}}/>}/>
          <Route path="/ManagePromotions" element={<ManagePromotions/>}/>
          <Route path="/ManageUsers" element={<ManageUsers/>}/>
          <Route path="/OrderConfirmation" element={<OF/>}/>
          <Route path="/Signup" element={<Signup/>}/>
          <Route path="/TrailerPage" element={<TrailerPage/>}/>
          <Route
          path="/BookMovie/:id"
          element={<BookMovie setCheckoutDetails={setCheckoutDetails} />}
        />
        <Route
          path="/Checkout"
          element={<Checkout checkoutDetails={checkoutDetails} />}
        />
        </Routes>
      </SessionContext.Provider>
    </APIContext.Provider>
  );
}
