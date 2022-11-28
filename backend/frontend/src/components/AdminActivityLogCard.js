import React, { useState } from "react";
import '../styles/hospital_card.css';

function customcard({ transactions }) {
    const hashtag = "#H";
    const heading = "H";
    let id = 0;

    return (
        <div className="CUSTOMCARDE" id="accordion">
            {transactions == null ? null : transactions.map((data) => (
                <div key={id} className="card CARD" style={data.tampered ? { backgroundColor: "#8b0000" } : null}>
                    <div className="card-header COL" id="HeadingTwO" style={data.tampered ? { backgroundColor: 'red', } : null}>
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
                                    Document ID:
                                </div>
                                <div className="VALUE">
                                    {data.id}
                                </div>
                            </div>
                            {data.tampered ?
                                <div className="DATA ACCOUNT">
                                    <div className="HEAD">
                                        Verification:
                                    </div>
                                    <div className="VALUE">
                                        FAILED
                                    </div>
                                </div>
                                :
                                <div className="DATA ACCOUNT">
                                    <div className="HEAD">
                                        Blockchain ID:
                                    </div>
                                    <div className="VALUE">
                                        {data.blockChainID}
                                    </div>
                                </div>}

                        </button>
                    </div>
                    <div id={heading.concat(id).toString()} className="collapse show" aria-labelledby="headingTwo" data-parent="#accordion">
                        {data.tampered ?
                            <div className="card-body">
                                <div className="DATA FROM">
                                    <div className="HEAD">
                                        Action:
                                    </div>
                                    <div className="VALUE">
                                        {data.action}
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="card-body">
                                <div className="DATA FROM">
                                    <div className="HEAD">
                                        Block Hash:
                                    </div>
                                    <div className="VALUE">
                                        {data.document}
                                    </div>
                                </div>
                                <div className="DATA FROM">
                                    <div className="HEAD">
                                        Contract Address:
                                    </div>
                                    <div className="VALUE">
                                        {data.contract_address}
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                </div>
            ))}
        </div>
    )
}






function AdminActivityLogCard({ transactions }) {
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

export default AdminActivityLogCard;