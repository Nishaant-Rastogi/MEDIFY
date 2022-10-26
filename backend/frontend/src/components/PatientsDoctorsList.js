import * as React from 'react';
import PatientsDoctorCard from './PatientsDoctorCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'

const PatientsDoctorsList = () => {
    const [doctors, setDoctors] = useState([]);

    let handleDoctors = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch('/api/get-doctors/', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setDoctors(data);
            });
    }

    useEffect(() => {
        handleDoctors();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>
                        <PatientsDoctorCard doctors={doctors} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PatientsDoctorsList
