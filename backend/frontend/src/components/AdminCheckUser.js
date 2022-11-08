import * as React from 'react';
import AdminCheckUserCard from './AdminCheckUserCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'

const AdminCheckUser = () => {
    const [UserData, setUserData] = useState([]);

    let handleCheckUser = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch('/api/get-check-users/', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setUserData(data);
            });
    }
    useEffect(() => {
        if (localStorage.getItem('admin') === null) {
            window.location.href = '/';
        }
        handleCheckUser();
    }, []);
    return (
        <div>
            <Navbar name={"Admin"} />
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>
                        <AdminCheckUserCard UserData={UserData} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminCheckUser