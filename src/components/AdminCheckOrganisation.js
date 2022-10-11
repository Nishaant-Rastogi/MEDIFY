import * as React from 'react';
import AdminCheckOrganisationCard from './AdminCheckOrganisationCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'

const AdminCheckOrganisation = () => {
    return (
        <div>
            <Navbar />
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>
                        <AdminCheckOrganisationCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminCheckOrganisation