import React from 'react'
import ReactLoading from "react-loading";

const Loading = ({ text }) => {
    return (
        <div className='PROFILEHEADER'>
            <div className="USER_DETAILS">
                <h3>{text != null ? text : "Adding Block To Ethereum Block Chain"}</h3>

                <ReactLoading type="bubbles" color="rgb(0, 28, 80)"
                    height={100} width={200} />
            </div>
        </div>
    )
}

export default Loading