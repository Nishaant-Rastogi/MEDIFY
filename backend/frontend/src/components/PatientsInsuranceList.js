import * as React from 'react';
import PatientsInsuranceCard from './PatientsInsuranceCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'

const PatientsInsuranceList = () => {
    const [insurances, setInsurances] = useState([]);

    let handleInsurances = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch('/api/get-insurance-companies/', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setInsurances(data);
            });
    }
    useEffect(() => {
        handleInsurances();
    }, []);
    return (
        <div>
            <Navbar />
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>

                        <PatientsInsuranceCard insurances={insurances} />
                    </div>
                </div>
            </div>
        </div>

    );
}

export default PatientsInsuranceList