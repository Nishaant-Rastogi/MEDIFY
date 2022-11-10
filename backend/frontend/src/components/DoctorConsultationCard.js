import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../styles/hospital_card.css';

function customcard({ consultations }) {
    const hashtag = "#H";
    const heading = "H";
    let id = 0;
    return (
        <div className="CUSTOMCARDE" id="accordion">
            {consultations === [] ? null : consultations.map((data) => (
                <div key={id} className="card CARD">
                    <div className="card-header COL" id="HeadingTwO">
                        <button className="btn btn-link BUTTON" data-toggle="collapse" data-target={hashtag.concat(id).toString()} aria-expanded="true" aria-controls="collapseOne">
                            <div className="DATA ACCOUNT">
                                <div className="HEAD HEAD1">
                                    Consultation ID:
                                </div>
                                <div className="VALUE NAME">
                                    {data.id}
                                </div>
                            </div>
                            <div className="DATA BALANCE">
                                <div className="HEAD">
                                    Patient Name:
                                </div>
                                <div className="VALUE">
                                    {data.patient_name}
                                </div>
                            </div>
                            <div className="DATA STATUS">
                                <div className="HEAD">
                                    Problem:
                                </div>
                                <div className="VALUE">
                                    {data.problem}
                                </div>

                            </div>
                        </button>
                    </div>
                    <div id={heading.concat(id++).toString()} className="collapse show" aria-labelledby="headingTwo" data-parent="#accordion">
                        <div className="card-body CBODY">
                            <div className="DATA FROM">
                                <div className="HEAD">
                                    Patient ID :
                                </div>
                                <div className="VALUE">
                                    {data.patient_id}
                                </div>
                            </div>
                            <div className="DATA TO">
                                <div className="HEAD">
                                    Patient Gender :
                                </div>
                                <div className="VALUE">
                                    {data.patient_gender}
                                </div>
                            </div>
                            <Link to="/user/doctors/consultations/prescribe" state={{ patient_id: data.patient_id, patient_name: data.patient_name, consultation_id: data.id }}><button className="btn btn-primary btn-sm">PRESCRIBE</button></Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}






function DoctorConsultationCard({ consultations }) {
    const hashtag = "#H";
    const heading = "H";
    let id = 0;
    return (
        <>
            {consultations.length < 1 ?
                <div className="CUSTOMCARD" id="accordion">
                    <div className="card CARD">
                        <div className="card-header COL" id="headingOne"> No Pending Consultations</div>
                    </div>
                </div> : customcard({ consultations })}
        </>
    );
}

export default DoctorConsultationCard;