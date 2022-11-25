import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

function Navbar({ name }) {
  const [user, setUser] = useState('');
  let handleLogOut = () => {
    localStorage.clear();
  }
  useEffect(() => {
    if (localStorage.getItem('user') === null) {
      if (localStorage.getItem('organisation') === null) {
        if (localStorage.getItem('admin') === null) {
          window.location.href = '/';
        } else {
          setUser('admin');
        }
      } else {
        if (JSON.parse((localStorage.getItem('organisation'))).orgType === 'H') {
          setUser('hospital');
        } else if (JSON.parse(localStorage.getItem('organisation')).orgType === 'I') {
          setUser('insurance');
        } else {
          setUser('pharmacy');
        }
      }
    } else {
      if (JSON.parse(localStorage.getItem('user')).userType === 'P') {
        setUser('patients');
      } else {
        setUser('doctors');
      }
    }
  }, [])
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark USERBAR COLOR1">
        <Link to={user === 'admin' ? '/admin_user/home' : user === 'patients' ? '/user/patients/home' : user === 'doctors' ? '/user/doctors/home' : user === 'hospital' ? '/organisation/hospitals/home' : user === 'insurance' ? '/organisation/insurance/home' : user === 'pharmacy' ? '/organisation/pharmacy/home' : '/'}><b style={{ color: 'white', fontSize: '25px' }}>MEDIFY</b></Link>
        <div>
          <div className='nav-item dropdown USERDROPDOWN'>
            <img className="PROFILEIMAGE" src="/static/images/user.png" alt='/' />
            {/* <b className="PROFILE" style={{ color: 'white', paddingTop: '6px', fontSize: '20px' }}>{name}</b> */}
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