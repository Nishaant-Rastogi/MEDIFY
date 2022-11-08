import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import '../styles/navbar.css'

const PatientsClaim = () => {
    const location = useLocation()
    const [user, setUser] = useState([])
    const [bills, setBills] = useState([])
    const [bill, setBill] = useState(null)
    const [insurance, setInsurance] = useState({});
    const [insurances, setInsurances] = useState([]);

    const navigate = useNavigate()

    let handleClaim = (e) => {
        e.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                patient_id: user.id,
                insurance_id: insurance.id,
                refund_amount: e.target.refund_amount.value,
                bill_id: bill.id,
            })
        }
        fetch('/api/claim-refund/', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                navigate(-1)
                window.location.reload()
            });
    }

    let handleBills = () => {
        console.log("hello");
        const requiredOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: localStorage.getItem('user')
        }
        fetch('/api/get-unclaim-bills/', requiredOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setBills(data)
            })
    }


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

    let handleUser = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: localStorage.getItem('user')
        };

        fetch('/api/get-user/', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setUser(data);
            });
    };

    useEffect(() => {
        if (localStorage.getItem('user') === null) {
            window.location.href = '/';
        }
        handleUser();
        handleBills();
        handleInsurance();
    }, [])

    useEffect(() => {
        bills.map((bi) => bi.id === bill.id ? setBill(bi) : null)
    }, [bill])

    useEffect(() => {
        insurances.map((ins) => ins.id === insurance.id ? setInsurance(ins) : null)
    }, [insurance])

    return (
        <div>
            <Navbar name={JSON.parse(localStorage.getItem('user')).name} />
            <div className='UPROFILE'>
                <div className='PROFILECONTAINER'>
                    <div className='PROFILEHEADER'>
                        <div className="USER_DETAILS">
                            <div>CLAIM REFUND</div>
                        </div>
                        <hr style={{ width: '600px' }} />
                        <form onSubmit={handleClaim}>
                            <div>Patient's Name:
                                <input defaultValue={user.name} type="text" className="form-control" name="p_name" aria-describedby="idHelp" placeholder="Enter Patient's Name" disabled />
                            </div>
                            <div>Patient's ID:
                                <input defaultValue={user.id} type="text" className="form-control" name="p_id" aria-describedby="idHelp" placeholder="Enter ID" disabled />
                            </div>
                            <div>Insurance Company:
                                <select defaultValue={"DEFAULT"} className="form-control" aria-label="Default select example" onChange={(e) => { setInsurance({ id: e.target.value, name: e.target.value }) }}>
                                    <option value={"DEFAULT"} disabled>Select Insurance</option>
                                    {
                                        insurances.map((insurance, index) => <option key={index} value={insurance.id}>{insurance.name}</option>)
                                    }
                                </select>
                            </div>
                            <div>Select Bill:
                                <select defaultValue={"DEFAULT"} className="form-control" aria-label="Default select example" onChange={(e) => { setBill({ id: e.target.value, name: e.target.value }) }}>
                                    <option value={"DEFAULT"} disabled>Select Bills</option>
                                    {
                                        bills.map((bill, index) => <option key={index} value={bill.id}>{bill.id}</option>)
                                    }
                                </select>
                            </div>
                            {bill ?
                                <div>
                                    <div>
                                        Bill Amount:
                                        <input defaultValue={bill.amount} type="text" className="form-control" name="amount" aria-describedby="idHelp" placeholder="Enter Amount" disabled />
                                    </div>
                                    <div>
                                        Refund Amount:
                                        <input defaultValue={10} type="number" className="form-control" name="refund_amount" aria-describedby="idHelp" placeholder="Enter Amount" disabled />
                                    </div>
                                    <div>Recipient's Name:
                                        <input defaultValue={bill.docType === 'BC' ? bill.doctor_name : bill.docType === 'BT' ? bill.hospital_name : bill.docType === 'BP' ? bill.pharmacy_name : null} type="text" className="form-control" name="recipient_name" aria-describedby="idHelp" disabled />
                                    </div>
                                    <div>Recipient's ID:
                                        <input defaultValue={bill.docType === 'BC' ? bill.doctor_id : bill.docType === 'BT' ? bill.hospital_id : bill.docType === 'BP' ? bill.pharmacy_id : null} type="text" className="form-control" name="recipient_id" aria-describedby="idHelp" disabled />
                                    </div>
                                </div>
                                : null}
                            <button style={{ marginTop: '20px', marginRight: '20px' }} type="submit" className="btn btn-outline-dark">CLAIM REFUND</button>
                        </form>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default PatientsClaim