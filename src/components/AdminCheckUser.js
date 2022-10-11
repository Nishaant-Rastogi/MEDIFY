import * as React from 'react';
import AdminCheckUserCard from './AdminCheckUserCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'

const AdminCheckUser = () => {
    return (
        <div>
            <Navbar />
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>
                        <AdminCheckUserCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminCheckUser