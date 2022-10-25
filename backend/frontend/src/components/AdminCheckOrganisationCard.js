import React, { useState } from "react";
import Table from "./Table";
import '../styles/hospital_card.css';

function customcard({ UserData }) {
    const handler = (i) => { console.log(i); }
    const hashtag = "#H";
    const heading = "H";
    let id = 0;
    return (
        <div className="CUSTOMCARDA" id="accordion">
            {UserData == null ? null : UserData.map((data) => (
                <div key={id} className="card CARD">
                    <div className="card-header COL" id="HeadingTwO">
                        <button className="btn btn-link BUTTON" data-toggle="collapse" data-target={hashtag.concat(id).toString()} aria-expanded="true" aria-controls="collapseOne">
                            <div className="DATA ACCOUNT">
                                <div className="HEAD HEAD1">
                                    Organization Name :
                                </div>
                                <div className="VALUE">
                                    {data.name}
                                </div>
                            </div>
                            <div className="DATA BALANCE">
                                <div className="HEAD">
                                    License No:
                                </div>
                                <div className="VALUE">
                                    {data.licenseNo}
                                </div>
                            </div>
                            <div className="DATA STATUS">
                                <div className="HEAD">
                                    Address:
                                </div>
                                <div className="VALUE">
                                    {data.address}
                                </div>

                            </div>
                        </button>
                    </div>
                    <div id={heading.concat(id).toString()} className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                        <div className="card-body CBODY">
                            <Table />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}






function AdminCheckOrganisationCard({ UserData }) {
    const handler = (i) => { console.log(i); }
    const hashtag = "#H";
    const heading = "H";
    let id = 0;
    return (
        <>
            {UserData == null ?
                <div className="CUSTOMCARD" id="accordion">
                    <div className="card CARD">
                        <div className="card-header COL" id="headingOne"> No Organisation</div>
                    </div>
                </div> : customcard({ UserData })}
        </>
    );
}

export default AdminCheckOrganisationCard;