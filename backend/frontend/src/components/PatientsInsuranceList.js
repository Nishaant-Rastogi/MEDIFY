import * as React from 'react';
import PatientsInsuranceCard from './PatientsInsuranceCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'

const PatientsInsuranceList = () => {
    const [insurances, setInsurances] = useState([]);
    const [searchItem, setSearchItem] = useState('');

    let search = () => {
        insurances.map((insurance) => insurance.name === searchItem ? setInsurances(insurance) : null)
    }
    let handleInsurances = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch('/api/get-insurance-companies/', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setInsurances(data);
            });
    }
    useEffect(() => {
        if (localStorage.getItem('user') === null) {
            window.location.href = '/';
        }
        handleInsurances();
    }, []);
    return (
        <div>
            <Navbar name={JSON.parse(localStorage.getItem('user')).name} />
            <div style={{ marginLeft: '400px', width: '700px' }} className="input-group mb-3">
                <input type="text" onChange={(e) => setSearchItem(e.target.value)} className="form-control" placeholder="Search Insurance Company Name" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                <div className="input-group-append">
                    <button onClick={search} className="btn btn-outline-secondary" type="button">Search</button>
                </div>
            </div>
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>

                        <PatientsInsuranceCard insurances={insurances} />
                    </div>
                </div>
            </div>
        </div>

    );
}

export default PatientsInsuranceList