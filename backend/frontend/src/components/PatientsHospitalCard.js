import React, { useState } from "react";
import '../styles/hospital_card.css';

function customcard({ hospitals }) {
    const handler = (i) => { console.log(i); }
    const hashtag = "#H";
    const heading = "H";
    let id = 0;
    return (
        <div className="CUSTOMCARDE" id="accordion">
            {hospitals == null ? null : hospitals.map((data) => (
                <div key={id} className="card CARD">
                    <div className="card-header COL" id="HeadingTwO">
                        <button className="btn btn-link BUTTON" data-toggle="collapse" data-target={hashtag.concat(id).toString()} aria-expanded="true" aria-controls="collapseOne">
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
                        </button>
                    </div>
                    <div id={heading.concat(id++).toString()} className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
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
                            <div className="DATA DATE">
                                <div className="HEAD">
                                    Email :
                                </div>
                                <div className="VALUE">
                                    {data.email}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}






function PatientsHospitalCard({ hospitals }) {
    const handler = (i) => { console.log(i); }
    const hashtag = "#H";
    const heading = "H";
    let id = 0;
    return (
        <>
            {hospitals == null ?
                <div className="CUSTOMCARD" id="accordion">
                    <div className="card CARD">
                        <div className="card-header COL" id="headingOne"> No Hospitals</div>
                    </div>
                </div> : customcard({ hospitals })}
        </>
    );
}

export default PatientsHospitalCard;