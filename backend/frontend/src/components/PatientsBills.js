import * as React from 'react';
import PatientsBillsCard from './PatientsBillsCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'

const PatientsBills = () => {
    const [bills, setBills] = useState([]);

    let handleBills = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: localStorage.getItem('user')
        }
        fetch('/api/get-bills/', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setBills(data);
            });
    }
    useEffect(() => {
        if (localStorage.getItem('user') === null) {
            window.location.href = '/';
        }
        handleBills();
    }, []);
    return (
        <div>
            <Navbar name={localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).name : window.location.href = '/'} />
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>
                        <PatientsBillsCard bills={bills} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientsBills