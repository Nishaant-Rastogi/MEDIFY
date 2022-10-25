import React, { useState, ReactDOM } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/verification.css';

const accountSid = REACT_APP_ACCOUNT_SID;
const authToken = REACT_APP_AUTH_TOKEN;

console.log(accountSid, authToken);
const client = require('twilio')(accountSid, authToken);

const Verification = (props) => {
    const location = useLocation();
    const [state, setState] = useState({
        phone: "",
        otp: ""
    });

    let handleOTP = (e) => {
        e.preventDefault();
        client.messages
            .create({
                body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
                from: '+13237161729',
                to: location.state.phone
            })
            .then(message => console.log(message.sid));
    }

    const digitValidate = (e) => {
        console.log(e.target.value);
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

                                <form action="" className="mt-5">
                                    <input className="otp" id='1' type="text" onChange={(e) => digitValidate(e)} onKeyUp={() => tabChange(2)} maxLength={1} />
                                    <input className="otp" id='2' type="text" onChange={(e) => digitValidate(e)} onKeyUp={() => tabChange(3)} maxLength={1} />
                                    <input className="otp" id='3' type="text" onChange={(e) => digitValidate(e)} onKeyUp={() => tabChange(4)} maxLength={1} />
                                    <input className="otp" id='4' type="text" onChange={(e) => digitValidate(e)} onKeyUp={() => tabChange(5)} maxLength={1} />
                                </form>
                                <hr className="mt-4" />

                                <button className='btn btn-primary btn-block mt-4 mb-4 customBtn' onClick={handleOTP}>Generate OTP</button>
                                <button className='btn btn-primary btn-block mt-4 mb-4 customBtn'>Verify</button>
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
                                    Verify OTP
                                </div>
                                <hr className="mt-4" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Verification