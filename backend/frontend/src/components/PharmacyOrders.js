import * as React from 'react';
import PharmacyOrdersCard from './PharmacyOrdersCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'

const PharmacyOrders = () => {
    const [orders, setOrders] = useState([]);

    let handleOrders = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: localStorage.getItem('organisation')
        }
        fetch('/api/get-pharmacy-orders/', requestOptions)
            .then(response => response.json())
            .then(data => {
                setOrders(data);
            });
    }

    useEffect(() => {
        if (localStorage.getItem('organisation') === null) {
            window.location.href = '/';
        }
        handleOrders();
    }, []);

    return (
        <div>
            <Navbar name={localStorage.getItem('organisation') ? JSON.parse(localStorage.getItem('organisation')).name : window.location.href = '/'} />
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>
                        <PharmacyOrdersCard orders={orders} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PharmacyOrders