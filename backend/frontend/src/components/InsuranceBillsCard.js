import React, { useState } from "react";

function customcard({ bills }) {
    const hashtag = "#H";
    const heading = "H";
    let id = 0;
    return (
        <div className="CUSTOMCARDE" id="accordion">
            {bills.emp == null ? null : bills.emp.map((data) => (
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
                                    Insurance Claim Bill
                                </div>
                            </div>
                            <div className="DATA BALANCE">
                                <div className="HEAD">
                                    Receiver ID:
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
                                    Insurance ID :
                                </div>
                                <div className="VALUE">
                                    {data.insurance_id}
                                </div>
                            </div>
                            <div className="DATA TO">
                            </div>
                            <div className="DATA DATE">
                                <div className="HEAD">
                                    Refund :
                                </div>
                                <div className="VALUE">
                                    {data.refund}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}



function InsuranceBillsCard({ bills }) {
    return (
        <>
            {bills == null ?
                <div className="CUSTOMCARDE" id="accordion">
                    <div className="card CARD">
                        <div className="card-header COL" id="headingOne">No Insurance Bills</div>
                    </div>
                </div>
                :
                <div>{customcard({ bills })}</div>
            }
        </>
    );
}

export default InsuranceBillsCard;