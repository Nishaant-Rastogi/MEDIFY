import React, { useState } from "react";
import { Link } from "react-router-dom";

function customcard({ doctors }) {
    const hashtag = "#H";
    const heading = "H";
    let id = 0;

    return (
        <div className="CUSTOMCARDE" id="accordion">
            {doctors == null ? null : doctors.map((doctor) => (
                <div key={id} className="card CARD">
                    <div className="card-header COL" id="HeadingTwO">
                        <button className="btn btn-link BUTTON" data-toggle="collapse" data-target={hashtag.concat(id).toString()} aria-expanded="true" aria-controls="collapseOne">
                            <div className="DATA ACCOUNT">
                                <div className="HEAD HEAD1">
                                    Name:
                                </div>
                                <div className="VALUE NAME">
                                    {doctor.name}
                                </div>
                            </div>
                            <div className="DATA BALANCE">
                                <div className="HEAD">
                                    License No:
                                </div>
                                <div className="VALUE">
                                    {doctor.aadharNo}
                                </div>
                            </div>
                            <div className="DATA STATUS">
                                <div className="HEAD">
                                    Specialisation :
                                </div>
                                <div className="VALUE">
                                    Doctor
                                </div>

                            </div>
                        </button>
                    </div>
                    <div id={heading.concat(id).toString()} className="collapse show" aria-labelledby="headingTwo" data-parent="#accordion">
                        <div className="card-body CBODY">
                            <div className="DATA FROM">
                                <div className="HEAD">
                                    Address :
                                </div>
                                <div className="VALUE">
                                    {doctor.address}
                                </div>
                            </div>
                            <div className="DATA TO">
                                <div className="HEAD">
                                    Contact No:
                                </div>
                                <div className="VALUE">
                                    {doctor.phoneNo}
                                </div>
                            </div>
                            <div className="DATA TO">
                                <div className="HEAD">
                                    Consultation Fee:
                                </div>
                                <div className="VALUE">
                                    100
                                </div>
                            </div>
                            <Link to="/user/patients/doctor/consultation" state={{ doctor_name: doctor.name, doctor_id: doctor.id }}><button className="btn btn-primary btn-sm" id={id++}>CONSULT</button></Link>
                        </div>
                    </div>
                </div>
            ))
            }
        </div >
    )
}



function PatientsDoctorCard({ doctors }) {
    return (
        <>
            {doctors == null ?
                <div className="CUSTOMCARDE" id="accordion">
                    <div className="card CARD">
                        <div className="card-header COL" id="headingOne">No Doctors</div>
                    </div>
                </div>
                :
                <div>{customcard({ doctors })}</div>
            }
        </>
    );
}

export default PatientsDoctorCard;