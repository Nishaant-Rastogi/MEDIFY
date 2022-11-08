import React, { useState } from "react";
import '../styles/hospital_card.css';

function customcard({ tests }) {
    const hashtag = "#H";
    const heading = "H";
    let id = 0;
    return (
        <div className="CUSTOMCARDE" id="accordion">
            {tests === [] ? null : tests.map((data) => (
                <div key={id} className="card CARD">
                    <div className="card-header COL" id="HeadingTwO">
                        <button className="btn btn-link BUTTON" data-toggle="collapse" data-target={hashtag.concat(id).toString()} aria-expanded="true" aria-controls="collapseOne">
                            <div className="DATA ACCOUNT">
                                <div className="HEAD HEAD1">
                                    Test Result ID:
                                </div>
                                <div className="VALUE NAME">
                                    {data.id}
                                </div>
                            </div>
                            <div className="DATA BALANCE">
                                <div className="HEAD">
                                    Test Name:
                                </div>
                                <div className="VALUE">
                                    {data.test}
                                </div>
                            </div>
                            <div className="DATA STATUS">
                                <div className="HEAD">
                                    Test Result:
                                </div>
                                <div className="VALUE">
                                    {data.test_result}
                                </div>

                            </div>
                        </button>
                    </div>
                    <div id={heading.concat(id).toString()} className="collapse show" aria-labelledby="headingTwo" data-parent="#accordion">
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
                                    Patient Name :
                                </div>
                                <div className="VALUE">
                                    {data.patient_name}
                                </div>
                            </div>
                            <div className="DATA DATE">
                                <div className="HEAD">
                                    Prescription ID :
                                </div>
                                <div className="VALUE">
                                    {data.prescription_id}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}






function HospitalTestsCard({ tests }) {
    const hashtag = "#H";
    const heading = "H";
    let id = 0;
    return (
        <>
            {tests.length <= 1 ?
                <div className="CUSTOMCARD" id="accordion">
                    <div className="card CARD">
                        <div className="card-header COL" id="headingOne"> No Tests</div>
                    </div>
                </div> : customcard({ tests })}
        </>
    );
}

export default HospitalTestsCard;