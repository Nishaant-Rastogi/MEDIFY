import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

function Navbar({ userData }) {

  let handleLogOut = () => {
    localStorage.clear();
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark USERBAR COLOR1">
        <Link href="/User/user"><b>MEDIFY</b></Link>
        <div>
          <div className='nav-item dropdown USERDROPDOWN'>
            <img className="PROFILEIMAGE" src="/static/images/user.png" alt='/' />
            <Link to="/user/profile"><button className='btn btn-outline-light PROFILE'>Profile</button></Link>
            <Link to="/"><button onClick={handleLogOut} className="btn btn-outline-light LOGOUT">Logout</button></Link>
          </div>
          <div>

          </div>
        </div>
        <div>

        </div>
      </nav>

    </div>
  )
}
export default Navbar;