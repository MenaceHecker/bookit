import React, { useState } from "react"
import { Link } from 'react-router-dom';
import "./header.css"
import Logo from '../../assets/bookit-high-resolution-logo-colo.png'

const Header = () => {
  const [Mobile, setMobile] = useState(false)
  return (
    <>
      <header>
        <div className='container flexSB'>
          <nav className='flexSB'>
            <div className='logo'>
              <img src={Logo} alt='Logo' />
            </div>
            {/*<ul className='flexSB'>*/}
            <ul className={Mobile ? "navMenu-list" : "flexSB"} onClick={() => setMobile(false)}>
              <li>
                <a href='/'>Home</a>
              </li>
              <li>
                <a href='/'>Movies</a>
              </li>
              <li>
                <a href='/'>Book</a>
              </li>
              <li>
                <a href='/'>Contact Us</a>
              </li>
            </ul>
            <button className='toggle' onClick={() => setMobile(!Mobile)}>
              {Mobile ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}
            </button>
          </nav>
          <div className='account flexSB'>
            <div className="search-bar">
              <input type="text" className="search-bar_input" placeholder="Search for Movies"/>
              <i className='fa fa-search' ></i>
            </div>
            <Link to="/login">
              <i className='fa fa-user'></i>
            </Link>
            <button className="btn_book">Book Now</button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
