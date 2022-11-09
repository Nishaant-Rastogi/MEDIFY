import React, { useState, useEffect } from 'react'
import PatientsPharmacyOrdersCard from './PatientsPharmacyOrdersCard';
import Navbar from './Navbar';
import '../styles/hospitals.css'

const PatientsPharmacyOrders = () => {
    const [orders, setOrders] = useState([]);

    let handleOrders = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: localStorage.getItem('user')
        }
        fetch('/api/get-user-pharmacy-orders/', requestOptions)
            .then(response => response.json())
            .then(data => {
                setOrders(data);
            });
    }
    useEffect(() => {
        if (localStorage.getItem('user') === null) {
            window.location.href = '/';
        }
        handleOrders();
    }, []);
    return (
        <div>
            <Navbar name={localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).name : window.location.href = '/'} />
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>
                        <PatientsPharmacyOrdersCard orders={orders} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientsPharmacyOrders