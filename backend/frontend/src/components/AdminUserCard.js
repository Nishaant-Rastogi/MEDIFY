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
function customcard({ UserData }) {
    const hashtag = "#H";
    const heading = "H";
    let id = 0;
    let handleDelete = (e) => {
        e.preventDefault();
        const requiredOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: CryptoJS.AES.encrypt(JSON.stringify(UserData[e.target.id]), encryption_key, { iv: iv, mode: CryptoJS.mode.CBC }).toString() + enc + IV }),

        }
        fetch('/api/delete-user/', requiredOptions)
            .then(response => response.json())
            .then(data => {
                window.location.reload();
            })
    }
    return (
        <div className="CUSTOMCARDE" id="accordion">
            {UserData == null ? null : UserData.map((data) => (
                <div key={id} className="card CARD" >
                    <div className="card-header COL" id="HeadingTwO">
                        <button className="btn btn-link BUTTON" data-toggle="collapse" data-target={hashtag.concat(id).toString()} aria-expanded="true" aria-controls="collapseOne">
                            <div className="DATA ACCOUNT">
                                <div className="HEAD HEAD1">
                                    Name:
                                </div>
                                <div className="VALUE NAME">
                                    {data.name}
                                </div>
                            </div>
                            <div className="DATA BALANCE">
                                <div className="HEAD">
                                    Aadhar No:
                                </div>
                                <div className="VALUE">
                                    {data.aadharNo}
                                </div>
                            </div>
                            <div className="DATA STATUS">
                                <div className="HEAD">
                                    Type:
                                </div>
                                <div className="VALUE">
                                    {data.userType}
                                </div>

                            </div>
                            <div className="DATA STATUS">
                                <div className="HEAD">
                                    Verified:
                                </div>
                                <div className="VALUE">
                                    {data.verified ? "Yes" : "No"}
                                </div>

                            </div>
                        </button>
                    </div>
                    <div id={heading.concat(id).toString()} className="collapse show" aria-labelledby="headingTwo" data-parent="#accordion">
                        <div className="card-body CBODY">
                            <div className="DATA FROM">
                                <div className="HEAD">
                                    Address :
                                </div>
                                <div className="VALUE">
                                    {data.address}
                                </div>
                            </div>
                            <div className="DATA TO">
                                <div className="HEAD">
                                    Phone No :
                                </div>
                                <div className="VALUE">
                                    {data.phoneNo}
                                </div>
                            </div>
                            <button className="btn btn-primary btn-sm" id={id++} onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            ))
            }
        </div >
    )
}






function AdminCheckUserCard({ UserData }) {
    const hashtag = "#H";
    const heading = "H";
    return (
        <>
            {UserData.length < 1 ?
                <div className="CUSTOMCARD" id="accordion">
                    <div className="card CARD">
                        <div className="card-header COL" id="headingOne"> No User</div>
                    </div>
                </div> : customcard({ UserData })}
        </>
    );
}

export default AdminCheckUserCard;