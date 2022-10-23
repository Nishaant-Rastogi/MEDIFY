import * as React from 'react';
import PatientsPrescriptionCard from './PatientsPrescriptionCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'

const PatientsPrescription = () => {
    return (
        <div>
            <Navbar />
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>

                        <PatientsPrescriptionCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientsPrescription