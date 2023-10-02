import AdminHeader from "./AdminHeader/AdminHeader";
import AdminSideBar from "./AdminSideBar/AdminSideBar";
import './MainAdmin.css'
import Footer from "../components/footer/footer";

//horzontal sidebar with Manage Users/Manage Promotions/Manage Movies button
//header at top
//alternating colors?

//"Welcome Admin!"" in header and blank page

//create header.jsx, sidebar.jsx, header.css, sidebar.css


function MainAdmin() {
    return (
      <div className="MainAdmin">
        <AdminHeader/>
        <AdminSideBar/>
          <Footer/>
      </div>
    );
  }

  export default MainAdmin;



// welcome