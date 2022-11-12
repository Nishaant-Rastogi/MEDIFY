import React, { useState, ReactDOM, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/verification.css';


const Verification = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const trials = 10;
    const [OTP, setOTP] = useState('');
    const [type, setType] = useState('');
    const [orgType, setOrgType] = useState('');
    const [signup, setSignup] = useState(false);
    const [input, setInput] = useState('');

    let handleOTP = (e) => {
        e.preventDefault()
        const code = e.target.one.value + e.target.two.value + e.target.three.value + e.target.four.value;

        if (signup) {
            navigate('/');
            return;
        }

        if (code === OTP) {
            if (type && type === 'P') {
                navigate('/user/patients/home');
            } else if (type && type === 'D') {
                navigate('/user/doctors/home');
            } else if (orgType && orgType === 'P') {
                navigate('/organisation/pharmacy/home');
            } else if (orgType && orgType === 'H') {
                navigate('/organisation/hospitals/home');
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
    const digitValidate = (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    }


    const tabChange = (val) => {
        let curr = document.getElementById(val);
        let prev = document.getElementById(val - 1);
        let prevPrev = document.getElementById(val - 2);
        if (prev.value !== '') {
            curr.focus()
        } else if (prev.value === '') {
            prevPrev.focus()
        }
    }

    useEffect(() => {
        if (!location.state) {
            navigate('/');
        } else {
            setOTP(location.state.otp);
            setType(location.state.type);
            setOrgType(location.state.orgType);
            setSignup(location.state.signup);
            document.getElementById('1').focus();
        }
    }, [])
    useEffect(() => {
        if (input.length === 5) {
            return;
        }
    }, [input])
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
                                    <input className="otp" style={{ marginRight: '3px' }} value={input[0]} name='one' id='1' type="text" onChange={(e) => { digitValidate(e); tabChange(2) }} maxLength={1} />
                                    <input className="otp" style={{ marginRight: '3px' }} value={input[1]} name='two' id='2' type="text" onChange={(e) => { digitValidate(e); tabChange(3) }} maxLength={1} />
                                    <input className="otp" style={{ marginRight: '3px' }} value={input[2]} name='three' id='3' type="text" onChange={(e) => { digitValidate(e); tabChange(4) }} maxLength={1} />
                                    <input className="otp" style={{ marginRight: '3px' }} value={input[3]} name='four' id='4' type="text" onChange={(e) => { digitValidate(e) }} maxLength={1} />
                                    <hr className="mt-4" />
                                    <p>OTP sent to your email</p>
                                    <button type='submit' id='verify' className='btn btn-primary btn-block mt-4 mb-4 customBtn'>Verify</button>
                                </form>
                                <div className="btn-group-vertical ml-4 mt-4" role="group" aria-label="Basic example" style={{ width: "300px", right: '10px' }}>
                                    <div className="btn-group">
                                        <button type="button" onClick={(e) => setInput(input + '1')} className="btn btn-outline-secondary py-3" >1</button>
                                        <button type="button" onClick={(e) => setInput(input + '2')} className="btn btn-outline-secondary py-3" >2</button>
                                        <button type="button" onClick={(e) => setInput(input + '3')} className="btn btn-outline-secondary py-3" >3</button>
                                    </div>
                                    <div className="btn-group">
                                        <button type="button" onClick={(e) => setInput(input + '4')} className="btn btn-outline-secondary py-3" >4</button>
                                        <button type="button" onClick={(e) => setInput(input + '5')} className="btn btn-outline-secondary py-3" >5</button>
                                        <button type="button" onClick={(e) => setInput(input + '6')} className="btn btn-outline-secondary py-3" >6</button>
                                    </div>
                                    <div className="btn-group">
                                        <button type="button" onClick={(e) => setInput(input + '7')} className="btn btn-outline-secondary py-3" >7</button>
                                        <button type="button" onClick={(e) => setInput(input + '8')} className="btn btn-outline-secondary py-3" >8</button>
                                        <button type="button" onClick={(e) => setInput(input + '9')} className="btn btn-outline-secondary py-3" >9</button>
                                    </div>
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-outline-secondary py-3" >DEL</button>
                                        <button type="button" onClick={(e) => setInput(input + '0')} className="btn btn-outline-secondary py-3" >0</button>
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