import React from 'react'
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/navbar.css'
import { Link } from 'react-router-dom';

const ProfileInformation = () => {
    const [UserData, setUserData] = useState([]);
    const [UserType, setUserType] = useState('user');
    const [Edit, setEdit] = useState(false);

    let handleUser = (e) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: localStorage.getItem('user')
        };

        fetch('/api/get-user/', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setUserData(data);
            });
    }
    let handleOrganisation = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: localStorage.getItem('organisation')
        };

        fetch('/api/get-organization/', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setUserData(data);
            });
    }

    let handleEdit = () => {
        setEdit(true);
    }
    let handleSaveData = (e) => {
        e.preventDefault();
        console.log("hello")
        if (UserType === 'user') {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: UserData.id,
                    dob: e.target.dob.value,
                    gender: e.target.gender.value,
                    address: e.target.address.value,
                    phoneNo: e.target.phoneNo.value,
                    balance: e.target.balance.value
                })
            };

            fetch('/api/update-user/', requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    handleUser();
                });
        } else {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: UserData.id,
                    address: e.target.address.value,
                    phoneNo: e.target.phoneNo.value,
                    balance: e.target.balance.value
                })
            };

            fetch('/api/update-organization/', requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    handleOrganisation();
                });
        }
        setEdit(false);
    }
    useEffect(() => {
        console.log(localStorage.getItem('user'));
        if (localStorage.getItem('user') === null) {
            setUserType('organisation');
            handleOrganisation();
        } else {
            setUserType('user');
            handleUser();
        }
    }, []);

    return (
        <div>
            <Navbar />
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
                                        {UserData.UserType === 'P' ? 'Patient' : UserData.UserType === 'D' ? 'Doctor' : 'Please Login'}
                                    </div>
                                </div>

                            </div>
                            <hr style={{ width: '600px' }} />
                            <div>Date of Birth:
                                <input defaultValue={UserData.dob} type="date" className="form-control" name="dob" aria-describedby="idHelp" placeholder="Enter DOB" disabled={Edit ? "" : "disabled"} />
                            </div>
                            <div>Gender:
                                <select defaultValue={UserData.gender} className="form-control" name='gender' disabled={Edit ? "" : "disabled"}>
                                    <option value="DEFAULT" disabled>Select Gender</option>
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                    <option value="O">Other</option>
                                </select> </div>
                            <div>Phone No:
                                <input defaultValue={UserData.phoneNo} type="text" className="form-control" name="phoneNo" aria-describedby="idHelp" placeholder="Enter Phone" disabled={Edit ? "" : "disabled"} />
                            </div>
                            <div>Address:
                                <input defaultValue={UserData.address} type="text" className="form-control" name="address" aria-describedby="idHelp" placeholder="Enter Address" disabled={Edit ? "" : "disabled"} />
                            </div>
                            <div>Aadhar No:
                                <input defaultValue={UserData.aadharNo} type="text" className="form-control" name="aadharNo" aria-describedby="idHelp" placeholder="Enter Aadhar" disabled />
                            </div>
                            <div>Balance:
                                <input defaultValue={UserData.balance} type="text" className="form-control" name="balance" aria-describedby="idHelp" placeholder="Enter Balance" disabled={Edit ? "" : "disabled"} />
                            </div>
                            <button onClick={handleEdit} style={{ marginTop: '20px', marginRight: '20px' }} type="submit" className="btn btn-outline-dark">EDIT PROFILE INFORMATION</button>
                            {Edit ? <button onSubmit={handleSaveData} style={{ marginTop: '20px' }} type="submit" className="btn btn-outline-dark">SAVE INFORMATION CHANGES</button> : null}
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
                                <input defaultValue={UserData.phoneNo} type="text" className="form-control" name="phoneNo" aria-describedby="idHelp" placeholder="Enter Phone" disabled={Edit ? "" : "disabled"} />
                            </div>
                            <div>Address:
                                <input defaultValue={UserData.address} type="text" className="form-control" name="address" aria-describedby="idHelp" placeholder="Enter Address" disabled={Edit ? "" : "disabled"} />
                            </div>
                            <div>License No:
                                <input defaultValue={UserData.aadharNo} type="text" className="form-control" name="aadharNo" aria-describedby="idHelp" placeholder="Enter Aadhar" disabled />
                            </div>
                            <div>Balance:
                                <input defaultValue={UserData.balance} type="text" className="form-control" name="balance" aria-describedby="idHelp" placeholder="Enter Balance" disabled={Edit ? "" : "disabled"} />
                            </div>
                            <button onClick={handleEdit} style={{ marginTop: '20px', marginRight: '20px' }} type="submit" className="btn btn-outline-dark" >EDIT PROFILE INFORMATION</button>
                            {Edit ? <button onSubmit={handleSaveData} style={{ marginTop: '20px' }} type="submit" className="btn btn-outline-dark">SAVE INFORMATION CHANGES</button> : null}
                        </div>
                    </div>
                </div>}
        </div>
    )
}

export default ProfileInformation