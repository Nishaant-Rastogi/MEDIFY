import React, { useState } from 'react';
import AdCarousel from './AdCarousel';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import '../styles/userhome.css';

function InsuranceHome({ User }) {

    return (
        <div className='UHOME'>
            <Navbar />
            <AdCarousel />
            <div className="UHCONTAINER1">
                {/*...............................................................................................................*/}
                <div className='UHFLEX5'>
                    <div className='ROW ROW2'>
                        <Link to='/organisation/insurance/pateints' className='COL'>
                            <div className='IMGCONTAINER'>
                                <img className='IMG ACIMG' alt="/" src="/static/images/stretcher.png" />
                            </div>
                            <div className='DATA'>
                                <div className='HEADING'>PATIENTS</div>
                                <div className='SUBHEADING'>View All Your Patients</div>
                            </div>
                        </Link>
                        <Link to='/organisation/insurance/claims' className='COL'>
                            <div className='IMGCONTAINER'>
                                <img className='IMG ACIMG' alt="/" src="/static/images/policy.png" />
                            </div>
                            <div className='DATA'>
                                <div className='HEADING'>CLAIMS</div>
                                <div className='SUBHEADING'>View All Claims</div>
                            </div>
                        </Link>
                        {/* <Link to='/organisation/insurance/bills' className='COL'>
                            <div className='IMGCONTAINER'>
                                <img className='IMG ACIMG' alt="/" src="/static/images/bill.png" />
                            </div>
                            <div className='DATA'>
                                <div className='HEADING'>BILLS</div>
                                <div className='SUBHEADING'>View All Insurance Claim Bills</div>
                            </div>
                        </Link> */}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default InsuranceHome;