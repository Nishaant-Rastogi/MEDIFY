import * as React from 'react';
import PatientsRecordsCard from './PatientsRecordsCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'

const PatientsRecords = () => {
    return (
        <div>
            <Navbar />
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>
                        <PatientsRecordsCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientsRecords