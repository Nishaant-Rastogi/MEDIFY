import * as React from 'react';
import PatientsTestsCard from './PatientsTestsCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'

const PatientsTests = () => {
    const [tests, setTests] = useState([]);

    let handleTests = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: localStorage.getItem('user')
        }
        fetch('/api/get-test-results/', requestOptions)
            .then(response => response.json())
            .then(data => {
                setTests(data);
            });
    }
    useEffect(() => {
        if (localStorage.getItem('user') === null) {
            window.location.href = '/';
        }
        handleTests();
    }, []);
    return (
        <div>
            <Navbar name={localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).name : window.location.href = '/'} />
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>
                        <PatientsTestsCard tests={tests} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientsTests