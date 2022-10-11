import * as React from 'react';
import PharmacyBillsCard from './PharmacyBillsCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'

const PharmacyBills = () => {
    return (
        <div>
            <Navbar />
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>
                        <PharmacyBillsCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PharmacyBills