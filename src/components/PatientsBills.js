import * as React from 'react';
import PatientsBillsCard from './PatientsBillsCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'

const PatientsBills = () => {
    return (
        <div>
            <Navbar />
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>
                        <PatientsBillsCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientsBills