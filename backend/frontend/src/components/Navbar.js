import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

function Navbar({ name }) {

  let handleLogOut = () => {
    localStorage.clear();
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark USERBAR COLOR1">
        <b style={{ color: 'white', fontSize: '30px' }}>MEDIFY</b>
        <div>
          <div className='nav-item dropdown USERDROPDOWN'>
            <img className="PROFILEIMAGE" src="/static/images/user.png" alt='/' />
            <b className="PROFILE" style={{ color: 'white', paddingTop: '6px', fontSize: '20px' }}>{name}</b>
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