import React, { useState } from 'react';
import AdCarousel from './AdCarousel';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import '../styles/userhome.css';

function DoctorsHome({ User }) {

    return (
        <div className='UHOME'>
            <Navbar />
            <AdCarousel />
            <div className="UHCONTAINER1">
                {/*...............................................................................................................*/}
                <div className='UHFLEX1'>
                    <div className='ROW ROW2'>
                        <Link to='/user/doctors/patients' className='COL'>
                            <div className='IMGCONTAINER'>
                                <img className='IMG ACIMG' alt="/" src="/stretcher.png" />
                            </div>
                            <div className='DATA'>
                                <div className='HEADING'>PATIENTS</div>
                                <div className='SUBHEADING'>View All Your Patients</div>
                            </div>
                        </Link>

                        <Link to='/user/doctors/prescriptions' className='COL'>
                            <div className='IMGCONTAINER'>
                                <img className='IMG ACIMG' alt="/" src="/medical-prescription.png" />
                            </div>
                            <div className='DATA'>
                                <div className='HEADING'>PRESCRIPTIONS</div>
                                <div className='SUBHEADING'>View All Your Prescriptions</div>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className='UHFLEX2'>
                    <div className='ROW'>
                        <Link to='/user/doctors/upload' className='COL COL1'>
                            <div className='IMGCONTAINER'>
                                <img className='IMG ACIMG' alt="/" src="/upload.png" />
                            </div>
                            <div className='DATA'>
                                <div className='HEADING'>UPLOAD DOCUMENTS</div>
                                <div className='SUBHEADING'>Upload Medical Records</div>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className='UHFLEX3'>
                    <Link to='/user/doctors/consultations' className='UHBOX1'>
                        <div className='ROW ROW1'>
                            CONSULTATIONS
                        </div>
                        <div className='ROW ROW2'>
                            <div className='COL'>
                                <div className='IMGCONTAINER'>
                                    <img className='IMG ACIMG' alt="/" src="/chat.png" />
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div >
    )
}

export default DoctorsHome;