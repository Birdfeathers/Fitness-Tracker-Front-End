import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {Home, Login} from './Components'
import { logout } from './helperFunctions';

const App = () => {

    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {

    }, [token])
    return (
        <Router>
            <div>
                <div id='nav'>
                    <h3>Fitness Trac.kr</h3>
                    <Link to='/'>Home</Link>
                    <Link to='/routines'>Routines</Link>
                    <Link to='/activities'>Activities</Link>
                    <Link to='/profile'>Profile</Link>
                    {!token?
                        <>
                        <Link to='/login'>Login</Link>
                        <Link to='/register'>Register</Link>
                        </>
                        :
                        <Link 
                        to='/login'
                        onClick={() => {
                            logout(setToken);
                        }}>Logout</Link>
                    }
                </div>
                <div id='mainsection'>
                    <Route exact path='/' render={(routeProps) => <Home {...routeProps}/>}></Route>
                    <Route path='/login' render={(routeProps) => <Login {...routeProps} setToken={setToken}/>}></Route>
                    <Route path='/register' render={(routeProps) => <Login {...routeProps} setToken={setToken}/>}></Route>

                </div>
            </div>
        </Router>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('app'),
);