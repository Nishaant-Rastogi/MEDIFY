import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/signup.css'
import emailjs from '@emailjs/browser'

const SignUp = () => {
    const [signUpAsUser, setSignUpAsUser] = useState(true)
    let navigate = useNavigate()
    const [userType, setUserType] = useState('P')
    let otp = ''

    let generateOTP = () => {
        var digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < 4; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
    }

    let sendEmail = (e) => {
        e.preventDefault()
        // console.log(e.target.email.value);
        otp = generateOTP();
        console.log(otp);
        emailjs.send(
            "service_fq04boo",
            "template_50ai34b",
            {
                from_name: "MEDIFY",
                to_name: e.target.name.value,
                message: otp,
                to_email: e.target.email.value,
            },
            'user_LaY6RXGTYd7nadYRQtJ3W'
        )
    }

    let handleSignUpAsUser = async (e) => {
        e.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: e.target.userType.value === 'P' ?
                JSON.stringify({
                    name: e.target.name.value,
                    dob: e.target.dob.value,
                    gender: e.target.gender.value,
                    address: e.target.address.value,
                    phoneNo: e.target.phoneNo.value,
                    aadharNo: e.target.aadharNo.value,
                    userType: 'P',
                    email: e.target.email.value,
                    password: e.target.user_password.value,
                }) :
                JSON.stringify({
                    name: e.target.name.value,
                    dob: e.target.dob.value,
                    gender: e.target.gender.value,
                    address: e.target.address.value,
                    phoneNo: e.target.phoneNo.value,
                    aadharNo: e.target.aadharNo.value,
                    userType: 'D',
                    email: e.target.email.value,
                    password: e.target.user_password.value,
                    specialization: e.target.specialization.value,
                    experience: e.target.experience.value,
                }),
        };
        fetch('/api/create-user/', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                sendEmail(e)
                console.log('sent', otp);
                navigate('/verification', { state: { otp: otp, type: e.target.userType.value, signup: true } })
            })
    }
    let handleSignUpAsOrganization = async (e) => {
        e.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: e.target.name.value,
                licenseNo: e.target.licenseNo.value,
                address: e.target.address.value,
                phoneNo: e.target.phoneNo.value,
                orgType: e.target.orgType.value,
                email: e.target.email.value,
                password: e.target.org_password.value,
            }),
        };
        fetch('/api/create-organization/', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                sendEmail(e)
                navigate('/verification', { state: { otp: otp, orgType: e.target.orgType.value, signup: true } })

            });
    }

    return (
        <div className='SIGNUP'>
            <img className="SIGNUPIMG" src="/static/images/Healthcare-portal.jpg" />
            <div className='SIGNUPCONTAINER'>
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
                            <div className="form-group">
                                <label html="exampleInputid1">Name</label>
                                <input type="id" className="form-control" name="name" aria-describedby="idHelp" placeholder="Enter Name" />
                                {/* <small id="idHelp" className="form-text text-muted">We will never share your id with anyone else.</small> */}
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div className="form-group" style={{ marginRight: '20px' }}>
                                    <label html="exampleInputid1">Date of Birth</label>
                                    <input type="date" className="form-control" name="dob" aria-describedby="idHelp" placeholder="Enter DOB" />
                                    {/* <small id="idHelp" className="form-text text-muted">We will never share your id with anyone else.</small> */}
                                </div>
                                <div className="form-group" aria-label="Default select example">
                                    <label html="exampleInputid1">Gender</label><br></br>
                                    <select defaultValue={'DEFAULT'} className="form-control" name='gender'>
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
                                <input type="text" className="form-control" name="address" aria-describedby="idHelp" placeholder="Enter Address" />
                                {/* <small id="idHelp" className="form-text text-muted">We will never share your id with anyone else.</small> */}
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div className="form-group" style={{ marginRight: '20px' }}>
                                    <label html="exampleInputid1">Phone No</label>
                                    <input type="text" className="form-control" name="phoneNo" aria-describedby="idHelp" placeholder="Enter Phone" />
                                    {/* <small id="idHelp" className="form-text text-muted">We will never share your id with anyone else.</small> */}
                                </div>
                                <div className="form-group">
                                    <label html="exampleInputid1">Aadhar No</label>
                                    <input type="text" className="form-control" name="aadharNo" aria-describedby="idHelp" placeholder="Enter Aadhar" />
                                    {/* <small id="idHelp" className="form-text text-muted">We will never share your id with anyone else.</small> */}
                                </div>
                            </div>
                            <div className="form-group" aria-label="Default select example">
                                <label html="exampleInputid1">User Type</label><br></br>
                                <select defaultValue={"DEFAULT"} onChange={(e) => { console.log(e.target.value); setUserType(e.target.value) }} className="form-control" name="userType">
                                    <option value="DEFAULT" disabled>Select Type of User</option>
                                    <option value="P">Patient</option>
                                    <option value="D">Doctor</option>
                                </select>
                            </div>
                            {userType === 'D' ?
                                <div style={{ display: 'flex' }}>
                                    <div className="form-group" style={{ marginRight: '20px' }}>
                                        <label html="exampleInputid1">Specialization</label><br></br>
                                        <select defaultValue={"DEFAULT"} className="form-control" name="specialization">
                                            <option value="DEFAULT" disabled>Select Specialization</option>
                                            <option value="O">Ortho</option>
                                            <option value="N">Neuro</option>
                                            <option value="C">Cardio</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label html="exampleInputid1">Experience</label>
                                        <input type="text" className="form-control" name="experience" aria-describedby="idHelp" placeholder="Enter Experience" />
                                    </div>
                                </div>
                                : null
                            }
                            <div className="form-group">
                                <label html="exampleInputid1">Email</label>
                                <input type="id" className="form-control" name="email" aria-describedby="idHelp" placeholder="Enter Email" />
                                {/* <small id="idHelp" className="form-text text-muted">We will never share your id with anyone else.</small> */}
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div className="form-group" style={{ marginRight: '20px' }}>
                                    <label html="exampleInputPassword1">Password</label>
                                    <input type="password" className="form-control" name="user_password" placeholder="Password" />
                                </div>
                                <div className="form-group">
                                    <label html="exampleInputPassword1">Confirm Password</label>
                                    <input type="password" className="form-control" name="confirm_user_password" placeholder="Confirm Password" />
                                </div>
                            </div>
                            <button type="submit" className="btn COLOR SIGNUPB">Sign Up User</button>
                        </form> :
                        <form onSubmit={handleSignUpAsOrganization}>
                            <div className="form-group">
                                <label html="exampleInputid1">Name</label>
                                <input type="id" className="form-control" name="name" aria-describedby="idHelp" placeholder="Enter Name" />
                            </div>
                            <div className="form-group" aria-label="Default select example">
                                <label html="exampleInputid1">Type Of Organisation</label><br></br>
                                <select defaultValue={"DEFAULT"} className="form-control" name='orgType'>
                                    <option value="DEFAULT" disabled>Select Organization Type</option>
                                    <option value="H">Hospital</option>
                                    <option value="I">Insurance</option>
                                    <option value="P">Pharmacy</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label html="exampleInputid1">License No</label>
                                <input type="id" className="form-control" name="licenseNo" aria-describedby="idHelp" placeholder="Enter License No" />
                            </div>
                            <div className="form-group">
                                <label html="exampleInputid1">Contact No</label>
                                <input type="text" className="form-control" name="phoneNo" aria-describedby="idHelp" placeholder="Enter Phone" />
                                {/* <small id="idHelp" className="form-text text-muted">We will never share your id with anyone else.</small> */}
                            </div>
                            <div className="form-group">
                                <label html="exampleInputid1">Address</label>
                                <input type="text" className="form-control" name="address" aria-describedby="idHelp" placeholder="Enter Address" />
                                {/* <small id="idHelp" className="form-text text-muted">We will never share your id with anyone else.</small> */}
                            </div>
                            <div className="form-group">
                                <label html="exampleInputid1">Email</label>
                                <input type="id" className="form-control" name="email" aria-describedby="idHelp" placeholder="Enter Email" />
                                {/* <small id="idHelp" className="form-text text-muted">We will never share your id with anyone else.</small> */}
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div className="form-group" style={{ marginRight: '20px' }}>
                                    <label html="exampleInputPassword1">Password</label>
                                    <input type="password" className="form-control" name="org_password" placeholder="Password" />
                                </div>
                                <div className="form-group">
                                    <label html="exampleInputPassword1">Confirm Password</label>
                                    <input type="password" className="form-control" name="confirm_org_password" placeholder="Confirm Password" />
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