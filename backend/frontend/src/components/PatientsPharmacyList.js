import * as React from 'react';
import PatientsPharmacyCard from './PatientsPharmacyCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'

const PharmacyList = () => {
    const [pharmacies, setPharmacies] = useState([]);
    const [searchItem, setSearchItem] = useState('');

    let search = () => {
        pharmacies.map((pharmacy) => pharmacy.name === searchItem ? setPharmacies(pharmacy) : null)

    }

    let handlePharmacies = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch('/api/get-pharmacies/', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setPharmacies(data);
            });
    }
    useEffect(() => {
        handlePharmacies();
    }, []);
    return (
        <div>
            <Navbar />
            <div style={{ marginLeft: '400px', width: '700px' }} className="input-group mb-3">
                <input type="text" onChange={(e) => setSearchItem(e.target.value)} className="form-control" placeholder="Search Pharmacy Name" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                <div className="input-group-append">
                    <button onClick={search} className="btn btn-outline-secondary" type="button">Search</button>
                </div>
            </div>
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>
                        <PatientsPharmacyCard pharmacies={pharmacies} />
                    </div>
                </div>
            </div>
        </div>

    );
}

export default PharmacyList