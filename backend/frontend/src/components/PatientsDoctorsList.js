import * as React from 'react';
import PatientsDoctorCard from './PatientsDoctorCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'

const PatientsDoctorsList = () => {
    const [doctors, setDoctors] = useState([]);
    const [searchItem, setSearchItem] = useState('');

    let search = () => {
        doctors.map((doctor) => doctor.name === searchItem ? setDoctors(doctor) : null)
    }
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
            <div style={{ marginLeft: '400px', width: '700px' }} className="input-group mb-3">
                <input type="text" onChange={(e) => setSearchItem(e.target.value)} className="form-control" placeholder="Search Doctors Name" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                <div className="input-group-append">
                    <button onClick={search} className="btn btn-outline-secondary" type="button">Search</button>
                </div>
            </div>
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
