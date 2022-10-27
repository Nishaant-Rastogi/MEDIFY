import React, { useState } from "react";
import '../styles/hospital_card.css';

function customcard({ prescriptions }) {
    const handler = (i) => { console.log(i); }
    const hashtag = "#H";
    const heading = "H";
    let id = 0;
    return (
        <div className="CUSTOMCARDE" id="accordion">
            {prescriptions === [] ? null : prescriptions.map((data) => (
                <div key={id} className="card CARD">
                    <div className="card-header COL" id="HeadingTwO">
                        <button className="btn btn-link BUTTON" data-toggle="collapse" data-target={hashtag.concat(id).toString()} aria-expanded="true" aria-controls="collapseOne">
                            <div className="DATA ACCOUNT">
                                <div className="HEAD HEAD1">
                                    Prescription ID:
                                </div>
                                <div className="VALUE NAME">
                                    {data.id}
                                </div>
                            </div>
                            <div className="DATA BALANCE">
                                <div className="HEAD">
                                    Patient's Name:
                                </div>
                                <div className="VALUE">
                                    {data.patient_name}
                                </div>
                            </div>
                            <div className="DATA STATUS">
                                <div className="HEAD">
                                    Patients's ID:
                                </div>
                                <div className="VALUE">
                                    {data.patient_id}
                                </div>

                            </div>
                        </button>
                    </div>
                    <div id={heading.concat(id++).toString()} className="collapse show" aria-labelledby="headingTwo" data-parent="#accordion">
                        <div className="card-body CBODY">
                            <div className="DATA FROM">
                                <div className="HEAD">
                                    Medicine :
                                </div>
                                <div className="VALUE">
                                    {data.medicine}
                                </div>
                            </div>
                            <div className="DATA TO">
                                <div className="HEAD">
                                    Dosage :
                                </div>
                                <div className="VALUE">
                                    {data.dosage}
                                </div>
                            </div>
                            <div className="DATA DATE">
                                <div className="HEAD">
                                    Duration :
                                </div>
                                <div className="VALUE">
                                    {data.duration}
                                </div>
                            </div>
                        </div>
                        <div className="card-body CBODY">
                            <div className="DATA FROM">
                                <div className="HEAD">
                                    Consultation ID :
                                </div>
                                <div className="VALUE">
                                    {data.consultation_id}
                                </div>
                            </div>
                            <div className="DATA DATE">
                                <div className="HEAD">
                                    Test :
                                </div>
                                <div className="VALUE">
                                    {data.test}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}






function DoctorPrescriptionCard({ prescriptions }) {
    const handler = (i) => { console.log(i); }
    const hashtag = "#H";
    const heading = "H";
    let id = 0;
    return (
        <>
            {prescriptions === [] ?
                <div className="CUSTOMCARD" id="accordion">
                    <div className="card CARD">
                        <div className="card-header COL" id="headingOne"> No Prescriptions</div>
                    </div>
                </div> : customcard({ prescriptions })}
        </>
    );
}

export default DoctorPrescriptionCard;