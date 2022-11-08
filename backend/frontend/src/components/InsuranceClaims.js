import * as React from 'react';
import InsuranceClaimsCard from './InsuranceClaimsCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'

const InsuranceClaims = () => {
    return (
        <div>
            <Navbar name={JSON.parse(localStorage.getItem('organisation')).name} />
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>
                        <InsuranceClaimsCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InsuranceClaims