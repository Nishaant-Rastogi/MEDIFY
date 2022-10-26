import * as React from 'react';
import PatientsRecordsCard from './PatientsRecordsCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'

const PatientsRecords = () => {
    const [records, setRecords] = useState([]);

    let handleRecords = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch('/api/get-records/', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setRecords(data);
            });
    }
    useEffect(() => {
        handleRecords();
    }, []);
    return (
        <div>
            <Navbar />
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>
                        <PatientsRecordsCard records={records} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientsRecords