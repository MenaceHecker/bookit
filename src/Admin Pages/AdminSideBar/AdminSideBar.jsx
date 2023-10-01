import './AdminSideBar.css'
import { Link } from 'react-router-dom';

function AdminSideBar() {
    return (
        <div className="sidebar">
            <Link to = "/ManageMovies">
                <button>Manage Movies</button>
            </Link>

            <Link to = "/ManagePromotions">
            <button>Manage Promotions</button>
            </Link>

            <Link to = "/ManageUsers">
            <button>Manage Users</button>
            </Link>
        </div>
    );
  }
  
  export default AdminSideBar;