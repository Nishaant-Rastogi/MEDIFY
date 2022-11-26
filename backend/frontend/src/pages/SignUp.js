import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/signup.css'
var sanitize = require('mongo-sanitize');
import bcrypt from 'bcryptjs'
var CryptoJS = require("crypto-js");
import TokenService from "./TokenService";

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

const SignUp = () => {
    const [signUpAsUser, setSignUpAsUser] = useState(true)
    let navigate = useNavigate()
    const [userType, setUserType] = useState('P')
    const [hospitals, setHospitals] = useState([])
    const [hospital, setHospital] = useState('')
    const [userProof, setUserProof] = useState(null)
    const [doctorProof, setDoctorProof] = useState(null)
    const [licenseProof, setLicenseProof] = useState(null)
    const [orgImages, setOrgImages] = useState(null)
    const [aadhar, setAadhar] = useState(true)
    const [license, setLicense] = useState(true)
    const [email, setEmail] = useState(true)

    let handleSignUpAsUser = async (e) => {
        e.preventDefault()
        handleAadhar(e, sanitize(e.target.aadharNo.value))
        handleEmail(e, sanitize(e.target.email.value))
        if (e.target.user_password.value !== e.target.confirm_user_password.value) {
            alert("Passwords don't match!")
            return
        }
        if (e.target.user_password.value.length < 8) {
            alert("Password must be atleast 8 characters long!")
            return
        }
        if (e.target.aadharNo.value.length !== 12) {
            alert("Aadhar number must be 12 digits long!")
            return
        }
        if (e.target.phoneNo.value.length !== 10) {
            alert("Phone number must be 10 digits long!")
            return
        }
        const userFormData = new FormData();
        const user_proof = new File([userProof], sanitize(e.target.aadharNo.value) + "_user_proof.jpg", { type: "image/jpeg" })
        userFormData.append('name', sanitize(e.target.name.value))
        userFormData.append('dob', e.target.dob.value)
        userFormData.append('gender', e.target.gender.value)
        userFormData.append('address', sanitize(e.target.address.value))
        userFormData.append('email', sanitize(e.target.email.value))
        userFormData.append('password', bcrypt.hashSync(sanitize(e.target.user_password.value), salt))
        userFormData.append('aadharNo', sanitize(e.target.aadharNo.value))
        userFormData.append('phoneNo', sanitize(e.target.phoneNo.value))
        userFormData.append('userType', 'P')
        userFormData.append('user_proof', user_proof)

        if (e.target.userType.value === 'D') {
            const doctor_proof = new File([doctorProof], sanitize(e.target.aadharNo.value) + "_doctor_proof.jpg", { type: "image/jpeg" })
            userFormData.append('hospital', hospital.id)
            userFormData.append('userType', 'D')
            userFormData.append('specialization', e.target.specialization.value)
            userFormData.append('experience', e.target.experience.value)
            userFormData.append('doctor_proof', doctor_proof)
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrftoken },
            body: JSON.stringify({ data: CryptoJS.AES.encrypt(JSON.stringify(Object.fromEntries(userFormData)), encryption_key, { iv: iv, mode: CryptoJS.mode.CBC }).toString() + enc + IV }),
        };
        fetch('/api/create-user/', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                // sendEmail(e)
                navigate('/verification', { state: { type: e.target.userType.value, id: data.id, name: data.name, email: data.email, signup: true } })
            })
    }
    let handleSignUpAsOrganization = async (e) => {
        e.preventDefault()
        handleEmail(e, sanitize(e.target.email.value));
        handleLicense(e, sanitize(e.target.licenseNo.value));
        if (e.target.org_password.value !== e.target.confirm_org_password.value) {
            alert("Passwords don't match!")
            return
        }
        if (e.target.org_password.value.length < 8) {
            alert("Password must be atleast 8 characters long!")
            return
        }
        if (e.target.licenseNo.value.length !== 12) {
            alert("License number must be 12 digits long!")
            return
        }
        if (e.target.phoneNo.value.length !== 10) {
            alert("Phone number must be 10 digits long!")
            return
        }
        const orgFormData = new FormData();
        const new_images = new File([orgImages], sanitize(e.target.licenseNo.value) + '_org.jpg')
        const new_license = new File([licenseProof], sanitize(e.target.licenseNo.value) + '_license.jpg')
        orgFormData.append('name', sanitize(e.target.name.value))
        orgFormData.append('address', sanitize(e.target.address.value))
        orgFormData.append('email', sanitize(e.target.email.value))
        orgFormData.append('password', bcrypt.hashSync(sanitize(e.target.org_password.value), salt))
        orgFormData.append('licenseNo', sanitize(e.target.licenseNo.value))
        orgFormData.append('phoneNo', sanitize(e.target.phoneNo.value))
        orgFormData.append('orgType', e.target.orgType.value)
        orgFormData.append('org_images', new_images)
        orgFormData.append('license_proof', new_license)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrftoken },
            body: JSON.stringify({ data: CryptoJS.AES.encrypt(JSON.stringify(Object.fromEntries(orgFormData)), encryption_key, { iv: iv, mode: CryptoJS.mode.CBC }).toString() + enc + IV }),
        };
        fetch('/api/create-organization/', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                // sendEmail(e)
                navigate('/verification', { state: { orgType: e.target.orgType.value, id: data.id, name: data.name, email: data.email, signup: true } })

            });
    }

    let handleHospitals = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch('/api/get-hospitals/', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setHospitals(data);
            });
    }
    let handleAadhar = async (e, aadharNo) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrftoken },
            body: JSON.stringify({ data: CryptoJS.AES.encrypt(JSON.stringify({ aadhar: aadharNo }), encryption_key, { iv: iv, mode: CryptoJS.mode.CBC }).toString() + enc + IV }),
        };

        fetch('/api/get-aadhar/', requestOptions)
            .then((response) => response.json())
            .then((data) => { console.log(data); setAadhar(data.data) });
    }
    let handleLicense = async (e, licenseNo) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrftoken },
            body: JSON.stringify({ data: CryptoJS.AES.encrypt(JSON.stringify({ license: licenseNo }), encryption_key, { iv: iv, mode: CryptoJS.mode.CBC }).toString() + enc + IV }),
        };

        fetch('/api/get-license/', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setLicense(data.data)
            });
    }
    let handleEmail = async (e, emailId) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrftoken },
            body: JSON.stringify({ data: CryptoJS.AES.encrypt(JSON.stringify({ email: emailId }), encryption_key, { iv: iv, mode: CryptoJS.mode.CBC }).toString() + enc + IV }),
        };

        fetch('/api/get-email/', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setEmail(data.data);
            })
    }
    useEffect(() => {
        handleHospitals()
    }, [])
    useEffect(() => {
        if (aadhar === false) {
            alert("Aadhar number already exists! Please Enter Unique Aadhar No")
            window.location.reload()
            return
        }
        if (email === false) {
            alert("Email already exists! Please Enter Unique Email")
            window.location.reload()
            return
        }
        if (license === false) {
            alert("License number already exists! Please Enter Unique License No")
            window.location.reload()
            return
        }
    }, [aadhar, license, email])
    useEffect(() => {
        hospitals.map((hos) => hos.id === hospital.id ? setHospital(hos) : null)
    }, [hospital])

    return (
        <div className='SIGNUP'>
            <img className="SIGNUPIMG" src="/static/images/Healthcare-portal.jpg" />
            <div className='SIGNUPCONTAINER' style={userType === 'D' ? { height: '1050px' } : null}>
                <div className='SIGNUPS'>
                    <div className='USER'>
                        <button type="button" className="btn COLOR" active="true" onClick={() => { setSignUpAsUser(true) }}>USER</button>
                    </div>
                    <div className='ORGANISATION'>
                        <button type="button" className="btn COLOR" onClick={() => { setSignUpAsUser(false) }}>ORGANISATION</button>
                    </div>
                </div>
                <div className='FORMCONTAINER'>
                    {signUpAsUser ?
                        <form onSubmit={handleSignUpAsUser}>
                            <TokenService />
                            <div className="form-group">
                                <label html="exampleInputid1">Name</label>
                                <input type="id" className="form-control" name="name" aria-describedby="idHelp" placeholder="Enter Name" required />
                                {/* <small id="idHelp" className="form-text text-muted">We will never share your id with anyone else.</small> */}
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div className="form-group" style={{ marginRight: '20px' }}>
                                    <label html="exampleInputid1">Date of Birth</label>
                                    <input type="date" className="form-control" name="dob" aria-describedby="idHelp" placeholder="Enter DOB" required />
                                    {/* <small id="idHelp" className="form-text text-muted">We will never share your id with anyone else.</small> */}
                                </div>
                                <div className="form-group" aria-label="Default select example">
                                    <label html="exampleInputid1">Gender</label><br></br>
                                    <select defaultValue={'DEFAULT'} className="form-control" name='gender' required>
                                        <option value="DEFAULT" disabled>Select Gender</option>
                                        <option value="M">Male</option>
                                        <option value="F">Female</option>
                                        <option value="O">Other</option>
                                    </select>
                                </div>
                                {/* <small id="idHelp" className="form-text text-muted">We will never share your id with anyone else.</small> */}
                            </div>
                            <div className="form-group">
                                <label html="exampleInputid1">Address</label>
                                <input type="text" className="form-control" name="address" aria-describedby="idHelp" placeholder="Enter Address" required />
                                {/* <small id="idHelp" className="form-text text-muted">We will never share your id with anyone else.</small> */}
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div className="form-group" style={{ marginRight: '20px' }}>
                                    <label html="exampleInputid1">Phone No</label>
                                    <input type="text" className="form-control" name="phoneNo" aria-describedby="idHelp" placeholder="Enter Phone" required />
                                    {/* <small id="idHelp" className="form-text text-muted">We will never share your id with anyone else.</small> */}
                                </div>
                                <div className="form-group">
                                    <label html="exampleInputid1">Aadhar No</label>
                                    <input type="text" className="form-control" name="aadharNo" aria-describedby="idHelp" placeholder="Enter Aadhar No" required />
                                    <small id="idHelp" className="form-text text-muted">Aadhar is a 12 digit ID no.</small>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="formFile" className="form-label">Upload Identity Proof (Aadhar Card)</label>
                                <input className="form-control" onChange={(e) => { setUserProof(e.target.files[0]) }} name="user_proof" type="file" accept=".jpg, .jpeg" id="formFile" required />
                            </div>
                            <div className="form-group" aria-label="Default select example">
                                <label html="exampleInputid1">User Type</label><br></br>
                                <select defaultValue={"DEFAULT"} onChange={(e) => { setUserType(e.target.value) }} className="form-control" name="userType" required>
                                    <option value="DEFAULT" disabled>Select Type of User</option>
                                    <option value="P">Patient</option>
                                    <option value="D">Doctor</option>
                                </select>
                            </div>
                            {userType === 'D' ?
                                <div>
                                    <div style={{ display: 'flex' }}>
                                        <div className="form-group" style={{ marginRight: '20px' }}>
                                            <label html="exampleInputid1">Specialization</label><br></br>
                                            <select defaultValue={"DEFAULT"} className="form-control" name="specialization" required>
                                                <option value="DEFAULT" disabled>Select Specialization</option>
                                                <option value="O">Ortho</option>
                                                <option value="N">Neuro</option>
                                                <option value="C">Cardio</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label html="exampleInputid1">Experience</label>
                                            <input type="text" className="form-control" name="experience" aria-describedby="idHelp" placeholder="Enter Experience" required />
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <div className="form-group" style={{ marginRight: '20px' }}>
                                            <label html="exampleInputid1">Hospital</label>
                                            <select defaultValue={"DEFAULT"} className="form-control" aria-label="Default select example" onChange={(e) => { setHospital({ id: e.target.value, name: e.target.value }) }} required>
                                                <option value={"DEFAULT"} disabled>Select Hospital</option>
                                                <option value="None">None</option>
                                                {
                                                    hospitals.map((hospital, index) => <option key={index} value={hospital.id}>{hospital.name}</option>)
                                                }
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="formFile" className="form-label">Upload Doctor License</label>
                                            <input className="form-control" onChange={(e) => { setDoctorProof(e.target.files[0]) }} name="doctor_proof" type="file" accept=".jpg, .jpeg" id="formFile" required />
                                        </div>
                                    </div>
                                </div>

                                : null
                            }
                            <div className="form-group">
                                <label html="exampleInputid1">Email</label>
                                <input type="id" className="form-control" name="email" aria-describedby="idHelp" placeholder="Enter Email" required />
                                {/* <small id="idHelp" className="form-text text-muted">We will never share your id with anyone else.</small> */}
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div className="form-group" style={{ marginRight: '20px' }}>
                                    <label html="exampleInputPassword1">Password</label>
                                    <input type="password" className="form-control" name="user_password" placeholder="Password" required />
                                </div>
                                <div className="form-group">
                                    <label html="exampleInputPassword1">Confirm Password</label>
                                    <input type="password" className="form-control" name="confirm_user_password" placeholder="Confirm Password" required />
                                </div>
                            </div>
                            <button type="submit" className="btn COLOR SIGNUPB">Sign Up User</button>
                        </form> :
                        <form onSubmit={handleSignUpAsOrganization}>
                            <TokenService />
                            <div className="form-group">
                                <label html="exampleInputid1">Name</label>
                                <input type="id" className="form-control" name="name" aria-describedby="idHelp" placeholder="Enter Name" required />
                            </div>
                            <div className="form-group" aria-label="Default select example">
                                <label html="exampleInputid1">Type Of Organisation</label><br></br>
                                <select defaultValue={"DEFAULT"} className="form-control" name='orgType' required>
                                    <option value="DEFAULT" disabled>Select Organization Type</option>
                                    <option value="H">Hospital</option>
                                    <option value="I">Insurance</option>
                                    <option value="P">Pharmacy</option>
                                </select>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div className="form-group" style={{ marginRight: '20px' }}>
                                    <label html="exampleInputid1">License No</label>
                                    <input type="id" className="form-control" name="licenseNo" aria-describedby="idHelp" placeholder="Enter License No" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="formFile" className="form-label">Upload License Proof</label>
                                    <input className="form-control" onChange={(e) => { setLicenseProof(e.target.files[0]) }} name="license_proof" type="file" accept=".jpg, .jpeg" id="formFile" required />
                                </div>
                            </div>

                            <div style={{ display: 'flex' }}>
                                <div className="form-group" style={{ marginRight: '20px' }}>
                                    <label html="exampleInputid1">Description</label>
                                    <input type="id" className="form-control" name="description" aria-describedby="idHelp" placeholder="Enter Description" required />
                                </div>
                                <div className="form-group">
                                    <label html="exampleInputid1">Contact No</label>
                                    <input type="text" className="form-control" name="phoneNo" aria-describedby="idHelp" placeholder="Enter Phone" required />
                                    {/* <small id="idHelp" className="form-text text-muted">We will never share your id with anyone else.</small> */}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="formFileMultiple" className="form-label">Upload 2 Organisation Images</label>
                                <input className="form-control" onChange={(e) => { setOrgImages(e.target.files[0], e.target.files[1]) }} name="organisation_images" type="file" accept=".jpg, .jpeg" id="formFileMultiple" multiple required />
                            </div>
                            <div className="form-group">
                                <label html="exampleInputid1">Address</label>
                                <input type="text" className="form-control" name="address" aria-describedby="idHelp" placeholder="Enter Address" required />
                                {/* <small id="idHelp" className="form-text text-muted">We will never share your id with anyone else.</small> */}
                            </div>
                            <div className="form-group">
                                <label html="exampleInputid1">Email</label>
                                <input type="id" className="form-control" name="email" aria-describedby="idHelp" placeholder="Enter Email" required />
                                {/* <small id="idHelp" className="form-text text-muted">We will never share your id with anyone else.</small> */}
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div className="form-group" style={{ marginRight: '20px' }}>
                                    <label html="exampleInputPassword1">Password</label>
                                    <input type="password" className="form-control" name="org_password" placeholder="Password" required />
                                </div>
                                <div className="form-group">
                                    <label html="exampleInputPassword1">Confirm Password</label>
                                    <input type="password" className="form-control" name="confirm_org_password" placeholder="Confirm Password" required />
                                </div>
                            </div>
                            <button type="submit" className="btn COLOR SIGNUPB">Sign Up Organisation</button>
                        </form>}
                </div>
            </div>
        </div >
    )
}

export default SignUp