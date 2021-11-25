import React, {useState, useEffect} from "react";
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
                    await register(username, password, setToken);
                    
                    
                }
                
            } else {
                const result = await login(username, password, setToken)
                
            }
        }}>
            <input 
            placeholder='username'
            value={username}
            onChange={(event) => setUsername(event.target.value)}/>
            <input 
            placeholder='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}/>
            {match.url === '/register'?
                <input 
                placeholder='confirm password'
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}/>
                :
                null
            }
            <input type='submit'/>
        </form>
    )
}

export default Login;