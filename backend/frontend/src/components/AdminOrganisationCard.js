import React, { useState } from "react";
import '../styles/hospital_card.css';

function customcard({ UserData }) {
    const hashtag = "#H";
    const heading = "H";
    let id = 0;

    let handleDelete = (e) => {
        e.preventDefault();
        const requiredOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(UserData[e.target.id])
        }
        fetch('/api/delete-organization/', requiredOptions)
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
                    <div id={heading.concat(id).toString()} className="collapse show" aria-labelledby="headingTwo" data-parent="#accordion">
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

                            <button className="btn btn-primary btn-sm" id={id++} onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}






function AdminCheckOrganisationCard({ UserData }) {
    return (
        <>
            {UserData.length < 1 ?
                <div className="CUSTOMCARD" id="accordion">
                    <div className="card CARD">
                        <div className="card-header COL" id="headingOne"> No Organisation</div>
                    </div>
                </div> : customcard({ UserData })}
        </>
    );
}

export default AdminCheckOrganisationCard;