import React, { useState } from "react";

function customcard({ claims }) {
    const hashtag = "#H";
    const heading = "H";
    let id = 0;
    return (
        <div className="CUSTOMCARDE" id="accordion">
            {claims.emp == null ? null : claims.emp.map((claim) => (
                <div key={id} className="card CARD">
                    <div className="card-header COL" id="HeadingTwO">
                        <button className="btn btn-link BUTTON" data-toggle="collapse" data-target={hashtag.concat(id).toString()} aria-expanded="true" aria-controls="collapseOne">
                            <div className="DATA ACCOUNT">
                                <div className="HEAD HEAD1">
                                    Patient Name:
                                </div>
                                <div className="VALUE NAME">
                                    {claim.patient_name}
                                </div>
                            </div>
                            <div className="DATA BALANCE">
                                <div className="HEAD">
                                    Bill Type:
                                </div>
                                <div className="VALUE">
                                    {claim.docType}
                                </div>
                            </div>
                            <div className="DATA STATUS">
                                <div className="HEAD">
                                    Bill ID :
                                </div>
                                <div className="VALUE">
                                    {claim.id}
                                </div>

                            </div>
                        </button>
                    </div>
                    <div id={heading.concat(id++).toString()} className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                        <div className="card-body CBODY">
                            <div className="DATA FROM">
                                <div className="HEAD">
                                    Bill Amount :
                                </div>
                                <div className="VALUE">
                                    {claim.amount}
                                </div>
                            </div>
                        </div>
                        <div className="card-body CBODY">
                            <div className="DATA FROM">
                                <div className="HEAD">
                                    Refund :
                                </div>
                                <div className="VALUE">
                                    10
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}



function InsuranceClaimsCard({ claims }) {
    return (
        <>
            {claims == null ?
                <div className="CUSTOMCARDE" id="accordion">
                    <div className="card CARD">
                        <div className="card-header COL" id="headingOne">No Insurance Claims</div>
                    </div>
                </div>
                :
                <div>{customcard({ claims })}</div>
            }
        </>
    );
}

export default InsuranceClaimsCard;