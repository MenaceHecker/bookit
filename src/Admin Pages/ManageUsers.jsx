
//table shows a user's first name, last name, email, whether they are subscribed to pomotions, and then actions (suspend, add, delete)
//suspend should prevent user from logging in and provide them with a msg that tells them that they are suspended?
// suspend users, delete users, add users

// <div className="add_users_button">
// <button onClick={togglePopout}>Add User</button>
// {showPopout && <AddMovieForm onClose={togglePopout} />} 
// </div>


import AdminHeader from "./AdminHeader/AdminHeader";
import AdminSideBar from "./AdminSideBar/AdminSideBar";
import Table from "./Table/Table";
import './ManageUsers.css';
import AddUserForm from "./UserForms/AddUserForm";
import { useContext, useState } from "react";
import Footer from "../components/footer/footer";
import { Link, useNavigate } from 'react-router-dom';
import { SessionContext } from '../utils/Session';
import {useApiData} from "../utils/API";

function ManageUsers() {
    const { currentUser } = useContext(SessionContext);
    const navigate = useNavigate();
    const [showPopout, setShowPopout] = useState(false);
    const [users, setUsers] = useState([]);
    const [refreshUsers] = useApiData(async (api) => {
        try {
            const response = await api.listAllUsers();
            if (response.ok) {
                setUsers(response.data);  //setPromos(JSON.parse(response.message));
                console.log(users);
            }
            else
                console.error(response.message);
        } catch (err) {
            console.error(err);
        }
    });
    const togglePopout = () => {
      setShowPopout(!showPopout);
    };
    function joe() {
        navigate('/')
    }
    if (!currentUser?.privileged) {
        return (
            <div className={'center_title'}>
                <h1>You are not granted access</h1>
                <button onClick={joe}>Home</button>
            </div>
        );
    }


    //refreshUsers();




    return (
        <div>
            <AdminHeader/>
            <AdminSideBar/>
            <div className="center_title">
                Manage Users
            </div>
            <div className="add_users">
                {/**<button className= "add_users_button" onClick={togglePopout}>Add User</button>
                {showPopout && <AddUserForm onClose={togglePopout} setShowPopout={setShowPopout}/>}**/}
            </div>
            <div className = "table">
                <Table data={users} pageType="ManageUsers" refresh={refreshUsers} />
            </div>
        <Footer/>
        </div>
    );
}


export default ManageUsers;
