import React, { useState } from "react";
import '../styles/hospital_card.css';

function customcard({ tests }) {
    const handler = (i) => { console.log(i); }
    const hashtag = "#H";
    const heading = "H";
    let id = 0;

    let handleDelete = (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tests[e.target.id])
        }
        fetch('/api/update-test-result-view/', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                window.location.reload();
            });
    }

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
                                    Hospital ID :
                                </div>
                                <div className="VALUE">
                                    {data.hospital_id}
                                </div>
                            </div>
                            <div className="DATA TO">
                                <div className="HEAD">
                                    Hospital Name :
                                </div>
                                <div className="VALUE">
                                    {data.hospital_name}
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

                            <button id={id++} style={{ marginLeft: '100px' }} onClick={handleDelete}>DELETE</button>

                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}






function PatientsTestsCard({ tests }) {
    const handler = (i) => { console.log(i); }
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

export default PatientsTestsCard;