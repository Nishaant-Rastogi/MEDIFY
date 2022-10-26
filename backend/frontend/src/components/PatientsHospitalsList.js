import * as React from 'react';
import PatientsHospitalCard from './PatientsHospitalCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'

const PatientsHospitalsList = () => {
    const [hospitals, setHospitals] = useState([]);

    let handleHospitals = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch('/api/get-hospitals/', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setHospitals(data);
            });
    }
    useEffect(() => {
        handleHospitals();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>
                        <PatientsHospitalCard hospitals={hospitals} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PatientsHospitalsList
