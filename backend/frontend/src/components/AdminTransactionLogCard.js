import React, { useState } from "react";
import '../styles/hospital_card.css';

function customcard({ transactions }) {
    const hashtag = "#H";
    const heading = "H";
    let id = 0;

    return (
        <div className="CUSTOMCARDE" id="accordion">
            {transactions == null ? null : transactions.map((data) => (
                <div key={id} className="card CARD">
                    <div className="card-header COL" id="HeadingTwO">
                        <button className="btn btn-link" data-toggle="collapse" data-target={hashtag.concat(id).toString()} aria-expanded="false" aria-controls={id.toString()}>
                            <div className="DATA ACCOUNT">
                                <div className="HEAD HEAD1">
                                    TimeStamp:
                                </div>
                                <div className="VALUE NAME">
                                    {data.timestamp}
                                </div>
                            </div>
                            <div className="DATA ACCOUNT">
                                <div className="HEAD">
                                    Transaction Type:
                                </div>
                                <div className="VALUE">
                                    {data.docType === 'BP' ? "Pharmacy Order Payment" : data.docType === 'BI' ? "Insurance Claim Refund" : data.docType === 'BC' ? "Consultation Fee Payment" : "Test Result Payment"}
                                </div>
                            </div>
                            <div className="DATA ACCOUNT">
                                <div className="HEAD">
                                    Amount:
                                </div>
                                <div className="VALUE">
                                    {data.amount}
                                </div>
                            </div>

                        </button>
                    </div>
                    <div id={heading.concat(id).toString()} className="collapse show" aria-labelledby="headingTwo" data-parent="#accordion">
                        <div className="card-body">
                            <div className="DATA FROM">
                                <div className="HEAD">
                                    Recipient Name:
                                </div>
                                <div className="VALUE">
                                    {data.docType === 'BP' ? data.pharmacy_name : data.docType === 'BI' ? data.patient_name : data.docType === 'BC' ? data.doctor_name : data.hospital_name}
                                </div>
                            </div>
                            <div className="DATA FROM">
                                <div className="HEAD">
                                    Sender Name:
                                </div>
                                <div className="VALUE">
                                    {data.docType === 'BP' ? data.patient_name : data.docType === 'BI' ? data.insurance_id : data.docType === 'BC' ? data.patient_name : data.patient_name}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}






function AdminTransactionLogCard({ transactions }) {
    return (
        <>
            {transactions.length < 1 ?
                <div className="CUSTOMCARD" id="accordion">
                    <div className="card CARD">
                        <div className="card-header COL" id="headingOne"> No Transactions</div>
                    </div>
                </div> : customcard({ transactions })}
        </>
    );
}

export default AdminTransactionLogCard;