import React, { useState } from "react";
import '../styles/hospital_card.css';

function customcard({ records }) {
    const handler = (i) => { console.log(i); }
    const hashtag = "#H";
    const heading = "H";
    let id = 0;
    return (
        <div className="CUSTOMCARDE" id="accordion">
            {records === [] ? null : records.map((data) => (
                <div key={id} className="card CARD">
                    <div className="card-header COL" id="HeadingTwO">
                        <button className="btn btn-link BUTTON" data-toggle="collapse" data-target={hashtag.concat(id).toString()} aria-expanded="true" aria-controls="collapseOne">
                            <div className="DATA ACCOUNT">
                                <div className="HEAD">
                                    Type:
                                </div>
                                <div className="VALUE">
                                    {data.docType === "P" ? "Prescription" : data.docType === "C" ? "Consultation" : data.docType === "T" ? "Test" : data.docType === "B" ? "Bill" : "Unknown"}
                                </div>
                            </div>
                            <div className="DATA BALANCE">
                                <div className="HEAD">
                                    Document ID:
                                </div>
                                <div className="VALUE">
                                    {data.id}
                                </div>
                            </div>
                            <div className="DATA STATUS">
                                <div className="HEAD HEAD1">
                                    Name:
                                </div>
                                <div className="VALUE NAME">
                                    {data.patient_name}
                                </div>

                            </div>
                        </button>
                    </div>
                    <div id={heading.concat(id++).toString()} className="collapse show" aria-labelledby="headingTwo" data-parent="#accordion">
                        <div className="card-body CBODY">
                            <div className="DATA FROM">
                                <div className="HEAD">
                                    Doctor Name :
                                </div>
                                <div className="VALUE">
                                    {data.doctor_name}
                                </div>
                            </div>
                            <div className="DATA TO">
                                <div className="HEAD">
                                    Doctor ID :
                                </div>
                                <div className="VALUE">
                                    {data.doctor_id}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}






function PatientsRecordsCard({ records }) {
    const handler = (i) => { console.log(i); }
    const hashtag = "#H";
    const heading = "H";
    let id = 0;
    return (
        <>
            {records === [] ?
                <div className="CUSTOMCARD" id="accordion">
                    <div className="card CARD">
                        <div className="card-header COL" id="headingOne"> No Medical Records</div>
                    </div>
                </div> : customcard({ records })}
        </>
    );
}

export default PatientsRecordsCard;