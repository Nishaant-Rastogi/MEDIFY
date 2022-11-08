import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import '../styles/hospitals.css'
import DoctorConsultationCard from './DoctorConsultationCard'

const DoctorsConsultation = () => {
    const [consultations, setConsultations] = useState([]);


    let handleConsultations = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: localStorage.getItem('user')
        }
        fetch('/api/get-doctor-consultations/', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setConsultations(data);
            });
    }

    useEffect(() => {
        if (localStorage.getItem('user') === null) {
            window.location.href = '/';
        }
        handleConsultations();
    }, []);
    return (
        <div>
            <Navbar name={localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).name : window.location.href = '/'} />
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>
                        <DoctorConsultationCard consultations={consultations} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorsConsultation