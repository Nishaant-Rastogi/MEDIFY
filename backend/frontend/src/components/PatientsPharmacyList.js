import * as React from 'react';
import PatientsPharmacyCard from './PatientsPharmacyCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'

const PharmacyList = () => {
    const [pharmacies, setPharmacies] = useState([]);
    const [searchItem, setSearchItem] = useState('');
    const [locationSearch, setLocationSearch] = useState(false);

    let search = () => {
        pharmacies.map((pharmacy) => pharmacy.name === searchItem ? setPharmacies([pharmacy]) : null)

    }

    let handleSearch = () => {
        locationSearch ? (pharmacies.map((pharmacy) => pharmacy.address.toLowerCase().includes(searchItem.toLowerCase()) ? setPharmacies([pharmacy]) : alert("No Pharmacies in this Location"))) : pharmacies.map((pharmacy) => pharmacy.name === searchItem ? setPharmacies([pharmacy]) : alert('No pharmacy found'))
    }

    let handlePharmacies = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch('/api/get-pharmacies/', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setPharmacies(data);
            });
    }
    useEffect(() => {
        if (localStorage.getItem('user') === null) {
            window.location.href = '/';
        }
        handlePharmacies();
    }, []);
    useEffect(() => {
        if (searchItem === '') {
            handlePharmacies();
        } else if (searchItem !== '') {
            search();
        }
    }, [searchItem]);
    return (
        <div style={{ backgroundColor: '#e3f7e3' }}>
            <Navbar name={localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).name : window.location.href = '/'} />
            <div style={{ marginLeft: '400px', width: '700px' }} className="input-group mb-3">
                <input type="text" onChange={(e) => setSearchItem(e.target.value)} className="form-control" placeholder="Search Pharmacy Name" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                <div className="input-group-append">
                    <button onClick={handleSearch} className="btn btn-outline-secondary" type="button">Search</button>
                </div>
            </div>
            <div className="btn-group" style={{ marginLeft: '400px', width: '700px' }} role="group" aria-label="Basic example">
                <button type="button" onClick={(e) => { setLocationSearch(false) }} style={{ width: '350px' }} className="btn btn-primary">Search With Name</button>
                <button type="button" onClick={(e) => { setLocationSearch(true) }} style={{ width: '350px' }} className="btn btn-primary">Search With Location</button>
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