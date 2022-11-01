import * as React from 'react';
import AdminUserCard from './AdminUserCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'

const AdminUserList = () => {
    const [UserData, setUserData] = useState([]);

    let handleUser = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch('/api/get-users/', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setUserData(data);
            });
    }
    useEffect(() => {
        handleUser();
    }, []);
    return (
        <div>
            <Navbar />
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>
                        <AdminUserCard UserData={UserData} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminUserList