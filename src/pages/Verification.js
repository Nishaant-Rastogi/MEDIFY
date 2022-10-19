import React, { useState, ReactDOM } from 'react';
import '../styles/verification.css';
import OtpInput from "react-otp-input";

const Verification = (props) => {
    const [state, setState] = useState({
        phone: "",
        otp: ""
    });

    const handleChange = (otp) => setState({ otp });
    const handleSubmit = (event) => {
        const data = new FormData(event.target);
        event.preventDefault();
    }
    return (
        <div className='VERIFICATION'>
            <div className='CONTAINER'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className="my-4">
                            <h1
                                className="block text-gray-700 text-sm font-medium mb-2  text-lg text-center"
                                htmlFor="username"
                            >
                                Enter Your OTP here
                            </h1>
                            <OtpInput
                                value={state.otp}
                                className="otp-input bg-white mx-2 text-lg focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg  block w-full appearance-none leading-normal"
                                onChange={handleChange}
                                numInputs={6}
                                separator={<span></span>}
                            />
                        </div>
                        <div className="m-6">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2   text-center"
                                htmlFor="username"
                            >
                                <span>
                                    Click here ?&nbsp;
                                    <a href="!#" className="text-blue-600">
                                        Resend OTP
                                    </a>
                                </span>
                            </label>
                        </div>

                        <button className="btn COLOR LOGINB">
                            SUBMIT
                        </button>
                    </div>
                </form >
            </div >
        </div>
    )
}

export default Verification