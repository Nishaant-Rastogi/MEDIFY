import * as React from 'react';
import PatientsPharmacyCard from './PatientsPharmacyCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'

const PharmacyList = () => {
    return (
        <div>
            <Navbar />
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>

                        <PatientsPharmacyCard />
                    </div>
                </div>
            </div>
        </div>

    );
}

export default PharmacyList