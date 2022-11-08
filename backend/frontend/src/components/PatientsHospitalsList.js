import * as React from 'react';
import PatientsHospitalCard from './PatientsHospitalCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'

const PatientsHospitalsList = () => {
    const [hospitals, setHospitals] = useState([]);
    const [searchItem, setSearchItem] = useState('');

    let search = () => {
        console.log(searchItem)
        hospitals.map((hospital) => hospital.name === searchItem ? setHospitals(hospital) : null)
    }
    let handleHospitals = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch('/api/get-hospitals/', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setHospitals(data);
            });
    }
    useEffect(() => {
        if (localStorage.getItem('user') === null) {
            window.location.href = '/';
        }
        handleHospitals();
    }, []);

    return (
        <div>
            <Navbar name={localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).name : window.location.href = '/'} />
            <div style={{ marginLeft: '400px', width: '700px' }} className="input-group mb-3">
                <input type="text" onChange={(e) => setSearchItem(e.target.value)} className="form-control" placeholder="Search Hospital Name" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                <div className="input-group-append">
                    <button onClick={search} className="btn btn-outline-secondary" type="button">Search</button>
                </div>
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
