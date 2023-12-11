import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './AdminHeader.css';
import Logo from '../../assets/bookit-high-resolution-logo-colo.png'
import { SessionContext } from '../../utils/Session';

// Pressing logo should bring admin back to MainAdmin page, which features basic dashboard
function AdminHeader() {
  const session = useContext(SessionContext);
  const navigate = useNavigate();
  async function logout() {
    if (session.currentUser !== null) {
      await session.logout();
      toast.success('Logged out');
      navigate('/');
    }
  }
  return (
    <div className="Admin_header">
      <Link to="/Homepage">
        <div className="logo">
          <img src={Logo} alt="Logo"/>
        </div>
      </Link>
      <div className="center">
        Welcome Admin!
      </div>

      <div className="right_admin">
        <button onClick={logout} className="button">Log out</button>
      </div>
    </div>
  );
}
  
export default AdminHeader;
