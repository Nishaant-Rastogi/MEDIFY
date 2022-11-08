import React, { useState } from "react";

function customcard({ EmpData }) {
    const hashtag = "#H";
    const heading = "H";
    let id = 0;
    return (
        <div className="CUSTOMCARDE" id="accordion">
            {EmpData.emp == null ? null : EmpData.emp.map((accoundata) => (
                <div key={id} className="card CARD">
                    <div className="card-header COL" id="HeadingTwO">
                        <button className="btn btn-link BUTTON" data-toggle="collapse" data-target={hashtag.concat(id).toString()} aria-expanded="true" aria-controls="collapseOne">
                            <div className="DATA ACCOUNT">
                                <div className="HEAD HEAD1">
                                    Name:
                                </div>
                                <div className="VALUE NAME">
                                    {accoundata.Name}
                                </div>
                            </div>
                            <div className="DATA BALANCE">
                                <div className="HEAD">
                                    License No:
                                </div>
                                <div className="VALUE">
                                    {accoundata.Employee_ID}
                                </div>
                            </div>
                            <div className="DATA STATUS">
                                <div className="HEAD">
                                    Specialisation :
                                </div>
                                <div className="VALUE">
                                    {accoundata.Designation}
                                </div>

                            </div>
                        </button>
                    </div>
                    <div id={heading.concat(id++).toString()} className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                        <div className="card-body CBODY">
                            <div className="DATA FROM">
                                <div className="HEAD">
                                    Experience :
                                </div>
                                <div className="VALUE">
                                    {accoundata.PAN}
                                </div>
                            </div>
                            <div className="DATA TO">
                                <div className="HEAD">
                                    Consultation Fees:
                                </div>
                                <div className="VALUE">
                                    {accoundata.Salary}
                                </div>
                            </div>
                            <div className="DATA DATE">
                                <div className="HEAD">
                                    Schedule:
                                </div>
                                <div className="VALUE">
                                    {accoundata.Joining_Date}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}



function PharmacyInventoryCard({ EmpData }) {
    return (
        <>
            {EmpData == null ?
                <div className="CUSTOMCARDE" id="accordion">
                    <div className="card CARD">
                        <div className="card-header COL" id="headingOne">No Medicines</div>
                    </div>
                </div>
                :
                <div>{customcard({ EmpData })}</div>
            }
        </>
    );
}

export default PharmacyInventoryCard;