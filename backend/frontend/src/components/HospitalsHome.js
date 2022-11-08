import React, { useEffect } from 'react';
import AdCarousel from './AdCarousel';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import '../styles/userhome.css';

function HospitalsHome() {
    useEffect(() => {
        if (localStorage.getItem('organisation') === null) {
            window.location.href = '/';
        }
    }, []);

    return (
        <div className='UHOME'>
            <Navbar name={JSON.parse(localStorage.getItem('organisation')).name} />
            <AdCarousel />
            <div className="UHCONTAINER1">
                {/*...............................................................................................................*/}
                <div className='UHFLEX5'>
                    <div className='ROW ROW2'>
                        <Link to='/organisation/hospitals/doctors' className='COL'>
                            <div className='IMGCONTAINER'>
                                <img className='IMG ACIMG' alt="/" src="/static/images/stethoscope.png" />
                            </div>
                            <div className='DATA'>
                                <div className='HEADING'>DOCTORS</div>
                                <div className='SUBHEADING'>View All Available Doctors</div>
                            </div>
                        </Link>
                        <Link to='/organisation/hospitals/tests' className='COL'>
                            <div className='IMGCONTAINER'>
                                <img className='IMG ACIMG' alt="/" src="/static/images/stretcher.png" />
                            </div>
                            <div className='DATA'>
                                <div className='HEADING'>SCANS & TESTS</div>
                                <div className='SUBHEADING'>View All Hospital's Scans</div>
                            </div>
                        </Link>
                        <Link to='/organisation/hospitals/bills' className='COL'>
                            <div className='IMGCONTAINER'>
                                <img className='IMG ACIMG' alt="/" src="/static/images/bill.png" />
                            </div>
                            <div className='DATA'>
                                <div className='HEADING'>BILLS</div>
                                <div className='SUBHEADING'>View All Hospital's Bills</div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default HospitalsHome;