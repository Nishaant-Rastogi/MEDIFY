import * as React from 'react';
import PharmacyBillsCard from './PharmacyBillsCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'

const PharmacyBills = () => {
    const [bills, setBills] = useState([]);

    let handleBills = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: localStorage.getItem('organisation')
        }
        fetch('/api/get-pharmacy-bills/', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setBills(data)
            });
    }

    useEffect(() => {
        handleBills();
    }, [])
    return (
        <div>
            <Navbar />
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>
                        <PharmacyBillsCard bills={bills} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PharmacyBills