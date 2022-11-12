import * as React from 'react';
import PatientsHospitalCard from './PatientsHospitalCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'

const PatientsHospitalsList = () => {
    const [hospitals, setHospitals] = useState([]);
    const [searchItem, setSearchItem] = useState('');
    const [locationSearch, setLocationSearch] = useState(false);


    let search = () => {
        hospitals.map((hospital) => hospital.name === searchItem ? setHospitals([hospital]) : null)
    }
    let handleSearch = () => {
        locationSearch ? (hospitals.map((hospital) => hospital.address.toLowerCase().includes(searchItem.toLowerCase()) ? setHospitals([hospital]) : alert("No Hospitals in this Location"))) : hospitals.map((hospital) => hospital.name === searchItem ? setHospitals([hospital]) : alert('No hospital found'))
    }
    let handleHospitals = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch('/api/get-hospitals/', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setHospitals(data);
            });
    }
    useEffect(() => {
        if (localStorage.getItem('user') === null) {
            window.location.href = '/';
        }
        handleHospitals();
    }, []);
    useEffect(() => {
        if (searchItem === '') {
            handleHospitals();
        } else if (searchItem !== '') {
            search();
        }
    }, [searchItem]);
    return (
        <div style={{ backgroundColor: '#e3f7e3' }}>
            <Navbar name={localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).name : window.location.href = '/'} />
            <div style={{ marginLeft: '400px', width: '700px' }} className="input-group mb-3">
                <input type="text" onChange={(e) => setSearchItem(e.target.value)} className="form-control" placeholder="Search Hospital Name" aria-label="Recipient's username" aria-describedby="basic-addon2" />
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
                        <PatientsHospitalCard hospitals={hospitals} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PatientsHospitalsList
