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
                console.log(data);
                setUserData(data);
            });
    }
    useEffect(() => {
        handleOrganizations();
    }, []);
    return (
        <div>
            <Navbar />
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