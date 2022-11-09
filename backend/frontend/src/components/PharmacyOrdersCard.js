import React, { useState } from "react";
import '../styles/hospital_card.css';

function customcard({ orders }) {
    const hashtag = "#H";
    const heading = "H";
    let id = 0;

    let handleDeliver = (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orders[e.target.id])
        }
        fetch('/api/pharmacy-deliver-order/', requestOptions)
            .then(response => response.json())
            .then(data => {
                window.location.reload();
            });
    }

    return (
        <div className="CUSTOMCARDE" id="accordion">
            {orders === [] ? null : orders.map((data) => (
                <div key={id} className="card CARD">
                    <div className="card-header COL" id="HeadingTwO">
                        <button className="btn btn-link BUTTON" data-toggle="collapse" data-target={hashtag.concat(id).toString()} aria-expanded="true" aria-controls="collapseOne">
                            <div className="DATA ACCOUNT">
                                <div className="HEAD HEAD1">
                                    Order ID:
                                </div>
                                <div className="VALUE NAME">
                                    {data.id}
                                </div>
                            </div>
                            <div className="DATA BALANCE">
                                <div className="HEAD">
                                    Medicine Name:
                                </div>
                                <div className="VALUE">
                                    {data.medicine}
                                </div>
                            </div>
                            <div className="DATA STATUS">
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
                        <div className="card-body CBODY">
                            <div className="DATA FROM">
                                <div className="HEAD">
                                    Prescription ID:
                                </div>
                                <div className="VALUE">
                                    {data.prescription_id}
                                </div>
                            </div>
                            <div className="DATA TO">
                                <div className="HEAD">
                                    Patient's ID :
                                </div>
                                <div className="VALUE">
                                    {data.patient_id}
                                </div>
                            </div>
                            <div className="DATA TO">
                                <div className="HEAD">
                                    Patient's Name :
                                </div>
                                <div className="VALUE">
                                    {data.patient_name}
                                </div>
                            </div>
                            <div className="DATA DATE">
                                <div className="HEAD">
                                    Delivered:
                                </div>
                                <div className="VALUE">
                                    {data.delivered}
                                </div>
                            </div>

                            <button className="btn btn-primary btn-sm" id={id++} style={{ marginLeft: '100px' }} onClick={handleDeliver}>DELIVER</button>

                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}






function PharmacyOrdersCard({ orders }) {
    const hashtag = "#H";
    const heading = "H";
    let id = 0;
    return (
        <>
            {orders.length < 1 ?
                <div className="CUSTOMCARD" id="accordion">
                    <div className="card CARD">
                        <div className="card-header COL" id="headingOne"> No orders</div>
                    </div>
                </div> : customcard({ orders })}
        </>
    );
}

export default PharmacyOrdersCard;