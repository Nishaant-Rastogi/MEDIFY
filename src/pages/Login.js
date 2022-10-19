import { useState } from "react";
import '../styles/home.css'

const Login = () => {
    const [loginAs, setLoginAs] = useState(1)

    return (
        <div className='LOGIN'>
            <img className="LOGINIMG" src="./Healthcare-portal.jpg" />
            <div className='LOGINCONTAINER'>
                <div className='LOGINS'>
                    <div className='USER'>
                        <button type="button" className="btn COLOR" active="true" onClick={() => { setLoginAs(1) }}>USER</button>
                    </div>
                    <div className='ORGANISATION'>
                        <button type="button" className="btn COLOR" onClick={() => { setLoginAs(3) }}>ORGANISATION</button>
                    </div>
                    <div className='ADMIN'>
                        <button type="button" className="btn COLOR" onClick={() => { setLoginAs(2) }}>ADMIN</button>
                    </div>

                </div>
                <div className='FORMCONTAINER'>
                    {loginAs === 1 ?
                        <form onSubmit={"handleLoginUser"}>
                            <div className="form-group">
                                <label htmlhtml="exampleInputid1">User ID</label>
                                <input type="id" className="form-control" id="Customer_ID" aria-describedby="idHelp" placeholder="Enter id" />
                                <small id="idHelp" className="form-text text-muted">We will never share your id with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label htmlhtml="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control" id="Password" placeholder="Password" />
                            </div>
                            <button type="submit" className="btn COLOR LOGINB">Login as User</button>
                        </form> : loginAs === 3 ?
                            <form onSubmit={"handleLoginUser"}>
                                <div className="form-group">
                                    <label htmlhtml="exampleInputid1">Organisation ID</label>
                                    <input type="id" className="form-control" id="Organisation_ID" aria-describedby="idHelp" placeholder="Enter id" />
                                    <small id="idHelp" className="form-text text-muted">We will never share your id with anyone else.</small>
                                </div>
                                <div className="form-group">
                                    <label htmlhtml="exampleInputPassword1">Password</label>
                                    <input type="password" className="form-control" id="Password" placeholder="Password" />
                                </div>
                                <button type="submit" className="btn COLOR LOGINB">Login as Organisation</button>
                            </form> :
                            <form onSubmit={"handleLoginAdmin"}>
                                <div className="form-group">
                                    <label html="exampleInputid1">Admin ID</label>
                                    <input type="text" className="form-control" id="Admin_ID" aria-describedby="idHelp" placeholder="Enter id" />
                                    <small id="idHelp" className="form-text text-muted">We will never share your id with anyone else.</small>
                                </div>
                                <div className="form-group">
                                    <label html="exampleInputPassword1">Password</label>
                                    <input type="password" className="form-control" id="Password" placeholder="Password" />
                                </div>
                                <button type="submit" className="btn COLOR LOGINB">Login as Admin</button>
                            </form>}
                    <div style={{ marginTop: '20px' }}>New User ?</div>
                </div>
            </div>
        </div>
    )
}
export default Login;