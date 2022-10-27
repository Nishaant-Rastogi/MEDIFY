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
        fetch('/api/get-tests/', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setTests(data)
            });
    }


    useEffect(() => {
        handleTests();
    }, [])
    return (
        <div>
            <Navbar />
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>
                        <HospitalTestsCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HospitalTests