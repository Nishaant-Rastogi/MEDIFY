import React from 'react'
import { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import '../styles/navbar.css'
import { Link } from 'react-router-dom';
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
const ProfileInformation = () => {
    const [UserData, setUserData] = useState([]);
    const [UserType, setUserType] = useState('user');
    const [Edit, setEdit] = useState(false);
    const user_dob = useRef(null);
    const user_gender = useRef(null);
    const user_address = useRef(null);
    const user_phoneNo = useRef(null);
    const user_balance = useRef(null);

    const org_address = useRef(null);
    const org_phoneNo = useRef(null);
    const org_balance = useRef(null);

    let handleUser = (e) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrftoken },
            body: JSON.stringify({ data: CryptoJS.AES.encrypt(localStorage.getItem('user'), encryption_key, { iv: iv, mode: CryptoJS.mode.CBC }).toString() + enc + IV }),

        };

        fetch('/api/get-user/', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setUserData(data);
            });
    }
    let handleOrganisation = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrftoken },
            body: JSON.stringify({ data: CryptoJS.AES.encrypt(localStorage.getItem('organisation'), encryption_key, { iv: iv, mode: CryptoJS.mode.CBC }).toString() + enc + IV }),

        };

        fetch('/api/get-organization/', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setUserData(data);
            });
    }

    let handleEdit = () => {
        setEdit(true);
    }
    let handleSaveData = (e) => {
        e.preventDefault();
        if (UserType === 'user') {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrftoken },
                body: JSON.stringify({
                    data: CryptoJS.AES.encrypt(JSON.stringify({
                        id: UserData.id,
                        dob: user_dob.current.value,
                        gender: user_gender.current.value,
                        address: user_address.current.value,
                        phoneNo: user_phoneNo.current.value,
                        balance: user_balance.current.value
                    }), encryption_key, { iv: iv, mode: CryptoJS.mode.CBC }).toString() + enc + IV
                }),

            };

            fetch('/api/update-user/', requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    handleUser();
                });
        } else {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrftoken },
                body: JSON.stringify({
                    data: CryptoJS.AES.encrypt(JSON.stringify({
                        id: UserData.id,
                        address: org_address.current.value,
                        phoneNo: org_phoneNo.current.value,
                        balance: org_balance.current.value
                    }), encryption_key, { iv: iv, mode: CryptoJS.mode.CBC }).toString() + enc + IV
                }),
            };

            fetch('/api/update-organization/', requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    handleOrganisation();
                });
        }
        setEdit(false);
    }
    useEffect(() => {
        if (localStorage.getItem('user') === null) {
            if (localStorage.getItem('organisation') === null) {
                window.location.href = '/';
            } else {
                setUserType('organisation');
                handleOrganisation();
            }
        } else {
            setUserType('user');
            handleUser();
        }
    }, []);

    return (
        <div>
            <Navbar name={JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).name : localStorage.getItem('organisation') ? JSON.parse(localStorage.getItem('organisation')).name : window.location.href = '/'} />
            {UserType === 'user' ?
                <div className='UPROFILE'>
                    <div className='PROFILECONTAINER'>
                        <div className='PROFILEHEADER'>
                            <div className="USER_DETAILS">
                                <div className="USER_PROFILE_IMAGE">
                                    <img className="img" src="/static/images/user.png" alt="/" />
                                </div>
                                <div className="USER_DETAILS_DATA">
                                    <div className="USER_DETAILS_NAME">
                                        {UserData.name}
                                    </div>
                                    <div className="USER_DETAILS_PHONE">
                                        ID : {UserData.id}
                                    </div>
                                    <div className="USER_DETAILS_PHONE">
                                        {UserData.userType === 'P' ? 'Patient' : UserData.userType === 'D' ? 'Doctor' : 'Please Login'}
                                    </div>
                                </div>

                            </div>
                            <hr style={{ width: '600px' }} />
                            <div>Date of Birth:
                                <input ref={user_dob} defaultValue={UserData.dob} type="date" className="form-control" name="dob" aria-describedby="idHelp" placeholder="Enter DOB" disabled />
                            </div>
                            <div>Gender:
                                <select ref={user_gender} defaultValue={UserData.gender} className="form-control" name='gender' disabled={Edit ? "" : "disabled"}>
                                    <option value="DEFAULT" disabled>Select Gender</option>
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                    <option value="O">Other</option>
                                </select> </div>
                            <div>Phone No:
                                <input ref={user_phoneNo} defaultValue={UserData.phoneNo} type="text" className="form-control" name="phoneNo" aria-describedby="idHelp" placeholder="Enter Phone" disabled={Edit ? "" : "disabled"} />
                            </div>
                            <div>Address:
                                <input ref={user_address} defaultValue={UserData.address} type="text" className="form-control" name="address" aria-describedby="idHelp" placeholder="Enter Address" disabled={Edit ? "" : "disabled"} />
                            </div>
                            <div>Aadhar No:
                                <input defaultValue={UserData.aadharNo} type="text" className="form-control" name="aadharNo" aria-describedby="idHelp" placeholder="Enter Aadhar" disabled />
                            </div>
                            <div>Balance:
                                <input ref={user_balance} defaultValue={UserData.balance} type="text" className="form-control" name="balance" aria-describedby="idHelp" placeholder="Enter Balance" disabled={Edit ? "" : "disabled"} />
                            </div>
                            <button onClick={handleEdit} style={{ marginTop: '20px', marginRight: '20px' }} type="submit" className="btn btn-outline-dark">EDIT PROFILE INFORMATION</button>
                            {Edit ? <button onClick={handleSaveData} style={{ marginTop: '20px' }} type="submit" className="btn btn-outline-dark">SAVE INFORMATION CHANGES</button> : null}
                        </div>
                    </div>
                </div> :
                <div className='UPROFILE'>
                    <div className='PROFILECONTAINER'>
                        <div className='PROFILEHEADER'>
                            <div className="USER_DETAILS">
                                <div className="USER_PROFILE_IMAGE">
                                    <img className="img" src="/static/images/user.png" alt="/" />
                                </div>
                                <div className="USER_DETAILS_DATA">
                                    <div className="USER_DETAILS_NAME">
                                        {UserData.name}
                                    </div>
                                    <div className="USER_DETAILS_PHONE">
                                        ID : {UserData.id}
                                    </div>
                                    <div className='USER_DETAILS_PHONE'>
                                        {UserData.orgType === 'P' ? 'Pharmacy' : UserData.orgType === 'H' ? 'Hospital' : UserData.orgType === 'I' ? 'Insurance Company' : 'Please Login'}
                                    </div>
                                </div>

                            </div>
                            <hr style={{ width: '600px' }} />
                            <div>Phone No:
                                <input ref={org_phoneNo} defaultValue={UserData.phoneNo} type="text" className="form-control" name="phoneNo" aria-describedby="idHelp" placeholder="Enter Phone" disabled={Edit ? "" : "disabled"} />
                            </div>
                            <div>Address:
                                <input ref={org_address} defaultValue={UserData.address} type="text" className="form-control" name="address" aria-describedby="idHelp" placeholder="Enter Address" disabled={Edit ? "" : "disabled"} />
                            </div>
                            <div>License No:
                                <input defaultValue={UserData.aadharNo} type="text" className="form-control" name="aadharNo" aria-describedby="idHelp" placeholder="Enter Aadhar" disabled />
                            </div>
                            <div>Balance:
                                <input ref={org_balance} defaultValue={UserData.balance} type="text" className="form-control" name="balance" aria-describedby="idHelp" placeholder="Enter Balance" disabled={Edit ? "" : "disabled"} /><small id="idHelp" className="form-text text-muted">We will never share your id with anyone else.</small>
                                <small id="idHelp" className="form-text text-muted">Edit Wallet Balance As You Wish</small>
                            </div>

                            <button onClick={handleEdit} style={{ marginTop: '20px', marginRight: '20px' }} type="submit" className="btn btn-outline-dark" >EDIT PROFILE INFORMATION</button>
                            {Edit ? <button onClick={handleSaveData} style={{ marginTop: '20px' }} type="submit" className="btn btn-outline-dark">SAVE INFORMATION CHANGES</button> : null}
                        </div>
                    </div>
                </div>}
        </div>
    )
}

export default ProfileInformation