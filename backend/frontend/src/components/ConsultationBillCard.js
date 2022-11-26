import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
var sanitize = require('mongo-sanitize');
import bcrypt from 'bcryptjs'
var CryptoJS = require("crypto-js");
import Loading from './Loading';
import TokenService from '../pages/TokenService';
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
const salt = bcrypt.genSaltSync(10);
function ConsultationBillCard({ doctor, user, consultation }) {
    const [insurance, setInsurance] = useState({});
    const [insurances, setInsurances] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    let handleInsurance = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }
        fetch('/api/get-insurance-companies/', requestOptions)
            .then(response => response.json())
            .then(data => {
                setInsurances(data)
            });
    }

    let handleBill = (e) => {
        e.preventDefault()

        insurances.map((ins) => ins.id === insurance.id ? setInsurance(ins) : null)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrftoken },
            body: JSON.stringify({
                data: CryptoJS.AES.encrypt(JSON.stringify({
                    patient_id: user.id,
                    patient_name: user.name,
                    doctor_id: doctor.id,
                    doctor_name: doctor.name,
                    amount: 100,
                    consultation: consultation,
                    insurance_id: insurance.id,
                    insurance_name: insurance.name,
                }), encryption_key, { iv: iv, mode: CryptoJS.mode.CBC }).toString() + enc + IV
            }),


        };

        fetch('/api/send-consultation-bill/', requestOptions)
            .then((response) => {
                if (response.ok) {
                    alert("Consultation Requested Successfully!")
                } else {
                    alert("Consultation Request Failed! Insufficient Balance")
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                addBlock(data)
                addBlock(consultation)
                // navigate(-1)
            });
    }
    let addBlock = (data) => {
        setLoading(true)
        const requiredOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrftoken },
            body: JSON.stringify({
                data: CryptoJS.AES.encrypt(JSON.stringify({
                    document: bcrypt.hashSync(JSON.stringify(data), salt),
                }), encryption_key, { iv: iv, mode: CryptoJS.mode.CBC }).toString() + enc + IV
            }),

        }
        fetch('/api/add-block/', requiredOptions)
            .then(response => response.json())
            .then(data => { navigate(-1); setLoading(false) });
    }
    useEffect(() => {
        handleInsurance();
    }, [])

    return (
        <div className='UPROFILE'>
            <div className='PROFILECONTAINER'>
                {loading ? <Loading /> :
                    <div className='PROFILEHEADER'>
                        <div className="USER_DETAILS">
                            <h1>CONSULTATION FEE PAYMENT PORTAL</h1>
                        </div>
                        <hr style={{ width: '600px' }} />
                        <form onSubmit={handleBill}>
                            <TokenService />
                            <div>Patient's Name:
                                <input defaultValue={user.name} type="text" className="form-control" name="p_name" aria-describedby="idHelp" placeholder="Enter Patient's Name" disabled />
                            </div>
                            <div>Patient's ID:
                                <input defaultValue={user.id} type="text" className="form-control" name="p_id" aria-describedby="idHelp" placeholder="Enter ID" disabled />
                            </div>
                            <div>Doctor's Name:
                                <input defaultValue={doctor.name} type="text" className="form-control" name="d_name" aria-describedby="idHelp" disabled />
                            </div>
                            <div>Doctor's ID:
                                <input defaultValue={doctor.id} type="text" className="form-control" name="d_id" aria-describedby="idHelp" disabled />
                            </div>
                            <div>Consultation ID:
                                <input defaultValue={consultation.id} type="text" className="form-control" name="c_id" aria-describedby="idHelp" disabled />
                            </div>
                            <div>Amount:
                                <input defaultValue={100} type="text" className="form-control" name="amount" aria-describedby="idHelp" disabled />
                            </div>
                            <div>Insurance Companies:
                                <select defaultValue={"DEFAULT"} className="form-control" aria-label="Default select example" onChange={(e) => { setInsurance({ id: e.target.value, name: e.target.value }) }} required>
                                    <option value={"DEFAULT"} disabled>Select Insurance</option>
                                    {
                                        insurances.map((insurance, index) => <option key={index} value={insurance.id}>{insurance.name}</option>)
                                    }
                                </select>
                            </div>
                            <button style={{ marginTop: '20px', marginRight: '20px' }} type="submit" className="btn btn-outline-dark">PAY CONSULTATION FEE</button>
                        </form>

                    </div>
                }

            </div>
        </div>
    )
}

export default ConsultationBillCard
