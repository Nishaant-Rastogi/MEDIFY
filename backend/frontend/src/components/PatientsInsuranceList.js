import * as React from 'react';
import PatientsInsuranceCard from './PatientsInsuranceCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'

const PatientsInsuranceList = () => {
    return (
        <div>
            <Navbar />
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>

                        <PatientsInsuranceCard />
                    </div>
                </div>
            </div>
        </div>

    );
}

export default PatientsInsuranceList