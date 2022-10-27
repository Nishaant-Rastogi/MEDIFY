import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import '../styles/navbar.css'

const PrescriptionCard = () => {
    const location = useLocation()
    const [doctor, setDoctor] = useState([])
    const [prescription, setPrescription] = useState()
    const navigate = useNavigate()
    const user = { id: location.state.patient_id, name: location.state.patient_name, consultation_id: location.state.consultation_id }

    const handlePrescription = (e) => {
        e.preventDefault()
        console.log("hello");
        const requiredOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                doctor_id: e.target.d_id.value,
                doctor_name: e.target.d_name.value,
                patient_id: e.target.p_id.value,
                patient_name: e.target.p_name.value,
                test: e.target.test.value,
                medicine: e.target.medicine.value,
                dosage: e.target.dosage.value,
                duration: e.target.duration.value,
                consultation_id: e.target.c_id.value,
            })
        }
        fetch('/api/send-prescription/', requiredOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setPrescription(data.id)
                navigate(-1)
            })
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
                setDoctor(data);
            });
    };

    useEffect(() => {
        console.log(user)
        handleUser();
    }, [])
    return (
        <div>
            <Navbar />
            <div className='UPROFILE'>
                <div className='PROFILECONTAINER'>
                    <div className='PROFILEHEADER'>
                        <div className="USER_DETAILS">
                            <div>PRESCRIPTION</div>
                        </div>
                        <hr style={{ width: '600px' }} />
                        <form onSubmit={handlePrescription}>
                            <div>Patient's Name:
                                <input defaultValue={user.name} type="text" className="form-control" name="p_name" aria-describedby="idHelp" placeholder="Enter Patient's Name" disabled />
                            </div>
                            <div>Patient's ID:
                                <input defaultValue={user.id} type="text" className="form-control" name="p_id" aria-describedby="idHelp" placeholder="Enter ID" disabled />
                            </div>
                            <div>Consultation ID:
                                <input defaultValue={user.consultation_id} type="text" className="form-control" name="c_id" aria-describedby="idHelp" placeholder="Enter Email" disabled />
                            </div>
                            <div>Medicine Prescribed:
                                <select defaultValue={'DEFAULT'} className="form-control" name='medicine'>
                                    <option value="DEFAULT" disabled>Select Medicines</option>
                                    <option value="1">Paracetamol</option>
                                    <option value="2">Pain Killer</option>
                                    <option value="3">Crocin</option>
                                </select>
                            </div>
                            <div>
                                Dosage:
                                <input type="text" className="form-control" name="dosage" aria-describedby="idHelp" placeholder="Enter Dosage" />
                            </div>
                            <div>
                                Medicine Duration:
                                <input type="text" className="form-control" name="duration" aria-describedby="idHelp" placeholder="Enter Duration" />
                            </div>
                            <div>
                                Tests
                                <select defaultValue={'DEFAULT'} className="form-control" name='test'>
                                    <option value="DEFAULT" disabled>Select Tests</option>
                                    <option value="1">Test 1</option>
                                    <option value="2">Test 2</option>
                                    <option value="3">Test 3</option>
                                </select>
                            </div>
                            <div>Doctor's Name:
                                <input defaultValue={doctor.name} type="text" className="form-control" name="d_name" aria-describedby="idHelp" disabled />
                            </div>
                            <div>Doctor's ID:
                                <input defaultValue={doctor.id} type="text" className="form-control" name="d_id" aria-describedby="idHelp" disabled />
                            </div>
                            <button style={{ marginTop: '20px', marginRight: '20px' }} type="submit" className="btn btn-outline-dark">SEND PRESCRIPTION</button>
                        </form>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default PrescriptionCard