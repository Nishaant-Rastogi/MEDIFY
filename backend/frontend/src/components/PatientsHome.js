import React, { useState } from 'react';
import AdCarousel from './AdCarousel';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import '../styles/userhome.css';

function PatientsHome({ User }) {

  const handleInsuranceClaim = () => { };

  return (
    <div className='UHOME'>
      <Navbar />
      <AdCarousel />
      <div className="UHCONTAINER1">
        {/*...............................................................................................................*/}
        <div className='UHFLEX1'>
          <div className='ROW ROW2'>
            <Link to='/user/patients/hospital' className='COL'>
              <div className='IMGCONTAINER'>
                <img className='IMG ACIMG' alt="/" src="/static/images/building.png" />
              </div>
              <div className='DATA'>
                <div className='HEADING'>HOSPITALS</div>
                <div className='SUBHEADING'>View All Available Hospitals</div>
              </div>
            </Link>
            <Link to='/user/patients/doctor' className='COL'>

              <div className='IMGCONTAINER'>
                <img className='IMG ACIMG' alt="/" src="/static/images/stethoscope.png" />
              </div>
              <div className='DATA'>
                <div className='HEADING'>DOCTORS</div>
                <div className='SUBHEADING'>View All Available Doctors</div>
              </div>

            </Link>
          </div>
          <div className='ROW ROW3 '>
            <Link to='/user/patients/insurance' className='COL'>

              <div className='IMGCONTAINER'>
                <img className='IMG ACIMG' alt="/" src="/static/images/policy.png" />
              </div>
              <div className='DATA'>
                <div className='HEADING'>INSURANCE FIRMS</div>
                <div className='SUBHEADING'>View All Insurance Firms</div>
              </div>

            </Link>
            <Link to='/user/patients/pharmacy' className='COL'>

              <div className='IMGCONTAINER'>
                <img className='IMG ACIMG' alt="/" src="/static/images/bag.png" />
              </div>
              <div className='DATA'>
                <div className='HEADING'>PHARMACY</div>
                <div className='SUBHEADING'>View All Available Pharmacies</div>
              </div>

            </Link>
          </div>

        </div>
        <div className='UHFLEX2'>
          <div className='ROW'>
            <Link to='/user/patients/upload' className='COL COL1'>

              <div className='IMGCONTAINER'>
                <img className='IMG ACIMG' alt="/" src="/static/images/upload.png" />
              </div>
              <div className='DATA'>
                <div className='HEADING'>UPLOAD DOCUMENTS</div>
                <div className='SUBHEADING'>Upload Medical Records</div>
              </div>
            </Link>
            <Link to='/user/patients/records' className='COL COL2'>

              <div className='IMGCONTAINER'>
                <img className='IMG ACIMG' alt="/" src="/static/images/dental-report.png" />
              </div>
              <div className='DATA'>
                <div className='HEADING'>MEDICAL RECORDS</div>
                <div className='SUBHEADING'>View All Your Medical Records</div>
              </div>

            </Link>
          </div>
        </div>
        <div className='UHFLEX3' onClick={handleInsuranceClaim}>
          <Link to='/user/patients/claim' >
            <div className='ROW ROW1'>
              INSURANCE CLAIM
            </div>
            <div className='ROW ROW2'>
              <div className='COL'>
                <div className='IMGCONTAINER'>
                  <img className='IMG ACIMG' alt="/" src="/static/images/shield.png" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="UHCONTAINER1">
        {/*...............................................................................................................*/}
        <div className='UHFLEX4'>
          <div className='ROW ROW2'>
            <Link to='/user/patients/prescription' className='COL'>

              <div className='IMGCONTAINER'>
                <img className='IMG ACIMG' alt="/" src="/static/images/medical-prescription.png" />
              </div>
              <div className='DATA'>
                <div className='HEADING'>PRESCRIPTIONS</div>
                <div className='SUBHEADING'>View All Your Prescriptions</div>
              </div>

            </Link>
            <Link to='/user/patients/tests' className='COL'>

              <div className='IMGCONTAINER'>
                <img className='IMG ACIMG' alt="/" src="/static/images/stretcher.png" />
              </div>
              <div className='DATA'>
                <div className='HEADING'>SCANS & TESTS</div>
                <div className='SUBHEADING'>View All Your Test Reports</div>
              </div>

            </Link>
            <Link to='/user/patients/bills' className='COL'>

              <div className='IMGCONTAINER'>
                <img className='IMG ACIMG' alt="/" src="/static/images/stretcher.png" />
              </div>
              <div className='DATA'>
                <div className='HEADING'>BILLS</div>
                <div className='SUBHEADING'>View All Your Medical Bills</div>
              </div>

            </Link>
          </div>
        </div>
      </div>
    </div >
  )
}

export default PatientsHome;