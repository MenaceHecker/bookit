import './AdminHeader.css';
import Logo from '../../assets/bookit-high-resolution-logo-colo.png'

// Pressing logo should bring admin back to MainAdmin page, which features basic dashboard
function AdminHeader() {
    return (
        <div className="Admin_header">

        <div className="logo"> 

            <img src={Logo} alt='Logo' />
        </div>

        <div className="center">
            Welcome Admin!
        </div>

        <div className="right">
            <button className="button">Log-out</button>
        </div>

    </div>
    );
  }
  
  export default AdminHeader;