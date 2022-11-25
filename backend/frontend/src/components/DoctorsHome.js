import React, { useEffect } from 'react';
import AdCarousel from './AdCarousel';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import '../styles/userhome.css';

function DoctorsHome({ User }) {

    useEffect(() => {
        if (localStorage.getItem('user') === null) {
            window.location.href = '/';
        }
    }, []);
    return (
        <div className='UHOME'>
            <Navbar name={localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).name : window.location.href = '/'} />
            <AdCarousel />
            <div className="UHCONTAINER1">
                {/*...............................................................................................................*/}
                <div className='UHFLEX1'>
                    <div className='ROW ROW2'>
                        <Link to='/user/doctors/prescriptions' className='COL'>
                            <div className='IMGCONTAINER'>
                                <img className='IMG ACIMG' alt="/" src="/static/images/medical-prescription.png" />
                            </div>
                            <div className='DATA'>
                                <div className='HEADING'>PRESCRIPTIONS</div>
                                <div className='SUBHEADING'>View All Your Prescriptions</div>
                            </div>
                        </Link>
                        <Link to='/user/doctors/bills' className='COL COL1'>
                            <div className='IMGCONTAINER'>
                                <img className='IMG ACIMG' alt="/" src="/static/images/bill.png" />
                            </div>
                            <div className='DATA'>
                                <div className='HEADING'>BILLS</div>
                                <div className='SUBHEADING'>View All Bills</div>
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
                                    <img className='IMG ACIMG' alt="/" src="/static/images/chat.png" />
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