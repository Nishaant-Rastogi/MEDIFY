import * as React from 'react';
import HospitalDoctorsCard from './HospitalDoctorsCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'

const HospitalDoctors = () => {
    const [doctors, setDoctors] = useState([]);

    let handleDoctors = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: localStorage.getItem('organisation')
        }
        fetch('/api/get-hospital-doctors/', requestOptions)
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
            <Navbar name={localStorage.getItem('organisation') ? JSON.parse(localStorage.getItem('organisation')).name : window.location.href = '/'} />
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>
                        <HospitalDoctorsCard doctors={doctors} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HospitalDoctors