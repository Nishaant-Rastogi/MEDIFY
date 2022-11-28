import React, { useEffect } from 'react';
import AdCarousel from './AdCarousel';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import '../styles/userhome.css';

function InsuranceHome({ User }) {
    useEffect(() => {
        if (localStorage.getItem('organisation') === null) {
            window.location.href = '/';
        }
    }, []);
    return (
        <div className='UHOME'>
            <Navbar name={localStorage.getItem('organisation') ? JSON.parse(localStorage.getItem('organisation')).name : window.location.href = '/'} />
            <AdCarousel />
            <div className="UHCONTAINER1">
                {/*...............................................................................................................*/}
                <div className='UHFLEX5' style={{ flex: '0.8' }}>
                    <div className='ROW ROW2'>
                        <Link to='/organisation/insurance/patients' className='COL'>
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
                    </div>
                </div>
            </div>
        </div >
    )
}

export default InsuranceHome;