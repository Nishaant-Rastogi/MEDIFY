import './App.css';
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
import PatientsUpload from './components/PatientsUpload';
import AdminHome from './components/AdminHome';
import AdminCheckUser from "./components/AdminCheckUser";
import AdminCheckOrganisation from "./components/AdminCheckOrganisation";
import DoctorsConsultation from "./components/DoctorsConsultation";
import DoctorsPatients from "./components/DoctorsPatients";
import DoctorsPrescription from "./components/DoctorsPrescription";
import PatientsConsultation from "./components/PatientsConsultation";
import PatientsPrescription from "./components/PatientsPrescription";
import PatientsRecords from "./components/PatientsRecords";
import PatientsBills from "./components/PatientsBills";
import DoctorsUpload from "./components/DoctorsUpload";
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
import PharmacyInventory from "./components/PharmacyInventory";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/users" element={<AdminCheckUser />} />
          <Route path="/admin/organisations" element={<AdminCheckOrganisation />} />

          <Route path="/user/patients/home" element={<PatientsHome />} />
          <Route path="/user/patients/hospital" element={<PatientsHospitalsList />} />
          <Route path="/user/patients/doctor" element={<PatientsDoctorsList />} />
          <Route path="/user/patients/insurance" element={<PatientsInsuranceList />} />
          <Route path="/user/patients/pharmacy" element={<PatientsPharmacyList />} />
          <Route path="/user/patients/upload" element={<PatientsUpload />} />
          <Route path="/user/patients/consultation" element={<PatientsConsultation />} />
          <Route path="/user/patients/prescription" element={<PatientsPrescription />} />
          <Route path="/user/patients/tests" element={<PatientsTests />} />
          <Route path="/user/patients/records" element={<PatientsRecords />} />
          <Route path="/user/patients/bills" element={<PatientsBills />} />
          <Route path="/user/patients/claim" element={<PatientsClaim />} />

          <Route path="/user/doctors/home" element={<DoctorsHome />} />
          <Route path="/user/doctors/patients" element={<DoctorsPatients />} />
          <Route path="/user/doctors/prescriptions" element={<DoctorsPrescription />} />
          <Route path="/user/doctors/consultations" element={<DoctorsConsultation />} />
          <Route path="/user/doctors/upload" element={<DoctorsUpload />} />

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
          <Route path="/organisation/pharmacy/inventory" element={<PharmacyInventory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
