import * as React from 'react';
import PatientsPharmacyCard from './PatientsPharmacyCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'

const PharmacyList = () => {
    const [pharmacies, setPharmacies] = useState([]);

    let handlePharmacies = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch('/api/get-pharmacies/', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setPharmacies(data);
            });
    }
    useEffect(() => {
        handlePharmacies();
    }, []);
    return (
        <div>
            <Navbar />
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>
                        <PatientsPharmacyCard pharmacies={pharmacies} />
                    </div>
                </div>
            </div>
        </div>

    );
}

export default PharmacyList