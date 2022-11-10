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
                OTP = 0;

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
                                    <input className="otp" style={{ marginRight: '3px' }} name='one' id='1' type="text" onChange={(e) => digitValidate(e)} onKeyUp={() => tabChange(2)} maxLength={1} />
                                    <input className="otp" style={{ marginRight: '3px' }} name='two' id='2' type="text" onChange={(e) => digitValidate(e)} onKeyUp={() => tabChange(3)} maxLength={1} />
                                    <input className="otp" style={{ marginRight: '3px' }} name='three' id='3' type="text" onChange={(e) => digitValidate(e)} onKeyUp={() => tabChange(4)} maxLength={1} />
                                    <input className="otp" style={{ marginRight: '3px' }} name='four' id='4' type="text" onChange={(e) => digitValidate(e)} maxLength={1} />
                                    <hr className="mt-4" />
                                    <p>OTP sent to your email</p>
                                    <button type='submit' id='verify' className='btn btn-primary btn-block mt-4 mb-4 customBtn'>Verify</button>
                                </form>
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