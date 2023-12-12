import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <section id="footer">
      <footer>
        <div className="container">
          <div className="box">
            <ul className="flex">
              <li>Terms of Use</li>
              <li>Privacy-Policy</li>
              <li>No Refunds</li>
              <li>FAQ</li>
              <li>Book</li>
            </ul>
            <p>
              © 2023 Bookit. All Rights Reserved. All movies on this platform
              are trademarks of, and all related images and content are the
              property of, Bookit and the people who worked on it. Duplication
              and copy of this is strictly prohibited. All rights reserved.
            </p>
          </div>
          <div className="box">
            <h3>Follow Us</h3>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
          <div className="box">
            <h3>Bookit</h3>
            <div className="img flexSB">
              <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
                <img src="https://img.icons8.com/color/48/000000/apple-app-store--v3.png" alt="App Store" />
                <span>App Store</span>
              </a>
              <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
                <img src="https://img.icons8.com/fluency/48/000000/google-play.png" alt="Google Play Store" />
                <span>Google Play Store</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
