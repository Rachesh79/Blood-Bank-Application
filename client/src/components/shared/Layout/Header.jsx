import React from 'react'
import {BiDonateBlood, BiUserCircle} from 'react-icons/bi'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function Header() {
    const {user} = useSelector(state => state.auth)
    const navigate = useNavigate()
    // logout handler
    const handleLogout = () => {
        localStorage.clear()
        alert("Logout Successfully")
        navigate('/login')
        
    }

  return (
    <>
      <nav className="navbar">
        <div className="container-fluid">
          <div className="navbar-brand">
            <BiDonateBlood color="red" /> Blood Bank App
          </div>
          <ul className="navbar-nav flex-row">
            <li className="nav-item mx-3">
              <p className="nav-link">
                <BiUserCircle /> Welcome{" "}
                {user?.name || user?.hospitalName || user?.oragnizationName}{" "}
                &nbsp;
                <span className="badge bg-secondary">{user?.role}</span>
              </p>
            </li>
            <li className="nav-item mx-3">
              <button className="btn btn-danger" onClick={handleLogout}>
                Log out
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Header
