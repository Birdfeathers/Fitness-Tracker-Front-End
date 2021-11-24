import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {Home} from './Components'
const App = () => {
    return (
        <Router>
            <div>
                <div id='nav'>
                    <h3>Fitness Trac.kr</h3>
                    <Link to='/'>Home</Link>
                    <Link to='/routines'>Routines</Link>
                    <Link to='/activities'>Activities</Link>
                    <Link to='/profile'>Profile</Link>
                    <Link to='/login'>Login</Link>
                    <Link to='/register'>Register</Link>
                </div>
                <div id='mainsection'>
                    <Route exact path='/' render={(routeProps) => <Home {...routeProps}/>}></Route>
                </div>
            </div>
        </Router>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('app'),
);