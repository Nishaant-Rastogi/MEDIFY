import React, { useEffect } from 'react';
import AdCarousel from './AdCarousel';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import '../styles/userhome.css';

function AdminHome({ User }) {

    useEffect(() => {
        if (localStorage.getItem('admin') === null) {
            window.location.href = '/';
        }
    }, []);
    return (
        <div className='UHOME'>
            <Navbar name={"Admin"} />
            <AdCarousel />
            <div className="UHCONTAINER1">
                {/*...............................................................................................................*/}
                <div className='UHFLEX5'>
                    <div className='ROW ROW2'>
                        <Link to='/admin_user/users' className='UHBOX1'>
                            <div className='COL'>
                                <div className='IMGCONTAINER'>
                                    <img className='IMG ACIMG' alt="/" src="/static/images/user.png" />
                                </div>
                                <div className='DATA'>
                                    <div className='HEADING'>UNAPPROVED USERS</div>
                                    <div className='SUBHEADING'>View All Users</div>
                                </div>
                            </div>
                        </Link>
                        <Link to='/admin_user/organisations' className='UHBOX1'>
                            <div className='COL'>
                                <div className='IMGCONTAINER'>
                                    <img className='IMG ACIMG' alt="/" src="/static/images/building.png" />
                                </div>
                                <div className='DATA'>
                                    <div className='HEADING'>UNAPPROVED ORGANISATIONS</div>
                                    <div className='SUBHEADING'>View All Organisations</div>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className='ROW ROW2'>
                        <Link to='/admin_user/users_list' className='UHBOX1'>
                            <div className='COL'>
                                <div className='IMGCONTAINER'>
                                    <img className='IMG ACIMG' alt="/" src="/static/images/user.png" />
                                </div>
                                <div className='DATA'>
                                    <div className='HEADING'>APPROVED USERS</div>
                                    <div className='SUBHEADING'>View All Users</div>
                                </div>
                            </div>
                        </Link>
                        <Link to='/admin_user/organisations_list' className='UHBOX1'>
                            <div className='COL'>
                                <div className='IMGCONTAINER'>
                                    <img className='IMG ACIMG' alt="/" src="/static/images/building.png" />
                                </div>
                                <div className='DATA'>
                                    <div className='HEADING'>APPROVED ORGANISATIONS</div>
                                    <div className='SUBHEADING'>View All Organisations</div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className='UHFLEX2' style={{ flex: '1', marginRight: '300px' }}>
                    <div className='ROW'>
                        <Link to='/admin_user/activity-log' className='COL COL1'>

                            <div className='IMGCONTAINER'>
                                <img className='IMG ACIMG' alt="/" src="/static/images/test.png" />
                            </div>
                            <div className='DATA'>
                                <div className='HEADING'>ACTIVITY LOG</div>
                                <div className='SUBHEADING'>View All Activities On The Portal</div>
                            </div>
                        </Link>
                        <Link to='/admin_user/transaction-log' className='COL COL2'>

                            <div className='IMGCONTAINER'>
                                <img className='IMG ACIMG' alt="/" src="/static/images/bank-transfer.png" />
                            </div>
                            <div className='DATA'>
                                <div className='HEADING'>TRANSACTION LOG</div>
                                <div className='SUBHEADING'>View All Transactions On The Portal</div>
                            </div>

                        </Link>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AdminHome;