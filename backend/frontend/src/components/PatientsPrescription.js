import * as React from 'react';
import PatientsPrescriptionCard from './PatientsPrescriptionCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'
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
const PatientsPrescription = () => {
    const [prescriptions, setPrescriptions] = useState([]);

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
    useEffect(() => {
        if (localStorage.getItem('user') === null) {
            window.location.href = '/';
        }
        handlePrescriptions();
    }, []);
    return (
        <div>
            <Navbar name={localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).name : window.location.href = '/'} />
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>

                        <PatientsPrescriptionCard prescriptions={prescriptions} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientsPrescription