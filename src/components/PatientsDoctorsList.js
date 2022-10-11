import * as React from 'react';
import DoctorCard from './PatientsDoctorCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'

const DoctorsList = () => {
    return (
        <div>
            <Navbar />
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>
                        <DoctorCard />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DoctorsList
