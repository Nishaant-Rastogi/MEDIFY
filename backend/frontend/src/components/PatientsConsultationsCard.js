import React, { useState } from "react";
import '../styles/hospital_card.css';

function customcard({ consultations }) {
    const hashtag = "#H";
    const heading = "H";
    let id = 0;

    let handleDelete = (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(consultations[e.target.id])
        }
        fetch('/api/update-consultation-view/', requestOptions)
            .then(response => response.json())
            .then(data => {
                window.location.reload();
            });
    }

    return (
        <div className="CUSTOMCARDE" id="accordion">
            {consultations === [] ? null : consultations.map((data) => (
                <div key={id} className="card CARD">
                    <div className="card-header COL" id="HeadingTwO">
                        <button className="btn btn-link BUTTON" data-toggle="collapse" data-target={hashtag.concat(id).toString()} aria-expanded="true" aria-controls="collapseOne">
                            <div className="DATA ACCOUNT">
                                <div className="HEAD">
                                    Consultation ID:
                                </div>
                                <div className="VALUE">
                                    {data.id}
                                </div>
                            </div>
                            <div className="DATA BALANCE">
                                <div className="HEAD">
                                    Doctor's Name:
                                </div>
                                <div className="VALUE">
                                    {data.doctor_name}
                                </div>
                            </div>
                            <div className="DATA STATUS">
                                <div className="HEAD HEAD1">
                                    Doctor's ID:
                                </div>
                                <div className="VALUE NAME">
                                    {data.doctor_id}
                                </div>

                            </div>
                        </button>
                    </div>
                    <div id={heading.concat(id).toString()} className="collapse show" aria-labelledby="headingTwo" data-parent="#accordion">
                        <div className="card-body CBODY">
                            <div className="DATA FROM">
                                <div className="HEAD">
                                    Problem :
                                </div>
                                <div className="VALUE">
                                    {data.problem}
                                </div>

                                <button id={id++} style={{ marginLeft: '500px' }} onClick={handleDelete}>DELETE</button>

                            </div>
                        </div>
                    </div>
                </div>
            ))
            }
        </div >
    )
}






function PatientsConsultationsCard({ consultations }) {
    const hashtag = "#H";
    const heading = "H";
    let id = 0;
    return (
        <>
            {consultations.length < 1 ?
                <div className="CUSTOMCARD" id="accordion">
                    <div className="card CARD">
                        <div className="card-header COL" id="headingOne"> No Medical Consultations</div>
                    </div>
                </div> : customcard({ consultations })}
        </>
    );
}

export default PatientsConsultationsCard;