import * as React from 'react';
import InsuranceBillsCard from './InsuranceBillsCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'

const InsuranceBills = () => {
    return (
        <div>
            <Navbar name={localStorage.getItem('organisation') ? JSON.parse(localStorage.getItem('organisation')).name : window.location.href = '/'} />
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>
                        <InsuranceBillsCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InsuranceBills