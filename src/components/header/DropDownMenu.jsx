import React from 'react';
import './DropDownMenu.css';
import { Link } from 'react-router-dom';

const DropDownMenu = () => {
  return (
    <div>
      <ul>
        <li>
          <i className='fa fa-user'></i>
          <ul className="dropdown">
            <li><Link to="/Login">Login</Link></li>
            <li><Link to="/Signup">Register</Link></li>
            <li><Link to="/Activate">Activate</Link></li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default DropDownMenu;
