import React, { useState } from "react";
import '../styles/hospital_card.css';

function customcard({ bills }) {
    const handler = (i) => { console.log(i); }
    const hashtag = "#H";
    const heading = "H";
    let id = 0;

    let handleDelete = (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bills[e.target.id])
        }
        fetch('/api/update-bill-view/', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                window.location.reload();
            });
    }
    return (
        <div className="CUSTOMCARDE" id="accordion">
            {bills === [] ? null : bills.map((data) => (
                <div key={id} className="card CARD">
                    <div className="card-header COL" id="HeadingTwO">
                        <button className="btn btn-link BUTTON" data-toggle="collapse" data-target={hashtag.concat(id).toString()} aria-expanded="true" aria-controls="collapseOne">
                            <div className="DATA ACCOUNT">
                                <div className="HEAD HEAD1">
                                    Bill ID:
                                </div>
                                <div className="VALUE NAME">
                                    {data.id}
                                </div>
                            </div>
                            <div className="DATA ACCOUNT">
                                <div className="HEAD HEAD1">
                                    Bill Type:
                                </div>
                                <div className="VALUE NAME">
                                    {data.docType === 'BC' ? "Consultation Bill" : data.docType === 'BP' ? "Pharmacy Bill" : data.docType === 'BT' ? "Test Result Bill" : null}
                                </div>
                            </div>
                            <div className="DATA BALANCE">
                                <div className="HEAD">
                                    Recipient ID:
                                </div>
                                <div className="VALUE">
                                    {data.docType === 'BC' ? data.doctor_id : data.docType === 'BP' ? data.pharmacy_id : data.docType === 'BT' ? data.hospital_id : null}
                                </div>
                            </div>
                            <div className="DATA STATUS">
                                <div className="HEAD">
                                    Recipient Name:
                                </div>
                                <div className="VALUE">
                                    {data.docType === 'BC' ? data.doctor_name : data.docType === 'BP' ? data.pharmacy_name : data.docType === 'BT' ? data.hospital_name : null}
                                </div>

                            </div>
                        </button>
                    </div>
                    <div id={heading.concat(id).toString()} className="collapse show" aria-labelledby="headingTwo" data-parent="#accordion">
                        <div className="card-body CBODY">
                            <div className="DATA FROM">
                                <div className="HEAD">
                                    Insurance ID :
                                </div>
                                <div className="VALUE">
                                    {data.insurance_id}
                                </div>
                            </div>
                            <div className="DATA TO">
                                <div className="HEAD">
                                    Insurance Name :
                                </div>
                                <div className="VALUE">
                                    {data.insurance_name}
                                </div>
                            </div>
                            <div className="DATA DATE">
                                <div className="HEAD">
                                    Amount :
                                </div>
                                <div className="VALUE">
                                    {data.amount}
                                </div>
                            </div>
                            <button id={id++} style={{ marginLeft: '10px' }} onClick={handleDelete}>DELETE</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}






function PatientsBillsCard({ bills }) {
    const handler = (i) => { console.log(i); }
    const hashtag = "#H";
    const heading = "H";
    let id = 0;
    return (
        <>
            {bills.length <= 1 ?
                <div className="CUSTOMCARD" id="accordion">
                    <div className="card CARD">
                        <div className="card-header COL" id="headingOne"> No Bills</div>
                    </div>
                </div> : customcard({ bills })}
        </>
    );
}

export default PatientsBillsCard;