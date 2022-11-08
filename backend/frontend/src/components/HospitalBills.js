import * as React from 'react';
import HospitalBillsCard from './HospitalBillsCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'

const HospitalBills = () => {
    const [bills, setBills] = useState([]);

    let handleBills = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: localStorage.getItem('organisation')
        }
        fetch('/api/get-hospital-bills/', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setBills(data);
            });
    }


    useEffect(() => {
        if (localStorage.getItem('organisation') === null) {
            window.location.href = '/';
        }
        handleBills();
    }, [])
    return (
        <div>
            <Navbar name={localStorage.getItem('organisation') ? JSON.parse(localStorage.getItem('organisation')).name : window.location.href = '/'} />
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>
                        <HospitalBillsCard bills={bills} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HospitalBills