import * as React from 'react';
import PharmacyOrdersCard from './PharmacyOrdersCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'

const PharmacyOrders = () => {
    return (
        <div>
            <Navbar name={JSON.parse(localStorage.getItem('organisation')).name} />
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>
                        <PharmacyOrdersCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PharmacyOrders