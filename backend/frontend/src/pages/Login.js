import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/home.css'

const Login = () => {
    const [loginAs, setLoginAs] = useState(1)
    const navigate = useNavigate();
    let handleLoginAdmin = (e) => {
        e.preventDefault()
    }
    let handleLoginUser = (e) => {
        e.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: e.target.id.value,
                password: e.target.password.value
            })
        }
        fetch('/api/login-user/', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                localStorage.setItem('user', JSON.stringify({ id: data.id }));
                console.log(localStorage.getItem('user'));
                if (data.userType === 'P') {
                    console.log("patient");
                    navigate('/user/patients/home');
                }
                else if (data.userType === 'D') {
                    console.log("doctor");
                    navigate('/user/doctors/home');
                }
            })
    }
    let handleLoginOrganisation = (e) => {
        e.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: e.target.id.value,
                password: e.target.password.value
            })
        }
        fetch('/api/login-organization/', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                localStorage.setItem('organisation', JSON.stringify({ id: data.id }));
                console.log(localStorage.getItem('organisation'));
                if (data.userType === 'H') navigate('/organisation/hospitals/home');
                else if (data.userType === 'I') navigate('/organisation/insurance/home');
                else if (data.userType === 'P') navigate('/organisation/pharmacy/home');
            })
    }

    return (
        <div className='LOGIN'>
            <img className="LOGINIMG" src="/static/images/Healthcare-portal.jpg" />
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
                        <form onSubmit={handleLoginUser}>
                            <div className="form-group">
                                <label htmlhtml="exampleInputid1">User ID</label>
                                <input type="id" className="form-control" id="id" aria-describedby="idHelp" placeholder="Enter id" />
                                <small id="idHelp" className="form-text text-muted">We will never share your id with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label htmlhtml="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control" id="password" placeholder="Password" />
                            </div>
                            <button type="submit" className="btn COLOR LOGINB">Login as User</button>
                        </form> : loginAs === 3 ?
                            <form onSubmit={handleLoginOrganisation}>
                                <div className="form-group">
                                    <label htmlhtml="exampleInputid1">Organisation ID</label>
                                    <input type="id" className="form-control" id="id" aria-describedby="idHelp" placeholder="Enter id" />
                                    <small id="idHelp" className="form-text text-muted">We will never share your id with anyone else.</small>
                                </div>
                                <div className="form-group">
                                    <label htmlhtml="exampleInputPassword1">Password</label>
                                    <input type="password" className="form-control" id="password" placeholder="Password" />
                                </div>
                                <button type="submit" className="btn COLOR LOGINB">Login as Organisation</button>
                            </form> :
                            <form onSubmit={handleLoginAdmin}>
                                <div className="form-group">
                                    <label html="exampleInputid1">Admin ID</label>
                                    <input type="text" className="form-control" id="id" aria-describedby="idHelp" placeholder="Enter id" />
                                    <small id="idHelp" className="form-text text-muted">We will never share your id with anyone else.</small>
                                </div>
                                <div className="form-group">
                                    <label html="exampleInputPassword1">Password</label>
                                    <input type="password" className="form-control" id="password" placeholder="Password" />
                                </div>
                                <button type="submit" className="btn COLOR LOGINB">Login as Admin</button>
                            </form>}
                    <Link to='/signup'>
                        <div style={{ marginTop: '20px' }}>New User ?</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Login;