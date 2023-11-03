import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminHeader.css';
import Logo from '../../assets/bookit-high-resolution-logo-colo.png'
import { APIContext } from '../../utils/API';

// Pressing logo should bring admin back to MainAdmin page, which features basic dashboard
function AdminHeader() {
    const api = useContext(APIContext);
    const navigate = useNavigate();
    async function logout() {
        try {
            const response = await api.logout();
            if (!response.ok) {
                console.error('Login failed');
                navigate('/');
            } else {
                //const data = await response.text();
                localStorage.setItem('sessionId', null);
                localStorage.setItem('email', null)
                console.log('Logout successful:');
                // Handle the successful case here
                navigate('/');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            // Handle the error case here
        }
    }
    return (
        <div className="Admin_header">
        <Link to='/Homepage'>
        <div className="logo"> 

            <img src={Logo} alt='Logo' />
        </div>
        </Link>
        <div className="center">
            Welcome Admin!
        </div>

        <div className="right_admin">
            <button onClick={logout} className="button">Log-out</button>
        </div>

    </div>
    );
  }
  
  export default AdminHeader;
