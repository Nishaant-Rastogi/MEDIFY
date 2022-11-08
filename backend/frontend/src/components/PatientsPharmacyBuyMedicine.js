import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Navbar from './Navbar'


const PharmacyBuyMedicine = () => {
  const [user, setUser] = useState([])
  const [prescriptions, setPrescriptions] = useState([])
  const [prescription, setPrescription] = useState(null)
  const [insurance, setInsurance] = useState({});
  const [insurances, setInsurances] = useState([]);
  const location = useLocation()
  const navigate = useNavigate()
  const pharmacy = { id: location.state.pharmacy_id, name: location.state.pharmacy_name }

  let handleBuyMedicine = (e) => {
    e.preventDefault()
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prescription_id: prescription.id,
        pharmacy_id: pharmacy.id,
        pharmacy_name: pharmacy.name,
        insurance_id: insurance.id,
        insurance_name: insurance.name,
        patient_id: user.id,
        patient_name: user.name,
        amount: e.target.amount.value,
        medicine: e.target.medicine.value,
      })
    }
    fetch('/api/send-pharmacy-bill/', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        navigate(-1)
        window.location.reload()
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
        setUser(data);
      });
  };

  let handlePrescriptions = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: localStorage.getItem('user')
    }
    fetch('/api/get-prescriptions-buy-medicine/', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setPrescriptions(data);
      });
  }

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
  useEffect(() => {
    if (localStorage.getItem('user') === null) {
      window.location.href = '/';
    }
    handleUser();
    handlePrescriptions();
    handleInsurance();
  }, [])
  useEffect(() => {
    prescriptions.map((pres) => pres.id === prescription.id ? setPrescription(pres) : null)
  }, [prescription])
  return (
    <div>
      <Navbar name={localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).name : window.location.href = '/'} />
      <div className='UPROFILE'>
        <div className='PROFILECONTAINER'>
          <div className='PROFILEHEADER'>
            <div className="USER_DETAILS">
              <div className="USER_DETAILS_DATA">
                BUY MEDICINE
              </div>
            </div>
            <hr style={{ width: '600px' }} />
            <form onSubmit={handleBuyMedicine}>
              <div>Patient's Name:
                <input defaultValue={user.name} type="text" className="form-control" name="p_name" aria-describedby="idHelp" placeholder="Enter Patient's Name" disabled />
              </div>
              <div>Patient's ID:
                <input defaultValue={user.id} type="text" className="form-control" name="p_id" aria-describedby="idHelp" placeholder="Enter ID" disabled />
              </div>
              <div>Pharmacy's Name:
                <input defaultValue={pharmacy.name} type="text" className="form-control" name="d_name" aria-describedby="idHelp" disabled />
              </div>
              <div>Pharmacy's ID:
                <input defaultValue={pharmacy.id} type="text" className="form-control" name="d_id" aria-describedby="idHelp" disabled />
              </div>
              <div>Select Prescription
                <select defaultValue={"DEFAULT"} className="form-control" aria-label="Default select example" onChange={(e) => { setPrescription({ id: e.target.value, name: e.target.value }) }}>
                  <option value={"DEFAULT"} disabled>Select Prescriptions</option>
                  {
                    prescriptions.map((prescription, index) => <option key={index} value={prescription.id}>{prescription.id}</option>)
                  }
                </select>
              </div>
              {prescription ? <div>Medicine
                <input defaultValue={prescription.medicine} type="text" className="form-control" name="medicine" aria-describedby="idHelp" disabled />
              </div> : null}
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

              <button style={{ marginTop: '20px', marginRight: '20px' }} type="submit" className="btn btn-outline-dark">BUY MEDICINES</button>

            </form>
          </div>
        </div>
      </div>
    </div >
  )
}

export default PharmacyBuyMedicine