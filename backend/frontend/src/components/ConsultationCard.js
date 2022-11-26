import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import '../styles/navbar.css'
import ConsultationBillCard from './ConsultationBillCard'
var sanitize = require('mongo-sanitize');
import bcrypt from 'bcryptjs'
var CryptoJS = require("crypto-js");

const rnd = (() => {
    const gen = (min, max) => max++ && [...Array(max - min)].map((s, i) => String.fromCharCode(min + i));

    const sets = {
        num: gen(48, 57),
        alphaLower: gen(97, 122),
        alphaUpper: gen(65, 90),
        special: [...`~!@#$%^&*()_+-=[]\{}|;:'",./<>?`]
    };

    function* iter(len, set) {
        if (set.length < 1) set = Object.values(sets).flat();
        for (let i = 0; i < len; i++) yield set[Math.random() * set.length | 0]
    }

    return Object.assign(((len, ...set) => [...iter(len, set.flat())].join('')), sets);
})();
const enc = rnd(16)
const encryption_key = CryptoJS.enc.Utf8.parse(enc)
const IV = rnd(16)
const iv = CryptoJS.enc.Utf8.parse(IV)
const salt = bcrypt.genSaltSync(10);
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
                data: CryptoJS.AES.encrypt(JSON.stringify({
                    doctor_id: e.target.d_id.value,
                    doctor_name: e.target.d_name.value,
                    patient_id: e.target.p_id.value,
                    patient_name: e.target.p_name.value,
                    patient_gender: e.target.gender.value,
                    patient_email: e.target.email.value,
                    problem: sanitize(e.target.problem.value),
                }), encryption_key, { iv: iv, mode: CryptoJS.mode.CBC }).toString() + enc + IV
            }),

        }
        fetch('/api/request-consultation/', requiredOptions)
            .then(response => response.json())
            .then(data => {
                setConsultation(data)
            })
    }
    let handleUser = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: CryptoJS.AES.encrypt(localStorage.getItem('user'), encryption_key, { iv: iv, mode: CryptoJS.mode.CBC }).toString() + enc + IV }),

        };

        fetch('/api/get-user/', requestOptions)
            .then((response) => response.json())
            .then((data) => {
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
                                <h1>CONSULTATION</h1>
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
                                    <input type="text" className="form-control" name="problem" aria-describedby="idHelp" placeholder="Enter Problem" required />
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