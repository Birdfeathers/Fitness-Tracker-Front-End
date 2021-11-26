import React, {useState, useEffect} from "react";
import { getRoutines, postRoutine, getUser } from "../apiCalls";

const Routines = ({token}) => {
    const [routines, setRoutines] = useState([]);
    const [name, setName] = useState("");
    const [goal, setGoal] = useState("");
    const [user, setUser] = useState({});

    useEffect(async () => {
        getRoutines(setRoutines);
        getUser(token, setUser);

    }, [])
    
    return (
    <>
        <h1>Routines</h1>
        {token? <>
            <h2>Add New Routine </h2>
            <form onSubmit = {async (event) => {
                event.preventDefault();
                const newRoutine = await postRoutine(token, name, goal, true);
                if (newRoutine.error) alert(newRoutine.message);
                else{getRoutines(setRoutines);}
                
            }}>
            <input 
                    placeholder='Name*'
                    value={name}
                    onChange={(event) => setName(event.target.value)} />
            <input 
                    placeholder='Goal*'
                    value={goal}
                    onChange={(event) => setGoal(event.target.value)} />
                    <input type='submit' />
        </form></>: null}
        {routines.map((routine, key) => {return(
        <div key = {key}>
            <h4><b>{routine.name}</b></h4>
            <p><b>Goal: </b>{routine.goal}</p>
            <p><b>Creator: </b>{routine.creatorName}</p>
            <p><b>Activities: </b>{routine.activities.map((activity, key) => {
                return <div key = {key}>
                    <p><b>{activity.name}</b></p>
                    <p><b>Description: </b>{activity.description}</p>
                    <p><b>Duration: </b>{activity.duration}</p>
                    <p><b>Count: </b>{activity.count}</p>
                </div>
            })}</p>
        </div>)})}
    </>
    )
}

export default Routines;