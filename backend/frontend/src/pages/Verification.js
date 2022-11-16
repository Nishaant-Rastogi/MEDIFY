import React, { useState, ReactDOM, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/verification.css';
import emailjs from '@emailjs/browser'


const Verification = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const trials = 10;
    const [OTP, setOTP] = useState('');
    const [type, setType] = useState('');
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [orgType, setOrgType] = useState('');
    const [signup, setSignup] = useState(false);
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');
    const [input4, setInput4] = useState('');

    let handleVerification = (e, path) => {
        e.preventDefault();
        const requiredOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        }
        console.log(requiredOptions)
        fetch("/api/verify/", requiredOptions)
            .then(response => response.json())
            .then(data => {
                console.log("first")
                navigate(path);
            })
    }

    let handleInput = (input) => {
        if (input !== 'DEL') {
            if (input1.length < 1) {
                setInput1(input);
            } else if (input2.length < 1) {
                setInput2(input);
            } else if (input3.length < 1) {
                setInput3(input);
            } else if (input4.length < 1) {
                setInput4(input);
            } else {
                return;
            }
        } else {
            if (input4.length > 0) {
                setInput4('');
            } else if (input3.length > 0) {
                setInput3('');
            } else if (input2.length > 0) {
                setInput2('');
            } else if (input1.length > 0) {
                setInput1('');
            } else {
                return;
            }
        }
    }
    let sendEmail = (e) => {
        e.preventDefault()
        try {
            emailjs.send(
                "service_fq04boo",
                "template_fbjb1dn",
                {
                    from_name: "MEDIFY",
                    to_name: name,
                    message: id,
                    to_email: email,
                },
                'user_LaY6RXGTYd7nadYRQtJ3W'
            )
        } catch (err) {
            alert(err);
        }
    }
    let handleOTP = (e) => {
        e.preventDefault()
        const code = input1 + input2 + input3 + input4;
        if (signup) {
            if (code === OTP) {
                sendEmail(e);
                handleVerification(e, '/');
                return;
            } else {
                if (trials > 0) {
                    alert('WRONG OTP! PLEASE RETRY')
                    trials--;
                } else {
                    alert('OTP EXPIRED! PLEASE RETRY')
                }
            }
        }

        if (code === OTP) {
            if (type && type === 'P') {
                sendEmail(e);
                handleVerification(e, '/user/patients/home');
            } else if (type && type === 'D') {
                sendEmail(e);
                handleVerification(e, '/user/doctors/home');
            } else if (orgType && orgType === 'P') {
                sendEmail(e);
                handleVerification(e, '/organisation/pharmacy/home');
            } else if (orgType && orgType === 'H') {
                sendEmail(e);
                handleVerification(e, '/organisation/hospital/home');
            } else if (orgType && orgType === 'I') {
                sendEmail(e);
                handleVerification(e, '/organisation/insurance/home');
            }
        } else {
            if (trials > 0) {
                alert('WRONG OTP! PLEASE RETRY')
                trials--;
            } else {
                alert('OTP EXPIRED! PLEASE RETRY')
            }
        }

    }

    useEffect(() => {
        if (!location.state) {
            navigate('/');
        } else {
            console.log(location.state);
            setOTP(location.state.otp);
            setType(location.state.type);
            setOrgType(location.state.orgType);
            setSignup(location.state.signup);
            setId(location.state.id);
            setName(location.state.name);
            setEmail(location.state.email);
            document.getElementById('1').focus();
        }
    }, [])

    return (
        <div className='VERIFICATION'>
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col-md-4 text-center">
                        <div className="row">
                            <div className="col-sm-12 mt-5 bgWhite">
                                <div className="title">
                                    Verify OTP
                                </div>

                                <form onSubmit={handleOTP} action="" className="mt-5">
                                    <input className="otp" style={{ marginRight: '3px' }} value={input1} name='one' id='1' type="text" maxLength={1} disabled />
                                    <input className="otp" style={{ marginRight: '3px' }} value={input2} name='two' id='2' type="text" maxLength={1} disabled />
                                    <input className="otp" style={{ marginRight: '3px' }} value={input3} name='three' id='3' type="text" maxLength={1} disabled />
                                    <input className="otp" style={{ marginRight: '3px' }} value={input4} name='four' id='4' type="text" maxLength={1} disabled />
                                    <hr className="mt-4" />
                                    <p>OTP sent to your email</p>
                                    <button type='submit' id='verify' className='btn btn-primary btn-block mt-4 mb-4 customBtn'>Verify</button>
                                </form>
                                <div className="btn-group-vertical ml-4 mt-4" role="group" aria-label="Basic example" style={{ width: "300px", right: '10px' }}>
                                    <div className="btn-group">
                                        <button type="button" onClick={(e) => handleInput('1')} className="btn btn-outline-secondary py-3" >1</button>
                                        <button type="button" onClick={(e) => handleInput('2')} className="btn btn-outline-secondary py-3" >2</button>
                                        <button type="button" onClick={(e) => handleInput('3')} className="btn btn-outline-secondary py-3" >3</button>
                                    </div>
                                    <div className="btn-group">
                                        <button type="button" onClick={(e) => handleInput('4')} className="btn btn-outline-secondary py-3" >4</button>
                                        <button type="button" onClick={(e) => handleInput('5')} className="btn btn-outline-secondary py-3" >5</button>
                                        <button type="button" onClick={(e) => handleInput('6')} className="btn btn-outline-secondary py-3" >6</button>
                                    </div>
                                    <div className="btn-group">
                                        <button type="button" onClick={(e) => handleInput('7')} className="btn btn-outline-secondary py-3" >7</button>
                                        <button type="button" onClick={(e) => handleInput('8')} className="btn btn-outline-secondary py-3" >8</button>
                                        <button type="button" onClick={(e) => handleInput('9')} className="btn btn-outline-secondary py-3" >9</button>
                                    </div>
                                    <div className="btn-group">
                                        <button type="button" onClick={(e) => handleInput('DEL')} className="btn btn-outline-secondary py-3" >DEL</button>
                                        <button type="button" onClick={(e) => handleInput('0')} className="btn btn-outline-secondary py-3" >0</button>
                                        <button type="button" className="btn btn-outline-secondary py-3" ></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col-md-4 text-center">
                        <div className="row">
                            <div className="col-sm-12 mt-5 bgWhite">
                                <div className="title">
                                    Instruction
                                </div>
                                <hr className="mt-4" />
                                <p>If you are a new user, wait for Admin approval before Login.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Verification