import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/home.css'
import emailjs from '@emailjs/browser'
var sanitize = require('mongo-sanitize');
import bcrypt from 'bcryptjs'

const Login = () => {
    const [loginAs, setLoginAs] = useState(1)
    const navigate = useNavigate();

    let handleLoginAdmin = (e) => {
        e.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: sanitize(e.target.id.value),
                password: sanitize(e.target.password.value)
            })
        }
        fetch('/api/login-admin/', requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                alert("Invalid Credentials! Please try again.");
            })
            .then(data => {
                localStorage.setItem('admin', JSON.stringify({ id: data.id }));
                navigate('/admin_user/home');
            })
    }
    let handleLoginUser = (e) => {
        e.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: sanitize(e.target.id.value),
                password: sanitize(e.target.password.value)
            })
        }

        fetch('/api/login-user/', requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                alert("Invalid Credentials!, Please try Again");
            })
            .then(data => {
                if (bcrypt.compareSync(sanitize(e.target.password.value), data.password)) {
                    localStorage.setItem('user', JSON.stringify({ id: data.id, name: data.name }));
                    if (data.userType === 'P') {
                        navigate('/verification', { state: { type: 'P', name: data.name, email: data.email } });
                    }
                    else if (data.userType === 'D') {
                        navigate('/verification', { state: { type: 'D', name: data.name, email: data.email } });
                    }
                } else {
                    alert("Invalid Credentials!, Please try Again");
                }

            })

    }
    let handleLoginOrganisation = (e) => {
        e.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: sanitize(e.target.id.value),
                password: sanitize(e.target.password.value)
            })
        }
        fetch('/api/login-organization/', requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                alert("Invalid Credentials!, Please try again");
            })
            .then(data => {
                if (bcrypt.compareSync(sanitize(e.target.password.value), data.password)) {
                    localStorage.setItem('organisation', JSON.stringify({ id: data.id, name: data.name }));
                    if (data.orgType === 'H') navigate('/verification', { state: { orgType: 'H', name: data.name, email: data.email } });
                    else if (data.orgType === 'I') navigate('/verification', { state: { orgType: 'I', name: data.name, email: data.email } });
                    else if (data.orgType === 'P') navigate('/verification', { state: { orgType: 'P', name: data.name, email: data.email } });
                } else {
                    alert("Invalid Credentials!, Please try again");
                }
            })
    }
    useEffect(() => {
        localStorage.clear();

    }, [])

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