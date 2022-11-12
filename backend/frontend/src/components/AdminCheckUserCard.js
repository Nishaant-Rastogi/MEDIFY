import React, { useState } from "react";
import '../styles/hospital_card.css';
import emailjs from '@emailjs/browser'

function customcard({ UserData }) {
    const hashtag = "#H";
    const heading = "H";
    let id = 0;

    let sendEmail = async (e, data) => {
        e.preventDefault()
        emailjs.send(
            "service_fq04boo",
            "template_fbjb1dn",
            {
                from_name: "MEDIFY",
                to_name: data.name,
                message: data.id,
                to_email: data.email,
            },
            'user_LaY6RXGTYd7nadYRQtJ3W'
        )
    }

    let handleApprove = (e) => {
        e.preventDefault();
        const requiredOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(UserData[e.target.id])
        }
        fetch('/api/approve-user/', requiredOptions)
            .then(response => response.json())
            .then(data => {
                sendEmail(e, data);
            })
    }
    let handleReject = (e) => {
        e.preventDefault();
        const requiredOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(UserData[e.target.id])
        }
        fetch('/api/reject-user/', requiredOptions)
            .then(response => response.json())
            .then(data => {
                window.location.reload();
            })
    }
    return (
        <div className="CUSTOMCARDE" id="accordion">
            {UserData == null ? null : UserData.map((data) => (
                <div key={id} className="card CARD">
                    <div className="card-header COL" id="HeadingTwO">
                        <button className="btn btn-link BUTTON" data-toggle="collapse" data-target={hashtag.concat(id).toString()} aria-expanded="true" aria-controls="collapseOne">
                            <img src={data.user_proof} />
                            <div className="DATA ACCOUNT">
                                <div className="HEAD HEAD1">
                                    Name:
                                </div>
                                <div className="VALUE NAME">
                                    {data.name}
                                </div>
                            </div>
                            <div className="DATA BALANCE">
                                <div className="HEAD">
                                    Aadhar No:
                                </div>
                                <div className="VALUE">
                                    {data.aadharNo}
                                </div>
                            </div>
                            <div className="DATA STATUS">
                                <div className="HEAD">
                                    Type:
                                </div>
                                <div className="VALUE">
                                    {data.userType}
                                </div>

                            </div>
                        </button>
                    </div>
                    <div id={heading.concat(id).toString()} className="collapse show" aria-labelledby="headingTwo" data-parent="#accordion">
                        <div className="card-body CBODY">
                            <div className="DATA FROM">
                                <div className="HEAD">
                                    Address :
                                </div>
                                <div className="VALUE">
                                    {data.address}
                                </div>
                            </div>
                            <div className="DATA TO">
                                <div className="HEAD">
                                    Phone No :
                                </div>
                                <div className="VALUE">
                                    {data.phoneNo}
                                </div>
                            </div>

                            <button className="btn btn-primary btn-sm" id={id} onClick={handleApprove}>Approve</button>
                            <button className="btn btn-primary btn-sm" id={id++} onClick={handleReject}>Reject</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}






function AdminCheckUserCard({ UserData }) {
    const hashtag = "#H";
    const heading = "H";
    return (
        <>
            {UserData.length < 1 ?
                <div className="CUSTOMCARD" id="accordion">
                    <div className="card CARD">
                        <div className="card-header COL" id="headingOne"> No User</div>
                    </div>
                </div> : customcard({ UserData })}
        </>
    );
}

export default AdminCheckUserCard;