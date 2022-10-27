import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import '../styles/navbar.css'
import TestBillCard from './TestBillCard'

const TestCard = () => {
    const location = useLocation()
    const [user, setUser] = useState([])
    const hospital = { id: location.state.hospital_id, name: location.state.hospital_name }
    const [test, setTest] = useState(null)
    const [prescriptions, setPrescriptions] = useState([])
    const [prescription, setPrescription] = useState(null)

    const handleTest = () => {
        setTest(prescription.test)
    }

    let handlePrescriptions = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: localStorage.getItem('user')
        }
        fetch('/api/get-prescriptions/', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setPrescriptions(data);
            });
    }
    let handleUser = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: localStorage.getItem('user')
        };

        fetch('/api/get-user/', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setUser(data);
            });
    };
    useEffect(() => {
        handleUser();
        console.log('hello')
        handlePrescriptions();
    }, [])
    useEffect(() => {
        prescriptions.map((pres) => pres.id === prescription.id ? setPrescription(pres) : null)
    }, [prescription])
    return (
        <div>
            <Navbar />
            {test ? <TestBillCard hospital={hospital} user={user} prescription={prescription} /> :
                <div className='UPROFILE'>
                    <div className='PROFILECONTAINER'>
                        <div className='PROFILEHEADER'>
                            <div className="USER_DETAILS">
                                <div>TESTS</div>
                            </div>
                            <hr style={{ width: '600px' }} />
                            <form onSubmit={handleTest}>
                                <div>Patient's Name:
                                    <input defaultValue={user.name} type="text" className="form-control" name="p_name" aria-describedby="idHelp" placeholder="Enter Patient's Name" disabled />
                                </div>
                                <div>Patient's ID:
                                    <input defaultValue={user.id} type="text" className="form-control" name="p_id" aria-describedby="idHelp" placeholder="Enter ID" disabled />
                                </div>
                                <div>Select Prescription
                                    <select defaultValue={"DEFAULT"} className="form-control" aria-label="Default select example" onChange={(e) => { setPrescription({ id: e.target.value, name: e.target.value }) }}>
                                        <option value={"DEFAULT"} disabled>Select Prescriptions</option>
                                        {
                                            prescriptions.map((prescription, index) => <option key={index} value={prescription.id}>{prescription.id}</option>)
                                        }
                                    </select>
                                </div>
                                {prescription ? <div>Test
                                    <input defaultValue={prescription.test} type="text" className="form-control" name="test" aria-describedby="idHelp" placeholder="Enter Test" disabled />
                                </div> : null}
                                <div>Hospital's Name:
                                    <input defaultValue={hospital.name} type="text" className="form-control" name="h_name" aria-describedby="idHelp" disabled />
                                </div>
                                <div>Hospital's ID:
                                    <input defaultValue={hospital.id} type="text" className="form-control" name="h_id" aria-describedby="idHelp" disabled />
                                </div>
                                {prescription ? < button style={{ marginTop: '20px', marginRight: '20px' }} type="submit" className="btn btn-outline-dark">REQUEST TEST</button> : null}
                            </form>

                        </div>
                    </div>
                </div>}

        </div >
    )
}

export default TestCard