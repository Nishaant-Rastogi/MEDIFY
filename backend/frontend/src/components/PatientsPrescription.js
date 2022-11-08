import * as React from 'react';
import PatientsPrescriptionCard from './PatientsPrescriptionCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'

const PatientsPrescription = () => {
    const [prescriptions, setPrescriptions] = useState([]);

    let handlePrescriptions = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: localStorage.getItem('user')
        }
        fetch('/api/get-prescriptions/', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setPrescriptions(data);
            });
    }
    useEffect(() => {
        if (localStorage.getItem('user') === null) {
            window.location.href = '/';
        }
        handlePrescriptions();
    }, []);
    return (
        <div>
            <Navbar name={JSON.parse(localStorage.getItem('user')).name} />
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>

                        <PatientsPrescriptionCard prescriptions={prescriptions} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientsPrescription