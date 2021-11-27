import React, {useState, useEffect} from "react";
import { getRoutines, 
        postRoutine, 
        getUser, 
        deleteRoutine, 
        editRoutine,
        getActivities,
        attachActivity,
        deleteRoutineActivity,
        editRoutineActivity } from "../apiCalls";

const Routines = ({token}) => {
    const [routines, setRoutines] = useState([]);
    const [name, setName] = useState("");
    const [goal, setGoal] = useState("");
    const [user, setUser] = useState({});
    const [activities, setActivities] = useState([]);
    const [activityId, setActivityId] = useState();
    const [count, setCount] = useState("");
    const [duration, setDuration] = useState("");
    

    useEffect(async () => {
        getRoutines(setRoutines);
        getUser(token, setUser);
        setActivities(await getActivities());

    }, [])
    
    return (
    <>
        <h1>Routines</h1>
        {token? <>
            <h2>Add New Routine </h2>
            <form onSubmit = {async (event) => {
                event.preventDefault();
                try{
                    const newRoutine = await postRoutine(token, name, goal, true, setRoutines);
                    console.log("new Routine", newRoutine);
                    
                    // if (newRoutine.error) alert(newRoutine.message);
                    // else{getRoutines(setRoutines);}
                }
                catch(error)
                {
                    console.log(error);
                }
                
            }}>
            <input 
                    placeholder='Name*'
                    // value={name}
                    onChange={(event) => setName(event.target.value)} />
            <input 
                    placeholder='Goal*'
                    // value={goal}
                    onChange={(event) => setGoal(event.target.value)} />
                    <input type='submit' />
        </form></>: null}
        {routines.map((routine, key) => {return(
        <div key = {key}>
            <h4><b>{routine.name}</b></h4>
            {user.id === routine.creatorId? <> 
                <button onClick = {(event) => { deleteRoutine(token, routine.id, setRoutines)}}> Delete Routine</button>
                <h3>Edit Routine</h3>
                <form onSubmit = {(event) => {
                    event.preventDefault();
                    editRoutine(token, routine.id, name, goal, setRoutines);

                }}>
                <input 
                    placeholder='Name*'
                    // value={name}
                    onChange={(event) => setName(event.target.value)} />
            <input 
                    placeholder='Goal*'
                    // value={goal}
                    onChange={(event) => setGoal(event.target.value)} />
                    <input type='submit' />
                </form>
                <h3>Add Activity to Routine</h3>
                <form onSubmit = {(event) => {
                    event.preventDefault();
                    console.log(routine.id, activityId, count, duration);
                    attachActivity(routine.id, activityId, count, duration, setRoutines);
                }}>
                    <select  onChange = {(event) => {setActivityId(event.target.value)}}>
                        <option value = {"none"}> Select an activity: </option>
                        {activities.map((activity, key) => {
                            return <option key = {key} value = {activity.id} >{activity.name}</option>
                        })}
                    </select>
                    <input 
                        placeholder='Count*'
                        // value={count}
                        onChange={(event) => setCount(event.target.value)} />
                     <input 
                        placeholder= 'Duration*'
                        // value={duration}
                        onChange={(event) => setDuration(event.target.value)} />
                    <input type = 'submit' />
                </form>

            </>: null}
            <p><b>Goal: </b>{routine.goal}</p>
            <p><b>Creator: </b>{routine.creatorName}</p>
            <div><b>Activities: </b>{routine.activities.map((activity, key) => {
                return <div key = {key}>
                    <p><b>{activity.name}</b></p>
                    {user.id === routine.creatorId? <>
                        <button onClick = { () => {
                            console.log(activity.routineActivityId);
                            deleteRoutineActivity(token, activity.routineActivityId, setRoutines);
                        }}>Remove Activity</button>
                        <h3>Edit Routine Activity</h3>
                        <form onSubmit = {(event) => {
                            event.preventDefault();
                            editRoutineActivity(token, activity.routineActivityId, count, duration, setRoutines);
                        }}>
                        <input 
                            placeholder='Count*'
                            // value={count}
                            onChange={(event) => setCount(event.target.value)} />
                        <input 
                            placeholder= 'Duration*'
                            // value={duration}
                            onChange={(event) => setDuration(event.target.value)} />
                        <input type = 'submit' />
                        </form>
                    </>: null}
                    <p><b>Description: </b>{activity.description}</p>
                    <p><b>Duration: </b>{activity.duration}</p>
                    <p><b>Count: </b>{activity.count}</p>
                </div>
            })}</div>
        </div>)})}
    </>
    )
}

export default Routines;