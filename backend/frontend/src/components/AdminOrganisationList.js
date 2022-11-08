import * as React from 'react';
import AdminOrganisationCard from './AdminOrganisationCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'

const AdminOrganisationList = () => {
    const [UserData, setUserData] = useState([]);

    let handleOrganizations = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch('/api/get-organizations/', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setUserData(data);
            });
    }
    useEffect(() => {
        if (localStorage.getItem('admin') === null) {
            window.location.href = '/';
        }
        handleOrganizations();
    }, []);
    return (
        <div>
            <Navbar name={"Admin"} />
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>
                        <AdminOrganisationCard UserData={UserData} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminOrganisationList