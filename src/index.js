import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {Home, Login, Activities, SingleActivity, Routines, MyRoutines, CreatorPublicRoutines} from './Components'
import { logout } from './helperFunctions';

const App = () => {

    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {

    }, [token])
    return (
        <Router>
            <div>
                <div id='nav' className="btn-group">
                    <h3 className='nav-element'>Fitness Trac.kr</h3>
                    <Link className="btn btn-primary nav-element" to='/'>Home</Link>
                    <Link className="btn btn-primary nav-element" to='/routines'>Routines</Link>
                    <Link className="btn btn-primary nav-element" to='/activities'>Activities</Link>
                    
                    {!token?
                        <>
                        <Link className="btn btn-primary nav-element" to='/login'>Login</Link>
                        <Link className="btn btn-primary nav-element" to='/register'>Register</Link>
                        </>
                        :
                        <>
                        <Link className="btn btn-primary nav-element" to='/my-routines'>MyRoutines</Link>
                        <Link
                        className="btn btn-primary nav-element" 
                        to='/login'
                        onClick={() => {
                            logout(setToken);
                        }}>Logout</Link>
                        </>
                    }
                </div>
                <div id='mainsection'>
                    <Route exact path='/' render={(routeProps) => <Home {...routeProps} token={token}/>}></Route>
                    <Route path='/login' render={(routeProps) => <Login {...routeProps} setToken={setToken}/>}></Route>
                    <Route path='/register' render={(routeProps) => <Login {...routeProps} setToken={setToken}/>}></Route>
                    <Route exact path='/activities' render={(routeProps) => <Activities {...routeProps} token={token}/>}></Route>
                    <Route path='/activities/:activityId' render={(routeProps) => <SingleActivity {...routeProps} token={token}/>}></Route>
                    <Route exact path='/routines' render={(routeProps) => <Routines {...routeProps} token = {token}/>}></Route>
                    <Route path='/my-routines' render={(routeProps) => <MyRoutines {...routeProps} token = {token}/>}></Route>
                    <Route path='/routines/:username' render={(routeProps) => <CreatorPublicRoutines {...routeProps} token={token}/>}></Route>

                </div>
            </div>
        </Router>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('app'),
);