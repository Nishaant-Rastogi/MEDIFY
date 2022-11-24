import React, { useState } from "react";
import '../styles/hospital_card.css';
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
function customcard({ prescriptions }) {
    const hashtag = "#H";
    const heading = "H";
    let id = 0;

    let handleDelete = (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: CryptoJS.AES.encrypt(JSON.stringify(prescriptions[e.target.id]), encryption_key, { iv: iv, mode: CryptoJS.mode.CBC }).toString() + enc + IV }),

        }
        fetch('/api/update-prescription-view/', requestOptions)
            .then(response => response.json())
            .then(data => {
                window.location.reload();
            });
    }

    return (
        <div className="CUSTOMCARDE" id="accordion">
            {prescriptions === [] ? null : prescriptions.map((data) => (
                <div key={id} className="card CARD">
                    <div className="card-header COL" id="HeadingTwO">
                        <button className="btn btn-link BUTTON" data-toggle="collapse" data-target={hashtag.concat(id).toString()} aria-expanded="true" aria-controls="collapseOne">
                            <div className="DATA ACCOUNT">
                                <div className="HEAD HEAD1">
                                    Prescription ID:
                                </div>
                                <div className="VALUE NAME">
                                    {data.id}
                                </div>
                            </div>
                            <div className="DATA BALANCE">
                                <div className="HEAD">
                                    Doctor's Name:
                                </div>
                                <div className="VALUE">
                                    {data.doctor_name}
                                </div>
                            </div>
                            <div className="DATA STATUS">
                                <div className="HEAD">
                                    Doctor's ID:
                                </div>
                                <div className="VALUE">
                                    {data.doctor_id}
                                </div>

                            </div>
                        </button>
                    </div>
                    <div id={heading.concat(id).toString()} className="collapse show" aria-labelledby="headingTwo" data-parent="#accordion">
                        <div className="card-body CBODY">
                            <div className="DATA FROM">
                                <div className="HEAD">
                                    Medicine :
                                </div>
                                <div className="VALUE">
                                    {data.medicine}
                                </div>
                            </div>
                            <div className="DATA TO">
                                <div className="HEAD">
                                    Dosage :
                                </div>
                                <div className="VALUE">
                                    {data.dosage}
                                </div>
                            </div>
                            <div className="DATA DATE">
                                <div className="HEAD">
                                    Duration :
                                </div>
                                <div className="VALUE">
                                    {data.duration}
                                </div>
                            </div>
                        </div>
                        <div className="card-body CBODY">
                            <div className="DATA FROM">
                                <div className="HEAD">
                                    Consultation ID :
                                </div>
                                <div className="VALUE">
                                    {data.consultation_id}
                                </div>
                            </div>
                            <div className="DATA FROM">
                                <div className="HEAD">
                                    Test :
                                </div>
                                <div className="VALUE">
                                    {data.test}
                                </div>
                            </div>
                            <div className="DATA DATE">
                                <button className="btn btn-primary btn-sm" id={id++} onClick={handleDelete}>DELETE</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}






function PatientsPrescriptionCard({ prescriptions }) {
    const hashtag = "#H";
    const heading = "H";
    let id = 0;
    return (
        <>
            {prescriptions.length < 1 ?
                <div className="CUSTOMCARD" id="accordion">
                    <div className="card CARD">
                        <div className="card-header COL" id="headingOne"> No Prescription</div>
                    </div>
                </div> : customcard({ prescriptions })}
        </>
    );
}

export default PatientsPrescriptionCard;