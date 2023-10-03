import React from 'react';
import './DropDownMenu.css';
import { Link } from 'react-router-dom';

const DropDownMenu = () => {
  return (
    <div className="dropdown">
          <i className='fa fa-user'></i>
          <ul>
            <li><Link to="/Login">Log In</Link></li>
            <li><Link to="/Signup">Sign Up</Link></li>
          </ul>
    </div>
  );
}

export default DropDownMenu;
