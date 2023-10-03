
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
import { useState } from "react";
import Footer from "../components/footer/footer";
function ManageUsers() {

    const [showPopout, setShowPopout] = useState(false);

    const togglePopout = () => {
      setShowPopout(!showPopout);
    };
  
    
    const mockData = [
        {
          id: 1,
          email: 'john@uga.edu',
          firstName: 'John',
          lastName: 'Doe',
          verificationStatus: 'verified',
        },
        {
            id: 2,
            email: 'jane@uga.edu',
            firstName: 'Jane',
            lastName: 'Doe',
            verificationStatus: 'unverified',
          },
        
      ];
    





    return (
        <div>
            <AdminHeader/>
            <AdminSideBar/>

            <div className="center_title">
                Manage Users
            </div>

            <div className="add_users">
                <button className= "add_users_button" onClick={togglePopout}>Add User</button>
                {showPopout && <AddUserForm onClose={togglePopout} setShowPopout={setShowPopout}/>} 
            </div>

            <div className = "table">
                <Table data={mockData} pageType="ManageUsers" />
            </div>


        <Footer/>
        </div>
    );
}


export default ManageUsers;