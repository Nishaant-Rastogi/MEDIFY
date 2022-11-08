import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import '../styles/navbar.css'
import ConsultationBillCard from './ConsultationBillCard'

const ConsultationCard = () => {
    const location = useLocation()
    const [user, setUser] = useState([])
    const navigate = useNavigate()
    const doctor = { id: location.state.doctor_id, name: location.state.doctor_name }
    const [consultation, setConsultation] = useState(null)

    const handleConsultation = (e) => {
        e.preventDefault()
        const requiredOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                doctor_id: e.target.d_id.value,
                doctor_name: e.target.d_name.value,
                patient_id: e.target.p_id.value,
                patient_name: e.target.p_name.value,
                patient_gender: e.target.gender.value,
                patient_email: e.target.email.value,
                problem: e.target.problem.value,
            })
        }
        fetch('/api/request-consultation/', requiredOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setConsultation(data.id)
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
                setUser(data);
            });
    };

    useEffect(() => {
        if (localStorage.getItem('user') === null) {
            window.location.href = '/';
        }
        handleUser();
    }, [])
    return (
        <div>
            <Navbar name={localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).name : window.location.href = '/'} />
            {consultation ? <ConsultationBillCard doctor={doctor} user={user} consultation={consultation} /> :
                <div className='UPROFILE'>
                    <div className='PROFILECONTAINER'>
                        <div className='PROFILEHEADER'>
                            <div className="USER_DETAILS">
                                <div>CONSULTATION</div>
                            </div>
                            <hr style={{ width: '600px' }} />
                            <form onSubmit={handleConsultation}>
                                <div>Patient's Name:
                                    <input defaultValue={user.name} type="text" className="form-control" name="p_name" aria-describedby="idHelp" placeholder="Enter Patient's Name" disabled />
                                </div>
                                <div>Patient's ID:
                                    <input defaultValue={user.id} type="text" className="form-control" name="p_id" aria-describedby="idHelp" placeholder="Enter ID" disabled />
                                </div>
                                <div>Patient's Gender:
                                    <select defaultValue={user.gender} className="form-control" name='gender' disabled>
                                        <option value="DEFAULT" disabled>Select Gender</option>
                                        <option value="M">Male</option>
                                        <option value="F">Female</option>
                                        <option value="O">Other</option>
                                    </select> </div>
                                <div>Patient's Email:
                                    <input defaultValue={user.email} type="text" className="form-control" name="email" aria-describedby="idHelp" placeholder="Enter Email" disabled />
                                </div>
                                <div>Problem Faced:
                                    <input type="text" className="form-control" name="problem" aria-describedby="idHelp" placeholder="Enter Problem" />
                                </div>
                                <div>Doctor's Name:
                                    <input defaultValue={doctor.name} type="text" className="form-control" name="d_name" aria-describedby="idHelp" disabled />
                                </div>
                                <div>Doctor's ID:
                                    <input defaultValue={doctor.id} type="text" className="form-control" name="d_id" aria-describedby="idHelp" disabled />
                                </div>
                                <button style={{ marginTop: '20px', marginRight: '20px' }} type="submit" className="btn btn-outline-dark">REQUEST CONSULTATION</button>
                            </form>

                        </div>
                    </div>
                </div>}

        </div>
    )
}

export default ConsultationCard