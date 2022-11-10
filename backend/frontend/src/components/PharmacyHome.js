import React, { useState } from 'react';
import AdCarousel from './AdCarousel';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import '../styles/userhome.css';

function PharmacyHome({ User }) {

    return (
        <div className='UHOME'>
            <Navbar name={localStorage.getItem('organisation') ? JSON.parse(localStorage.getItem('organisation')).name : window.location.href = '/'} />
            <AdCarousel />
            <div className="UHCONTAINER1">
                {/*...............................................................................................................*/}
                <div className='UHFLEX5' style={{ flex: '0.8' }}>
                    <div className='ROW ROW2'>
                        <Link to='/organisation/pharmacy/orders' className='COL'>
                            <div className='IMGCONTAINER'>
                                <img className='IMG ACIMG' alt="/" src="/static/images/bag.png" />
                            </div>
                            <div className='DATA'>
                                <div className='HEADING'>ORDERS</div>
                                <div className='SUBHEADING'>View All Orders</div>
                            </div>
                        </Link>
                        <Link to='/organisation/pharmacy/inventory' className='COL'>
                            <div className='IMGCONTAINER'>
                                <img className='IMG ACIMG' alt="/" src="/static/images/drugs.png" />
                            </div>
                            <div className='DATA'>
                                <div className='HEADING'>INVENTORY</div>
                                <div className='SUBHEADING'>View All Available Medicines</div>
                            </div>
                        </Link>
                        <Link to='/organisation/pharmacy/bills' className='COL'>
                            <div className='IMGCONTAINER'>
                                <img className='IMG ACIMG' alt="/" src="/static/images/bill.png" />
                            </div>
                            <div className='DATA'>
                                <div className='HEADING'>BILLS</div>
                                <div className='SUBHEADING'>View All Pharmacy's Bills</div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default PharmacyHome;