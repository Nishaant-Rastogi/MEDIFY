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
        }
    }
    useEffect(() => {
        handlePrescriptions();
    }, []);
    return (
        <div>
            <Navbar />
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>
                        <DoctorsPrescriptionCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorsPrescription