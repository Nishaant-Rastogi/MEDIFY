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
function customcard({ patients }) {
    const hashtag = "#H";
    const heading = "H";
    let id = 0;

    return (
        <div className="CUSTOMCARDE" id="accordion">
            {patients == null ? null : patients.map((data) => (
                <div key={id} className="card CARD" >
                    <div className="card-header COL" id="HeadingTwO">
                        <button className="btn btn-link BUTTON" data-toggle="collapse" data-target={hashtag.concat(id).toString()} aria-expanded="true" aria-controls="collapseOne">
                            <div className="DATA ACCOUNT">
                                <div className="HEAD HEAD1">
                                    Name:
                                </div>
                                <div className="VALUE NAME">
                                    {data.patient_name}
                                </div>
                            </div>
                            <div className="DATA BALANCE">
                                <div className="HEAD">
                                    Patient ID:
                                </div>
                                <div className="VALUE">
                                    {data.patient_id}
                                </div>
                            </div>
                            <div className="DATA STATUS">
                                <div className="HEAD">
                                    Amount:
                                </div>
                                <div className="VALUE">
                                    {data.amount}
                                </div>

                            </div>
                        </button>
                    </div>
                    <div id={heading.concat(id).toString()} className="collapse show" aria-labelledby="headingTwo" data-parent="#accordion">
                        <div className="card-body CBODY">
                            <div className="DATA FROM">
                                <div className="HEAD">
                                    Claimed :
                                </div>
                                <div className="VALUE">
                                    {data.claimed}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))
            }
        </div >
    )
}






function InsurancePatientsCard({ patients }) {
    const hashtag = "#H";
    const heading = "H";
    return (
        <>
            {patients.length < 1 ?
                <div className="CUSTOMCARD" id="accordion">
                    <div className="card CARD">
                        <div className="card-header COL" id="headingOne"> No User</div>
                    </div>
                </div> : customcard({ patients })}
        </>
    );
}

export default InsurancePatientsCard;