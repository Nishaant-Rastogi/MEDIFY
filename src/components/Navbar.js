import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

function Userbar({ userData }) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark USERBAR COLOR1">
        <Link href="/User/user"><a className="navbar-brand HEADING"><b>MEDIFY</b></a></Link>
        <div>
          <div className='nav-item dropdown USERDROPDOWN'>
            <img className="PROFILEIMAGE" src="/user.png" />
            <p className="USERNAME">Name</p>
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></a>
            <div className="dropdown-menu DROPDOWN COLOR2" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" onClick={"handler1"}>Profile</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" onClick={"LogOutHandler"}>Logout</a>
            </div>
          </div>
        </div>
        <div>

        </div>
      </nav>

    </div>
  )
}
export default Userbar;