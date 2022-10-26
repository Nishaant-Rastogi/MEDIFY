import React, { useState } from 'react'
import Navbar from './Navbar'


const PharmacyBuyMedicine = () => {

  let handleBuyMedicine = () => { }

  return (
    <div>
      <Navbar />
      <div className='UPROFILE'>
        <div className='PROFILECONTAINER'>
          <div className='PROFILEHEADER'>
            <div className="USER_DETAILS">
              <div className="USER_PROFILE_IMAGE">
                <img className="img" src="/static/images/user.png" alt="/" />
              </div>
              <div className="USER_DETAILS_DATA">
                BUY MEDICINE
              </div>

            </div>
            <hr style={{ width: '600px' }} />
            <form onSubmit={handleBuyMedicine}>

              <button style={{ marginTop: '20px', marginRight: '20px' }} type="submit" className="btn btn-outline-dark">BUY MEDICINES</button>

            </form>
          </div>
        </div>
      </div>
    </div >
  )
}

export default PharmacyBuyMedicine