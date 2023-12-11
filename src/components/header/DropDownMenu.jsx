import { useContext } from 'react';
import './DropDownMenu.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SessionContext } from '../../utils/Session';

const DropDownMenu = () => {
    const session = useContext(SessionContext);
    const navigate = useNavigate();
    async function logout() {
        if (session.currentUser !== null) {
            await session.logout();
            console.log('Logout successful');
            // Handle the successful case here
            navigate('/');
        }
    }
    return (
        <div className="dropdown">
            <i className='fa fa-user'></i>
            <ul>
                {session.currentUser !== null ? (
                    <>
                        <li onClick={logout}>Log out</li>
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
