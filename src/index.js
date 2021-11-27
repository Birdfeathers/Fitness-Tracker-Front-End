import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {Home, Login, Activities, SingleActivity, Routines, MyRoutines} from './Components'
import { logout } from './helperFunctions';

const App = () => {

    const [token, setToken] = useState(localStorage.getItem('token'));
    const [selectedActivity, setSelectedActivity] = useState('');

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
                    <Link to='/my-routines'>MyRoutines</Link>
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
                    <Route exact path='/' render={(routeProps) => <Home {...routeProps} token={token}/>}></Route>
                    <Route path='/login' render={(routeProps) => <Login {...routeProps} setToken={setToken}/>}></Route>
                    <Route path='/register' render={(routeProps) => <Login {...routeProps} setToken={setToken}/>}></Route>
                    <Route exact path='/activities' render={(routeProps) => <Activities {...routeProps} token={token} setSelectedActivity={setSelectedActivity}/>}></Route>
                    <Route path='/activities/:activityId' render={(routeProps) => <SingleActivity {...routeProps} token={token}/>}></Route>
                    <Route path='/routines' render={(routeProps) => <Routines {...routeProps} token = {token}/>}></Route>
                    <Route path='/my-routines' render={(routeProps) => <MyRoutines {...routeProps} token = {token}/>}></Route>

                </div>
            </div>
        </Router>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('app'),
);