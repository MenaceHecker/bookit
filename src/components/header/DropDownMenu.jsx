import React from 'react';
import { useLocation } from 'react-router-dom';
import './DropDownMenu.css';
import { Link } from 'react-router-dom';

const DropDownMenu = () => {
  const location = useLocation();

  // Determine if the user came from the login page
  const cameFromLoginPage = location.state && location.state.from === "/Login";

  return (
    <div className="dropdown">
      <i className='fa fa-user'></i>
      <ul>
        {cameFromLoginPage ? (
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
}

export default DropDownMenu;