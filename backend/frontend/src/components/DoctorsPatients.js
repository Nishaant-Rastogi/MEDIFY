import * as React from 'react';
import DoctorsPatientsCard from './DoctorsPatientsCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'

const DoctorsPatients = () => {
    return (
        <div>
            <Navbar />
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>
                        <DoctorsPatientsCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorsPatients