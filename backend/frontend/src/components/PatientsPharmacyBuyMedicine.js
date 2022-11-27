import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
var sanitize = require('mongo-sanitize');
var CryptoJS = require("crypto-js");
import Loading from './Loading';
import TokenService from '../pages/TokenService';

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();

      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const csrftoken = getCookie('csrftoken');
const rnd = (() => {
  const gen = (min, max) => max++ && [...Array(max - min)].map((s, i) => String.fromCharCode(min + i));

  const sets = {
    num: gen(48, 57),
    alphaLower: gen(97, 122),
    alphaUpper: gen(65, 90),
    special: [...`~!@#$%^&*()_+-=[]\{}|;:'",./<>?`]
  };

  function* iter(len, set) {
    if (set.length < 1) set = Object.values(sets).flat();
    for (let i = 0; i < len; i++) yield set[Math.random() * set.length | 0]
  }

  return Object.assign(((len, ...set) => [...iter(len, set.flat())].join('')), sets);
})();
const enc = rnd(16)
const encryption_key = CryptoJS.enc.Utf8.parse(enc)
const IV = rnd(16)
const iv = CryptoJS.enc.Utf8.parse(IV)
const PharmacyBuyMedicine = () => {
  const [user, setUser] = useState([])
  const [prescriptions, setPrescriptions] = useState([])
  const [prescription, setPrescription] = useState(null)
  const [insurance, setInsurance] = useState({});
  const [insurances, setInsurances] = useState([]);
  const location = useLocation()
  const navigate = useNavigate()
  const pharmacy = { id: location.state.pharmacy_id, name: location.state.pharmacy_name }
  const [loading, setLoading] = useState(false);

  let handleBuyMedicine = (e) => {
    e.preventDefault()
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrftoken },
      body: JSON.stringify({
        data: CryptoJS.AES.encrypt(JSON.stringify({
          prescription_id: prescription.id,
          pharmacy_id: pharmacy.id,
          pharmacy_name: pharmacy.name,
          insurance_id: insurance.id,
          insurance_name: insurance.name,
          patient_id: user.id,
          patient_name: user.name,
          amount: e.target.amount.value,
          medicine: e.target.medicine.value,
        }), encryption_key, { iv: iv, mode: CryptoJS.mode.CBC }).toString() + enc + IV
      }),

    }
    fetch('/api/send-pharmacy-bill/', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        addBlock(data)
        // navigate(-1)
      });
  }
  let addBlock = (data) => {
    setLoading(true)
    const requiredOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrftoken },
      body: JSON.stringify({
        data: CryptoJS.AES.encrypt(JSON.stringify({
          id: data.id,
          timestamp: data.timestamp,
          document: JSON.stringify(data),
        }), encryption_key, { iv: iv, mode: CryptoJS.mode.CBC }).toString() + enc + IV
      }),
    }
    fetch('/api/add-block/', requiredOptions)
      .then(response => response.json())
      .then(data => { navigate(-1); setLoading(false) })
  }
  let handleUser = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrftoken },
      body: JSON.stringify({ data: CryptoJS.AES.encrypt(localStorage.getItem('user'), encryption_key, { iv: iv, mode: CryptoJS.mode.CBC }).toString() + enc + IV }),
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
      headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrftoken },
      body: JSON.stringify({ data: CryptoJS.AES.encrypt(localStorage.getItem('user'), encryption_key, { iv: iv, mode: CryptoJS.mode.CBC }).toString() + enc + IV }),

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
          {loading ? <Loading /> :
            <div className='PROFILEHEADER'>
              <div className="USER_DETAILS">
                <h1 className="USER_DETAILS_DATA">
                  BUY MEDICINE PAYMENT PORTAL
                </h1>
              </div>
              <hr style={{ width: '600px' }} />
              <form onSubmit={handleBuyMedicine}>
                <TokenService />
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
                  <select defaultValue={"DEFAULT"} className="form-control" aria-label="Default select example" onChange={(e) => { setPrescription({ id: e.target.value, name: e.target.value }) }} required>
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
                  <select defaultValue={"DEFAULT"} className="form-control" aria-label="Default select example" onChange={(e) => { setInsurance({ id: e.target.value, name: e.target.value }) }} required>
                    <option value={"DEFAULT"} disabled>Select Insurance</option>
                    {
                      insurances.map((insurance, index) => <option key={index} value={insurance.id}>{insurance.name}</option>)
                    }
                  </select>
                </div>

                <button style={{ marginTop: '20px', marginRight: '20px' }} type="submit" className="btn btn-outline-dark">BUY MEDICINES</button>

              </form>
            </div>
          }

        </div>
      </div>
    </div >
  )
}

export default PharmacyBuyMedicine