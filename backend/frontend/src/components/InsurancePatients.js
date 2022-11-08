import * as React from 'react';
import InsurancePatientsCard from './InsurancePatientsCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'

const InsurancePatients = () => {
    return (
        <div>
            <Navbar name={localStorage.getItem('organisation') ? JSON.parse(localStorage.getItem('organisation')).name : window.location.href = '/'} />
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>
                        <InsurancePatientsCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InsurancePatients