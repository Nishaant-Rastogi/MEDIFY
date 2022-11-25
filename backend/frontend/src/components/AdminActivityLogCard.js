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
                                    Document Hash:
                                </div>
                                <div className="VALUE">
                                    {data.document}
                                </div>
                            </div>
                            <div className="DATA ACCOUNT">
                                <div className="HEAD">
                                    Blockchain ID:
                                </div>
                                <div className="VALUE">
                                    {data.blockChainID}
                                </div>
                            </div>

                        </button>
                    </div>
                    <div id={heading.concat(id).toString()} className="collapse show" aria-labelledby="headingTwo" data-parent="#accordion">
                        <div className="card-body">
                            <div className="DATA FROM">
                                <div className="HEAD">
                                    Block Hash:
                                </div>
                                <div className="VALUE">
                                    {data.hash}
                                </div>
                            </div>
                            <div className="DATA FROM">
                                <div className="HEAD">
                                    Previous Block Hash:
                                </div>
                                <div className="VALUE">
                                    {data.previous_hash}
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
                    </div>
                </div>
            ))}
        </div>
    )
}






function AdminActivityLogCard({ transactions }) {
    return (
        <>
            {console.log(transactions)}
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