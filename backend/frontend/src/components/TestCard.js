import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import '../styles/navbar.css'
import TestBillCard from './TestBillCard'
import TokenService from '../pages/TokenService'
var CryptoJS = require("crypto-js");

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();

            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrftoken = getCookie('csrftoken');
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
            headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrftoken },
            body: JSON.stringify({ data: CryptoJS.AES.encrypt(localStorage.getItem('user'), encryption_key, { iv: iv, mode: CryptoJS.mode.CBC }).toString() + enc + IV }),

        }
        fetch('/api/get-prescriptions/', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                handleDocumentVerification(data)
            });
    }
    let handleDocumentVerification = (documents) => {
        const length = documents.length;
        var count = 0;
        var docs = [];
        documents.map((d) => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrftoken },
                body: JSON.stringify({
                    data: CryptoJS.AES.encrypt(JSON.stringify({
                        id: d.id,
                        timestamp: d.timestamp,
                        document: JSON.stringify(d),
                    }), encryption_key, { iv: iv, mode: CryptoJS.mode.CBC }).toString() + enc + IV
                }),

            }
            fetch('/api/verify-documents/', requestOptions)
                .then(response => response.json())
                .then(res => {
                    if (res.verified) {
                        if (length === ++count) {
                            setPrescriptions(docs)
                        } else {
                            docs.push(d)
                        }
                    }
                });
        })

    }
    let handleUser = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrftoken },
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
        handlePrescriptions();
    }, [])
    useEffect(() => {
        prescriptions.map((pres) => pres.id === prescription.id ? setPrescription(pres) : null)
    }, [prescription])
    return (
        <div>
            <Navbar name={localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).name : window.location.href = '/'} />
            {test ? <TestBillCard hospital={hospital} user={user} prescription={prescription} /> :
                <div className='UPROFILE'>
                    <div className='PROFILECONTAINER'>
                        <div className='PROFILEHEADER'>
                            <div className="USER_DETAILS">
                                <h1>TESTS</h1>
                            </div>
                            <hr style={{ width: '600px' }} />
                            <form onSubmit={handleTest}>
                                <TokenService />
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