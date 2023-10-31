import React from 'react';
import { Link } from 'react-router-dom';

const DropDownMenu = () => {
  // Retrieve the session ID from local storage
  const sessionId = localStorage.getItem('sessionId');

  // Check if the user is logged in
  const isLoggedIn = sessionId !== null && sessionId !== "0";

  return (
    <div className="dropdown">
      <i className='fa fa-user'></i>
      <ul>
        {isLoggedIn ? (
          <>
            <li><Link to="/">Log Out</Link></li>
            <li><Link to="/EditProfile">Edit Profile</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/Login">Log In</Link></li>
            <li><Link to="/Signup">Sign Up</Link></li>
          </>
        )}
      </ul>
    </div>
  );
};

export default DropDownMenu;