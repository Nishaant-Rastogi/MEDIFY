import * as React from 'react';
import DoctorsBillsCard from './DoctorsBillsCard';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/hospitals.css'
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
const DoctorsBills = () => {
    const [bills, setBills] = useState([]);

    let handleBills = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: CryptoJS.AES.encrypt(localStorage.getItem('user'), encryption_key, { iv: iv, mode: CryptoJS.mode.CBC }).toString() + enc + IV }),

        }
        fetch('/api/get-doctor-bills/', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setBills(data);
            });
    }


    useEffect(() => {
        if (localStorage.getItem('user') === null) {
            window.location.href = '/';
        }
        handleBills();
    }, [])
    return (
        <div>
            <Navbar name={localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).name : window.location.href = '/'} />
            <div className="SAVINGACCOUNT">
                <div className="COL COL2">
                    <div className='ROW ROW1'>
                        <DoctorsBillsCard bills={bills} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorsBills