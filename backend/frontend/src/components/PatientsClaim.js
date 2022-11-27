import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import '../styles/navbar.css'
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
const PatientsClaim = () => {
    const location = useLocation()
    const [user, setUser] = useState([])
    const [bills, setBills] = useState([])
    const [bill, setBill] = useState(null)
    const [insurance, setInsurance] = useState({});
    const [insurances, setInsurances] = useState([]);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    let handleClaim = (e) => {
        e.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrftoken },
            body: JSON.stringify({
                data: CryptoJS.AES.encrypt(JSON.stringify({
                    patient_id: user.id,
                    insurance_id: insurance.id,
                    refund_amount: e.target.refund_amount.value,
                    bill_id: bill.id,
                }), encryption_key, { iv: iv, mode: CryptoJS.mode.CBC }).toString() + enc + IV
            }),

        }
        fetch('/api/claim-refund/', requestOptions)
            .then(response => response.json())
            .then(data => {
                addBlock(data)
                // alert("Insurance Claim Received"); navigate(-1); window.location.reload()
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
            .then(data => {
            }).then(() => { alert("Insurance Claim Received"); navigate(-1); window.location.reload(); setLoading(false) });
    }
    let handleBills = () => {
        const requiredOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrftoken },
            body: JSON.stringify({ data: CryptoJS.AES.encrypt(localStorage.getItem('user'), encryption_key, { iv: iv, mode: CryptoJS.mode.CBC }).toString() + enc + IV }),

        }
        fetch('/api/get-unclaim-bills/', requiredOptions)
            .then(response => response.json())
            .then(data => {
                setBills(data)
            })
    }


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
        handleBills();
        handleInsurance();
    }, [])

    useEffect(() => {
        bills.map((bi) => bi.id === bill.id ? setBill(bi) : null)
    }, [bill])

    useEffect(() => {
        insurances.map((ins) => ins.id === insurance.id ? setInsurance(ins) : null)
    }, [insurance])

    return (
        <div>
            <Navbar name={localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).name : window.location.href = '/'} />
            <div className='UPROFILE'>
                <div className='PROFILECONTAINER'>
                    {loading ? <Loading /> :
                        <div className='PROFILEHEADER'>
                            <div className="USER_DETAILS">
                                <h1>CLAIM REFUND PORTAL</h1>
                            </div>
                            <hr style={{ width: '600px' }} />
                            <form onSubmit={handleClaim}>
                                <TokenService />
                                <div>Patient's Name:
                                    <input defaultValue={user.name} type="text" className="form-control" name="p_name" aria-describedby="idHelp" placeholder="Enter Patient's Name" disabled />
                                </div>
                                <div>Patient's ID:
                                    <input defaultValue={user.id} type="text" className="form-control" name="p_id" aria-describedby="idHelp" placeholder="Enter ID" disabled />
                                </div>
                                <div>Insurance Company:
                                    <select defaultValue={"DEFAULT"} className="form-control" aria-label="Default select example" onChange={(e) => { setInsurance({ id: e.target.value, name: e.target.value }) }}>
                                        <option value={"DEFAULT"} disabled>Select Insurance</option>
                                        {
                                            insurances.map((insurance, index) => <option key={index} value={insurance.id}>{insurance.name}</option>)
                                        }
                                    </select>
                                </div>
                                <div>Select Bill:
                                    <select defaultValue={"DEFAULT"} className="form-control" aria-label="Default select example" onChange={(e) => { setBill({ id: e.target.value, name: e.target.value }) }}>
                                        <option value={"DEFAULT"} disabled>Select Bills</option>
                                        {
                                            bills.map((bill, index) => <option key={index} value={bill.id}>{bill.id}</option>)
                                        }
                                    </select>
                                </div>
                                {bill ?
                                    <div>
                                        <div>
                                            Bill Amount:
                                            <input defaultValue={bill.amount} type="text" className="form-control" name="amount" aria-describedby="idHelp" placeholder="Enter Amount" disabled />
                                        </div>
                                        <div>
                                            Refund Amount:
                                            <input defaultValue={10} type="number" className="form-control" name="refund_amount" aria-describedby="idHelp" placeholder="Enter Amount" disabled />
                                        </div>
                                        <div>Recipient's Name:
                                            <input defaultValue={bill.docType === 'BC' ? bill.doctor_name : bill.docType === 'BT' ? bill.hospital_name : bill.docType === 'BP' ? bill.pharmacy_name : null} type="text" className="form-control" name="recipient_name" aria-describedby="idHelp" disabled />
                                        </div>
                                        <div>Recipient's ID:
                                            <input defaultValue={bill.docType === 'BC' ? bill.doctor_id : bill.docType === 'BT' ? bill.hospital_id : bill.docType === 'BP' ? bill.pharmacy_id : null} type="text" className="form-control" name="recipient_id" aria-describedby="idHelp" disabled />
                                        </div>
                                    </div>
                                    : null}
                                <button style={{ marginTop: '20px', marginRight: '20px' }} type="submit" className="btn btn-outline-dark">CLAIM REFUND</button>
                            </form>

                        </div>
                    }
                </div>
            </div>

        </div>
    )
}

export default PatientsClaim