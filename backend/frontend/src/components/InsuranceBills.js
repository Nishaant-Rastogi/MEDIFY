import * as React from 'react';
import InsuranceBillsCard from './InsuranceBillsCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'

const InsuranceBills = () => {
    return (
        <div>
            <Navbar name={JSON.parse(localStorage.getItem('organisation')).name} />
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