import * as React from 'react';
import InsuranceClaimsCard from './InsuranceClaimsCard';
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
const InsuranceClaims = () => {
    const [claims, setClaims] = useState([]);

    let handleClaim = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrftoken },
            body: JSON.stringify({ data: CryptoJS.AES.encrypt(localStorage.getItem('organisation'), encryption_key, { iv: iv, mode: CryptoJS.mode.CBC }).toString() + enc + IV }),

        }
        fetch('/api/get-claims/', requestOptions)
            .then(response => response.json())
            .then(data => {
                handleDocumentVerification(data)
            });
    }

    let handleDocumentVerification = (documents) => {
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
                    console.log(res);
                    if (res.verified)
                        setClaims([...claims, d]);
                });
        })

    }

    useEffect(() => {
        if (localStorage.getItem('organisation') === null) {
            window.location.href = '/';
        }
        handleClaim();
    }, []);
    return (
        <div>
            <Navbar name={localStorage.getItem('organisation') ? JSON.parse(localStorage.getItem('organisation')).name : window.location.href = '/'} />
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>
                        <InsuranceClaimsCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InsuranceClaims