import * as React from 'react';
import PatientsDoctorCard from './PatientsDoctorCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'

const PatientsDoctorsList = () => {
    const [doctors, setDoctors] = useState([]);
    const [searchItem, setSearchItem] = useState('');
    const [locationSearch, setLocationSearch] = useState(false);


    let search = () => {
        locationSearch ? null : doctors.map((doctor) => doctor.name.toLowerCase() === searchItem.toLowerCase() ? setDoctors([doctor]) : null)
    }

    let handleSearch = () => {
        locationSearch ? (doctors.map((doctor) => doctor.address.toLowerCase().includes(searchItem.toLowerCase()) ? setDoctors([doctor]) : alert("No Doctors in this Location"))) : (doctors.map((doctor) => doctor.name.toLowerCase() === searchItem.toLowerCase() ? setDoctors([doctor]) : alert("No Doctor Found")))
    }

    let handleDoctors = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch('/api/get-doctors/', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setDoctors(data);
            });
    }

    useEffect(() => {
        if (localStorage.getItem('user') === null) {
            window.location.href = '/';
        }
        handleDoctors();
    }, []);
    useEffect(() => {
        if (searchItem === '') {
            handleDoctors();
        } else if (searchItem !== '') {
            search();
        }
    }, [searchItem]);
    return (
        <div style={{ backgroundColor: '#e3f7e3' }}>
            <Navbar name={localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).name : window.location.href = '/'} />
            <div style={{ marginLeft: '400px', width: '700px' }} className="input-group mb-3">
                <input type="text" onChange={(e) => setSearchItem(e.target.value)} className="form-control" placeholder={locationSearch ? "Search Location For Doctors" : "Search Doctors Name"} aria-label="Recipient's username" aria-describedby="basic-addon2" />
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
                        <PatientsDoctorCard doctors={doctors} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PatientsDoctorsList
