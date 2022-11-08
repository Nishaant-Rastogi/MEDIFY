import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ConsultationBillCard({ doctor, user, consultation }) {
    const [insurance, setInsurance] = useState({});
    const [insurances, setInsurances] = useState([]);
    const navigate = useNavigate();
    let handleInsurance = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }
        fetch('/api/get-insurance-companies/', requestOptions)
            .then(response => response.json())
            .then(data => {
                setInsurances(data)
            });
    }

    let handleBill = (e) => {
        e.preventDefault()

        insurances.map((ins) => ins.id === insurance.id ? setInsurance(ins) : null)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                patient_id: user.id,
                patient_name: user.name,
                doctor_id: doctor.id,
                doctor_name: doctor.name,
                amount: 100,
                consultation_id: consultation,
                insurance_id: insurance.id,
                insurance_name: insurance.name,
            })
        };

        fetch('/api/send-consultation-bill/', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                navigate(-1)
            });
    }

    useEffect(() => {
        handleInsurance();
    }, [])
    return (
        <div className='UPROFILE'>
            <div className='BLUR'></div>
            <div className='PROFILECONTAINER'>
                <div className='PROFILEHEADER'>
                    <div className="USER_DETAILS">
                        <div>CONSULTATION FEE PAYMENT</div>
                    </div>
                    <hr style={{ width: '600px' }} />
                    <form onSubmit={handleBill}>
                        <div>Patient's Name:
                            <input defaultValue={user.name} type="text" className="form-control" name="p_name" aria-describedby="idHelp" placeholder="Enter Patient's Name" disabled />
                        </div>
                        <div>Patient's ID:
                            <input defaultValue={user.id} type="text" className="form-control" name="p_id" aria-describedby="idHelp" placeholder="Enter ID" disabled />
                        </div>
                        <div>Doctor's Name:
                            <input defaultValue={doctor.name} type="text" className="form-control" name="d_name" aria-describedby="idHelp" disabled />
                        </div>
                        <div>Doctor's ID:
                            <input defaultValue={doctor.id} type="text" className="form-control" name="d_id" aria-describedby="idHelp" disabled />
                        </div>
                        <div>Consultation ID:
                            <input defaultValue={consultation} type="text" className="form-control" name="c_id" aria-describedby="idHelp" disabled />
                        </div>
                        <div>Amount:
                            <input defaultValue={100} type="text" className="form-control" name="amount" aria-describedby="idHelp" disabled />
                        </div>
                        <div>Insurance Companies:
                            <select defaultValue={"DEFAULT"} className="form-control" aria-label="Default select example" onChange={(e) => { setInsurance({ id: e.target.value, name: e.target.value }) }}>
                                <option value={"DEFAULT"} disabled>Select Insurance</option>
                                {
                                    insurances.map((insurance, index) => <option key={index} value={insurance.id}>{insurance.name}</option>)
                                }
                            </select>
                        </div>
                        <button style={{ marginTop: '20px', marginRight: '20px' }} type="submit" className="btn btn-outline-dark">PAY CONSULTATION FEE</button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default ConsultationBillCard
