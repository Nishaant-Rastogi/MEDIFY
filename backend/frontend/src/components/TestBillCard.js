import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function TestBillCard({ hospital, user, prescription }) {
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
                console.log(data)
                setInsurances(data)
            });
    }

    let handleTestResult = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                prescription_id: prescription.id,
                patient_id: user.id,
                patient_name: user.name,
                hospital_id: hospital.id,
                hospital_name: hospital.name,
                test: prescription.test,
                test_result: Math.floor(Math.random() * 2) === 0 ? 'Negative' : 'Positive',
            })
        }
        fetch('/api/send-test-result/', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
            });
    }

    let handleBill = (e) => {
        e.preventDefault()
        console.log(insurance);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                patient_id: user.id,
                patient_name: user.name,
                hospital_id: hospital.id,
                hospital_name: hospital.name,
                amount: 100,
                prescription_id: prescription.id,
                insurance_id: insurance.id,
                insurance_name: insurance.name,
                test: prescription.test
            })
        };

        fetch('/api/send-test-result-bill/', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                handleTestResult();
                navigate(-1)
            });
    }

    useEffect(() => {
        handleInsurance();
    }, [])
    useEffect(() => {
        insurances.map((ins) => ins.id === insurance.id ? setInsurance(ins) : null)
    }, [insurance])
    return (
        <div className='UPROFILE'>
            <div className='BLUR'></div>
            <div className='PROFILECONTAINER'>
                <div className='PROFILEHEADER'>
                    <div className="USER_DETAILS">
                        <div>TEST FEE PAYMENT</div>
                    </div>
                    <hr style={{ width: '600px' }} />
                    <form onSubmit={handleBill}>
                        <div>Patient's Name:
                            <input defaultValue={user.name} type="text" className="form-control" name="p_name" aria-describedby="idHelp" placeholder="Enter Patient's Name" disabled />
                        </div>
                        <div>Patient's ID:
                            <input defaultValue={user.id} type="text" className="form-control" name="p_id" aria-describedby="idHelp" placeholder="Enter ID" disabled />
                        </div>
                        <div>Hospital's Name:
                            <input defaultValue={hospital.name} type="text" className="form-control" name="d_name" aria-describedby="idHelp" disabled />
                        </div>
                        <div>Hospital's ID:
                            <input defaultValue={hospital.id} type="text" className="form-control" name="d_id" aria-describedby="idHelp" disabled />
                        </div>
                        <div>Prescription ID:
                            <input defaultValue={prescription.id} type="text" className="form-control" name="c_id" aria-describedby="idHelp" disabled />
                        </div>
                        <div>Test
                            <input defaultValue={prescription.test} type="text" className="form-control" name="test" aria-describedby="idHelp" disabled />
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
                        <button style={{ marginTop: '20px', marginRight: '20px' }} type="submit" className="btn btn-outline-dark">PAY TEST FEE</button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default TestBillCard
