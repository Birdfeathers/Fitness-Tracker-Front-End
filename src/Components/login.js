import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import {login, register} from '../apiCalls'

const Login = ({match, history, setToken}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <form
        onSubmit={async (event) => {
            event.preventDefault();

            if (match.url === '/register') {
                if (confirmPassword !== password) {
                    alert('password and confirm password must match');
                    return;
                } else {
                    const registerResult = await register(username, password, setToken);
                    if (registerResult.error) {
                        return;
                    }
                    history.push('/login');
                    
                }
                
            } else {
                const loginResult = await login(username, password, setToken)
                if (loginResult.error) {
                    return;
                }
                history.push('/');
                
            }
        }}>
            <div className="form-group">
                <label htmlFor="username" className='form-label'>Username</label>
                <input 
                className='form-control'
                id='username'
                placeholder='username'
                value={username}
                onChange={(event) => setUsername(event.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="password" className='form-label'>Password</label>
                <input 
                className='form-control'
                id='password'
                type='password'
                placeholder='password'
                value={password}
                onChange={(event) => setPassword(event.target.value)}/>
            </div>
            {match.url === '/register'?
                <div className="form-group">
                    <label htmlFor="confirm-password" className='form-label'>Confirm Password</label>
                    <input 
                    className='form-control'
                    id='confirm-password'
                    type='password'
                    placeholder='confirm password'
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}/>
                </div>
                :
                null
            }
            <input type='submit' className="btn btn-primary"/>
            { // Adjust the link displayed to the user depending on the page they are on
                match.url === '/register'?
                    <Link to='/login'>Already have an account?</Link>
                    :
                    <Link to='/register'>Don't have an account?</Link>
            }
        </form>
    )
}

export default Login;