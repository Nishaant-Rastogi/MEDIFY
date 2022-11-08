import React, { useState } from "react";
import '../styles/hospital_card.css';
import { Link } from "react-router-dom";

function customcard({ hospitals }) {
    const hashtag = "#H";
    const heading = "H";
    let id = 0;

    return (
        <div className="CUSTOMCARDE" id="accordion">
            {hospitals == null ? null : hospitals.map((data) => (
                <div key={id} className="card CARD">
                    <div className="card-header COL" id="HeadingTwO">
                        <div className="btn btn-link BUTTON" data-toggle="collapse" data-target={hashtag.concat(id).toString()} aria-expanded="true" aria-controls="collapseOne">
                            <div className="DATA ACCOUNT">
                                <div className="HEAD HEAD1">
                                    Name:
                                </div>
                                <div className="VALUE NAME">
                                    {data.name}
                                </div>
                            </div>
                            <div className="DATA ACCOUNT">
                                <div className="HEAD HEAD1">
                                    Hospital ID:
                                </div>
                                <div className="VALUE NAME">
                                    {data.id}
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
                            <div className="DATA ACCOUNT">
                                <div className="HEAD HEAD1">
                                    Test Cost:
                                </div>
                                <div className="VALUE NAME">
                                    100
                                </div>
                            </div>
                            <div className="DATA BALANCE">
                                <Link to="/user/patients/hospital/test" state={{ hospital_id: data.id, hospital_name: data.name }}><button>REQUEST TEST</button></Link>
                            </div>

                        </div>
                    </div>
                    <div id={heading.concat(id++).toString()} className="collapse show" aria-labelledby="headingTwo" data-parent="#accordion">
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
    const hashtag = "#H";
    const heading = "H";
    let id = 0;
    return (
        <>
            {hospitals.length <= 1 ?
                <div className="CUSTOMCARD" id="accordion">
                    <div className="card CARD">
                        <div className="card-header COL" id="headingOne"> No Hospitals</div>
                    </div>
                </div> : customcard({ hospitals })}
        </>
    );
}

export default PatientsHospitalCard;