import * as React from 'react';
import DoctorsPrescriptionCard from './DoctorsPrescriptionCard';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import '../styles/hospitals.css'

const DoctorsPrescription = () => {
    const [prescriptions, setPrescriptions] = useState([]);

    let handlePrescriptions = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: localStorage.getItem('user')
        }
        fetch('/api/get-doctor-prescriptions/', requestOptions)
            .then(response => response.json())
            .then(data => {
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
                        <DoctorsPrescriptionCard prescriptions={prescriptions} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorsPrescription