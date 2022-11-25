import React, { useState, useEffect } from 'react'
import AdminActivityLogCard from './AdminActivityLogCard';
import Navbar from './Navbar';
const AdminActivityLog = () => {
    const [transactions, setTransactions] = useState([])

    let handleGetTransactions = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch('/api/get-blocks/', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setTransactions(data);
            });
    }

    useEffect(() => {
        if (localStorage.getItem('admin') === null) {
            window.location.href = '/';
        }
        handleGetTransactions();
    }, []);
    return (
        <div>
            <Navbar name={"Admin"} />
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>
                        <AdminActivityLogCard transactions={transactions} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminActivityLog