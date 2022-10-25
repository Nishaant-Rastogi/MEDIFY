import React, { useState } from "react";
import '../styles/hospital_card.css';

function customcard({ UserData }) {
    const hashtag = "#H";
    const heading = "H";
    let id = 0;

    let handleApprove = (e, id) => {
        e.preventDefault();
        const requiredOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: UserData[id]
        }
        fetch('/api/approve-organization', requiredOptions)
            .then(response => response.json())
            .then(data => console.log(data))
    }
    let handleReject = (e, id) => {
        e.preventDefault();
        const requiredOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: UserData[id]
        }
        fetch('/api/reject-organization', requiredOptions)
            .then(response => response.json())
            .then(data => console.log(data))
    }
    return (
        <div className="CUSTOMCARDE" id="accordion">
            {UserData == null ? null : UserData.map((data) => (
                <div key={id} className="card CARD">
                    <div className="card-header COL" id="HeadingTwO">
                        <button className="btn btn-link BUTTON" data-toggle="collapse" data-target={hashtag.concat(id).toString()} aria-expanded="false" aria-controls={id.toString()}>
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
                                    License No:
                                </div>
                                <div className="VALUE">
                                    {data.licenseNo}
                                </div>
                            </div>
                            <div className="DATA STATUS">
                                <div className="HEAD">
                                    Type :
                                </div>
                                <div className="VALUE">
                                    {data.orgType}
                                </div>

                            </div>
                        </button>
                    </div>
                    <div id={heading.concat(id++).toString()} className="collapse show" aria-labelledby="headingTwo" data-parent="#accordion">
                        <div className="card-body CBODY">
                            <div className="DATA FROM">
                                <div className="HEAD">
                                    Address:
                                </div>
                                <div className="VALUE">
                                    {data.address}
                                </div>
                            </div>
                            <div className="DATA TO">
                                <div className="HEAD">
                                    Contact No:
                                </div>
                                <div className="VALUE">
                                    {data.phoneNo}
                                </div>
                            </div>
                        </div>
                        <button onClick={(e) => handleApprove(e, id)}>Approve</button>
                        <button onClick={(e) => handleReject(e, id)}>Reject</button>
                    </div>
                </div>
            ))}
        </div>
    )
}






function AdminCheckOrganisationCard({ UserData }) {
    return (
        <>
            {UserData === null ?
                <div className="CUSTOMCARD" id="accordion">
                    <div className="card CARD">
                        <div className="card-header COL" id="headingOne"> No Organisation</div>
                    </div>
                </div> : customcard({ UserData })}
        </>
    );
}

export default AdminCheckOrganisationCard;