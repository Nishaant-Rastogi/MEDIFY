import * as React from 'react';
import HospitalBillsCard from './HospitalBillsCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'

const HospitalBills = () => {
    return (
        <div>
            <Navbar />
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>
                        <HospitalBillsCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HospitalBills