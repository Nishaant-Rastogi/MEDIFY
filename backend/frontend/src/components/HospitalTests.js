import * as React from 'react';
import HospitalTestsCard from './HospitalTestsCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'

const HospitalTests = () => {
    return (
        <div>
            <Navbar />
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>
                        <HospitalTestsCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HospitalTests