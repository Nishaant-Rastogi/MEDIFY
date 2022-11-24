import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/verification.css';
import emailjs from '@emailjs/browser'
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

const Verification = () => {
    const location = useLocation();
    const navigate = useNavigate();
    let trials = 10;
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
    const [buttonDisabled, setButtonDisabled] = useState(false);

    let otp = ''

    let generateOTP = () => {
        var digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < 4; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
    }

    let sendEmail_OTP = () => {
        setButtonDisabled(true);
        setTimeout(() => {
            setButtonDisabled(false);
        }, 60000)
        startTimer();
        otp = generateOTP();
        setOTP(otp);
        // console.log(otp)
        try {
            alert("New OTP sent to your email");
            emailjs.send(
                "service_4pahk8s",
                "template_nzw9tlk",
                {
                    to_name: name,
                    message: otp,
                    to_email: email,
                },
                '7A_kS-q43thPMuT0U'
            ).catch((err) => {
                emailjs.send(
                    "service_iillxki",
                    "template_fiksu5v",
                    {
                        to_name: name,
                        message: otp,
                        to_email: email,
                    },
                    '6sJWKePGX8r9Kc3kc'
                ).catch((err) => {
                    emailjs.send(
                        "service_3px0u4p",
                        "template_w9crofp",
                        {
                            to_name: name,
                            message: otp,
                            to_email: email,
                        },
                        'LcBNB6520jOik-TOV'
                    ).catch((err) => { })
                })
            })
        } catch (err) {
            alert(err);
        }
    }
    let handleVerification = (e, path) => {
        e.preventDefault();
        const requiredOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: CryptoJS.AES.encrypt(JSON.stringify({ id: id }), encryption_key, { iv: iv, mode: CryptoJS.mode.CBC }).toString() + enc + IV }),
        }
        fetch("/api/verify/", requiredOptions)
            .then(response => response.json())
            .then(data => {
                location.state = null;
                navigate(path);
                alert("Verified Successfully");
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

    let handleOTP = (e) => {
        e.preventDefault()
        const code = input1 + input2 + input3 + input4;
        if (signup) {
            if (code === OTP && OTP !== '') {
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

        if (code === OTP && OTP !== '') {
            if (type && type === 'P') {
                navigate('/user/patients/home');
            } else if (type && type === 'D') {
                navigate('/user/doctors/home');
            } else if (orgType && orgType === 'P') {
                navigate('/organisation/pharmacy/home');
            } else if (orgType && orgType === 'H') {
                navigate('/organisation/hospital/home');
            } else if (orgType && orgType === 'I') {
                navigate('/organisation/insurance/home');
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
            window.onpopstate = () => {
                if (window.location.pathname === '/verification') {
                    location.state = null;
                    alert("CONFIRM FORM RESUBMISSION");
                    navigate('/signup');
                }
            }
            setType(location.state.type);
            setOrgType(location.state.orgType);
            setSignup(location.state.signup);
            setId(location.state.id);
            setName(location.state.name);
            setEmail(location.state.email);
            document.getElementById('1').focus();
        }
    }, [])

    const [seconds, setSeconds] = useState(60);
    const [isActive, setIsActive] = useState('');
    const startTimer = () => {
        setIsActive(setInterval(() => {
            setSeconds(seconds => seconds - 1);
        }, 1000))
    }

    const stopTimer = () => {
        setSeconds(60);
        clearInterval(isActive);
    }

    useEffect(() => {
        if (seconds === 0) {
            setOTP('');
            stopTimer();
            alert('OTP EXPIRED! PLEASE RESEND OTP')
        }
    }, [seconds])
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
                                    <p id="timer">Resend OTP in : {seconds} seconds</p>
                                    <button onClick={(e) => sendEmail_OTP()} className='btn btn-primary btn-block mt-4 mb-4 customBtn' disabled={buttonDisabled}>SEND OTP</button>
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