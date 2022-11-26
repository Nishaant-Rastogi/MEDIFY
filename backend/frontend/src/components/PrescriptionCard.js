import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import '../styles/navbar.css'
var sanitize = require('mongo-sanitize');
import bcrypt from 'bcryptjs'
var CryptoJS = require("crypto-js");
import Loading from './Loading'
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
const PrescriptionCard = () => {
    const location = useLocation()
    const [doctor, setDoctor] = useState([])
    const navigate = useNavigate()
    const user = { id: location.state.patient_id, name: location.state.patient_name, consultation_id: location.state.consultation_id }
    const [loading, setLoading] = useState(false)
    const handlePrescription = (e) => {
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
                    test: e.target.test.value,
                    medicine: e.target.medicine.value,
                    dosage: sanitize(e.target.dosage.value),
                    duration: sanitize(e.target.duration.value),
                    consultation_id: e.target.c_id.value,
                }), encryption_key, { iv: iv, mode: CryptoJS.mode.CBC }).toString() + enc + IV
            }),

        }
        fetch('/api/send-prescription/', requiredOptions)
            .then(response => response.json())
            .then(data => {
                addBlock(data)
                // navigate(-1)
            })
    }
    let addBlock = (data) => {
        setLoading(true)
        const requiredOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                data: CryptoJS.AES.encrypt(JSON.stringify({
                    document: bcrypt.hashSync(JSON.stringify(data), salt),
                }), encryption_key, { iv: iv, mode: CryptoJS.mode.CBC }).toString() + enc + IV
            }),

        }
        fetch('/api/add-block/', requiredOptions)
            .then(response => response.json())
            .then(data => { setLoading(false); navigate(-1) })
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
                setDoctor(data);
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
            <div className='UPROFILE'>
                <div className='PROFILECONTAINER'>
                    {loading ? <Loading /> :
                        <div className='PROFILEHEADER'>
                            <div className="USER_DETAILS">
                                <h1>PRESCRIPTION</h1>
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
                                    <input type="text" className="form-control" name="dosage" aria-describedby="idHelp" placeholder="Enter Dosage" required />
                                </div>
                                <div>
                                    Medicine Duration:
                                    <input type="text" className="form-control" name="duration" aria-describedby="idHelp" placeholder="Enter Duration" required />
                                </div>
                                <div>
                                    Tests
                                    <select defaultValue={'DEFAULT'} className="form-control" name='test' required>
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
                    }

                </div>
            </div>

        </div>
    )
}

export default PrescriptionCard