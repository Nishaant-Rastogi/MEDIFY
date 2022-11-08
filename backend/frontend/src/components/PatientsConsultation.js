import * as React from 'react';
import PatientsConsultationCard from './PatientsConsultationsCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'

const PatientsConsultation = () => {
    const [consultations, setConsultations] = useState([]);

    let handleRecords = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: localStorage.getItem('user')
        };
        fetch('/api/get-consultations/', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setConsultations(data);
            });
    }
    useEffect(() => {
        if (localStorage.getItem('user') === null) {
            window.location.href = '/';
        }
        handleRecords();
    }, []);
    return (
        <div>
            <Navbar name={localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).name : window.location.href = '/'} />
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>
                        <PatientsConsultationCard consultations={consultations} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientsConsultation