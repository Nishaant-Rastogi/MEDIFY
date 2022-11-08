import * as React from 'react';
import PharmacyInventoryCard from './PharmacyInventoryCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'

const PharmacyInventory = () => {
    return (
        <div>
            <Navbar name={JSON.parse(localStorage.getItem('organisation')).name} />
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>
                        <PharmacyInventoryCard />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default PharmacyInventory