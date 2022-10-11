import * as React from 'react';
import PatientsTestsCard from './PatientsTestsCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'

const PatientsTests = () => {
    return (
        <div>
            <Navbar />
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>
                        <PatientsTestsCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientsTests