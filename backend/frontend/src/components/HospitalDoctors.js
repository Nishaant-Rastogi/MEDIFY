import * as React from 'react';
import HospitalDoctorsCard from './HospitalDoctorsCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'

const HospitalDoctors = () => {
    return (
        <div>
            <Navbar />
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>
                        <HospitalDoctorsCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HospitalDoctors