import * as React from 'react';
import HospitalCard from './PatientsHospitalCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'
const HospitalsList = () => {
    return (
        <div>
            <Navbar />
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>

                        <HospitalCard />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HospitalsList
