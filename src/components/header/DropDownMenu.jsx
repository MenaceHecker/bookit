import { useContext } from 'react';
import './DropDownMenu.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { APIContext } from '../../utils/API';

const DropDownMenu = () => {
    const api = useContext(APIContext);
    const c = localStorage.getItem('sessionId');
    const navigate = useNavigate();
    async function logout() {
        try {
            const response = await api.logout();
            if (!response.ok) {
                console.error('Logout failed');
                console.log(localStorage.getItem('sessionId'))
                navigate('/');
            } else {
                //const data = await response.text();
                localStorage.setItem('sessionId', null);
                localStorage.setItem('email', null)
                console.log('Logout successful:');
                localStorage.clear();
                // Handle the successful case here
                navigate('/');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            // Handle the error case here
        }
    }
    return (
        <div className="dropdown">
            <i className='fa fa-user'></i>
            <ul>
                {typeof c === "string" && c !== 'null' ? (
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
