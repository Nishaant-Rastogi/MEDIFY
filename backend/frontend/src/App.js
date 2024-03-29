import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PatientsHome from "./components/PatientsHome";
import PatientsHospitalsList from './components/PatientsHospitalsList';
import PatientsDoctorsList from './components/PatientsDoctorsList';
import DoctorsHome from './components/DoctorsHome';
import HospitalsHome from './components/HospitalsHome';
import InsuranceHome from './components/InsuranceHome';
import PharmacyHome from './components/PharmacyHome';
import PatientsPharmacyList from './components/PatientsPharmacyList';
import PatientsInsuranceList from './components/PatientsInsuranceList';
import PatientsPharmacyOrders from './components/PatientsPharmacyOrders';
import AdminHome from './components/AdminHome';
import AdminCheckUser from "./components/AdminCheckUser";
import AdminCheckOrganisation from "./components/AdminCheckOrganisation";
import DoctorsConsultation from "./components/DoctorsConsultation";
import DoctorsPrescription from "./components/DoctorsPrescription";
import PatientsConsultation from "./components/PatientsConsultation";
import PatientsPrescription from "./components/PatientsPrescription";
import PatientsBills from "./components/PatientsBills";
import DoctorsBills from "./components/DoctorsBills";
import PatientsTests from "./components/PatientsTests";
import HospitalTests from "./components/HospitalTests";
import HospitalBills from "./components/HospitalBills";
import HospitalDoctors from "./components/HospitalDoctors";
import InsurancePatients from "./components/InsurancePatients";
import InsuranceBills from "./components/InsuranceBills";
import InsuranceClaims from "./components/InsuranceClaims";
import PharmacyOrders from "./components/PharmacyOrders";
import PharmacyBills from "./components/PharmacyBills";
import PatientsClaim from "./components/PatientsClaim";
import SignUp from "./pages/SignUp";
import Verification from './pages/Verification';
import AdminUserList from './components/AdminUserList';
import AdminOrganisationList from './components/AdminOrganisationList';
import ProfileInformation from './components/ProfileInformation';
import ConsultationCard from './components/ConsultationCard';
import PatientsPharmacyBuyMedicine from './components/PatientsPharmacyBuyMedicine';
import PrescriptionCard from './components/PrescriptionCard';
import TestCard from './components/TestCard';
import AdminActivityLog from './components/AdminActivityLog';
import AdminTransactionLog from './components/AdminTransationLog';
function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(localStorage.getItem('user') || localStorage.getItem('organisation') || null)
    window.addEventListener('storage', storageEventHandler, false);
  }, []);
  function storageEventHandler() {
    setLoggedIn(localStorage.getItem('user') || localStorage.getItem('organisation') || null)
  }
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verification" element={<Verification />} />

          <Route path="/admin_user/home" element={<AdminHome />} />
          <Route path="/admin_user/users" element={<AdminCheckUser />} />
          <Route path="/admin_user/organisations" element={<AdminCheckOrganisation />} />
          <Route path="/admin_user/users_list" element={<AdminUserList />} />
          <Route path="/admin_user/organisations_list" element={<AdminOrganisationList />} />
          <Route path="/admin_user/activity-log" element={<AdminActivityLog />} />
          <Route path="/admin_user/transaction-log" element={<AdminTransactionLog />} />

          <Route path="/user/profile" element={<ProfileInformation />} />
          <Route path="/user/patients/home" element={<PatientsHome />} />
          <Route path="/user/patients/hospital" element={<PatientsHospitalsList />} />
          <Route path="/user/patients/hospital/test" element={<TestCard />} />
          <Route path="/user/patients/doctor" element={<PatientsDoctorsList />} />
          <Route path="/user/patients/doctor/consultation" element={<ConsultationCard />} />
          <Route path="/user/patients/insurance" element={<PatientsInsuranceList />} />
          <Route path="/user/patients/pharmacy" element={<PatientsPharmacyList />} />
          <Route path="/user/patients/pharmacy/buy" element={<PatientsPharmacyBuyMedicine />} />
          <Route path="/user/patients/pharmacy-orders" element={<PatientsPharmacyOrders />} />
          <Route path="/user/patients/prescription" element={<PatientsPrescription />} />
          <Route path="/user/patients/tests" element={<PatientsTests />} />
          <Route path="/user/patients/consultation" element={<PatientsConsultation />} />
          <Route path="/user/patients/bills" element={<PatientsBills />} />
          <Route path="/user/patients/claim" element={<PatientsClaim />} />

          <Route path="/user/doctors/home" element={<DoctorsHome />} />
          <Route path="/user/doctors/prescriptions" element={<DoctorsPrescription />} />
          <Route path="/user/doctors/consultations" element={<DoctorsConsultation />} />
          <Route path="/user/doctors/consultations/prescribe" element={<PrescriptionCard />} />
          <Route path="/user/doctors/bills" element={<DoctorsBills />} />

          <Route path="/organisation/hospitals/home" element={<HospitalsHome />} />
          <Route path="/organisation/hospitals/tests" element={<HospitalTests />} />
          <Route path="/organisation/hospitals/bills" element={<HospitalBills />} />
          <Route path="/organisation/hospitals/doctors" element={<HospitalDoctors />} />

          <Route path="/organisation/insurance/home" element={<InsuranceHome />} />
          <Route path="/organisation/insurance/patients" element={<InsurancePatients />} />
          <Route path="/organisation/insurance/bills" element={<InsuranceBills />} />
          <Route path="/organisation/insurance/claims" element={<InsuranceClaims />} />

          <Route path="/organisation/pharmacy/home" element={<PharmacyHome />} />
          <Route path="/organisation/pharmacy/orders" element={<PharmacyOrders />} />
          <Route path="/organisation/pharmacy/bills" element={<PharmacyBills />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
