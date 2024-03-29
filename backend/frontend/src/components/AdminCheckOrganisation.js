import * as React from 'react';
import AdminCheckOrganisationCard from './AdminCheckOrganisationCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'

const AdminCheckOrganisation = () => {
    const [UserData, setUserData] = useState([]);

    let handleCheckOrganizations = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch('/api/get-check-organizations/', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setUserData(data);
            });
    }
    useEffect(() => {
        if (localStorage.getItem('admin') === null) {
            window.location.href = '/';
        }
        handleCheckOrganizations();
    }, []);
    return (
        <div>
            <Navbar name={"Admin"} />
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>
                        <AdminCheckOrganisationCard UserData={UserData} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminCheckOrganisation