import React, { useState } from 'react';
import AdCarousel from './AdCarousel';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import '../styles/userhome.css';

function HospitalsHome({ User }) {

    return (
        <div className='UHOME'>
            <Navbar />
            <AdCarousel />
            <div className="UHCONTAINER1">
                {/*...............................................................................................................*/}
                <div className='UHFLEX5'>
                    <div className='ROW ROW2'>
                        <Link to='/organisation/pharmacy/orders' className='COL'>
                            <div className='IMGCONTAINER'>
                                <img className='IMG ACIMG' alt="/" src="/bag.png" />
                            </div>
                            <div className='DATA'>
                                <div className='HEADING'>ORDERS</div>
                                <div className='SUBHEADING'>View All Orders</div>
                            </div>
                        </Link>
                        <Link to='/organisation/pharmacy/inventory' className='COL'>
                            <div className='IMGCONTAINER'>
                                <img className='IMG ACIMG' alt="/" src="/drugs.png" />
                            </div>
                            <div className='DATA'>
                                <div className='HEADING'>INVENTORY</div>
                                <div className='SUBHEADING'>View All Available Medicines</div>
                            </div>
                        </Link>
                        <Link to='/organisation/pharmacy/bills' className='COL'>
                            <div className='IMGCONTAINER'>
                                <img className='IMG ACIMG' alt="/" src="/bill.png" />
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