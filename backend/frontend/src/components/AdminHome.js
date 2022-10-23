import React, { useState } from 'react';
import AdCarousel from './AdCarousel';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import '../styles/userhome.css';

function AdminHome({ User }) {

    return (
        <div className='UHOME'>
            <Navbar />
            <AdCarousel />
            <div className="UHCONTAINER1">
                {/*...............................................................................................................*/}
                <div className='UHFLEX5'>
                    <div className='ROW ROW2'>
                        <Link to='/admin/users' className='UHBOX1'>
                            <div className='COL'>
                                <div className='IMGCONTAINER'>
                                    <img className='IMG ACIMG' alt="/" src="/static/imagesuser.png" />
                                </div>
                                <div className='DATA'>
                                    <div className='HEADING'>USERS</div>
                                    <div className='SUBHEADING'>View All Users</div>
                                </div>
                            </div>
                        </Link>
                        <Link to='/admin/organisations' className='UHBOX1'>
                            <div className='COL'>
                                <div className='IMGCONTAINER'>
                                    <img className='IMG ACIMG' alt="/" src="/static/imagesbuilding.png" />
                                </div>
                                <div className='DATA'>
                                    <div className='HEADING'>ORGANISATIONS</div>
                                    <div className='SUBHEADING'>View All Organisations</div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AdminHome;