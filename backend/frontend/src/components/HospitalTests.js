import * as React from 'react';
import HospitalTestsCard from './HospitalTestsCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'

const HospitalTests = () => {
    const [tests, setTests] = useState([]);

    let handleTests = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: localStorage.getItem('organisation')
        }
        fetch('/api/get-hospital-tests/', requestOptions)
            .then(response => response.json())
            .then(data => {
                setTests(data)
            });
    }


    useEffect(() => {
        if (localStorage.getItem('organisation') === null) {
            window.location.href = '/';
        }
        handleTests();
    }, [])
    return (
        <div>
            <Navbar name={localStorage.getItem('organisation') ? JSON.parse(localStorage.getItem('organisation')).name : window.location.href = '/'} />
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>
                        <HospitalTestsCard tests={tests} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HospitalTests