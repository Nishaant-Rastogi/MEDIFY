import React, { useState } from "react";
import '../styles/hospital_card.css';

function customcard({ bills }) {
    const hashtag = "#H";
    const heading = "H";
    let id = 0;
    return (
        <div className="CUSTOMCARDE" id="accordion">
            {bills == null ? null : bills.map((data) => (
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
                                    Test Result Bill
                                </div>
                            </div>
                            <div className="DATA BALANCE">
                                <div className="HEAD">
                                    Sender ID:
                                </div>
                                <div className="VALUE">
                                    {data.patient_id}
                                </div>
                            </div>
                            <div className="DATA STATUS">
                                <div className="HEAD">
                                    Sender Name:
                                </div>
                                <div className="VALUE">
                                    {data.patient_name}
                                </div>

                            </div>
                        </button>
                    </div>
                    <div id={heading.concat(id++).toString()} className="collapse show" aria-labelledby="headingTwo" data-parent="#accordion">
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
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}






function HospitalBillsCard({ bills }) {
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

export default HospitalBillsCard;