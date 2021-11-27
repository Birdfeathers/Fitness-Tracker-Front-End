import React, {useState, useEffect} from "react";
import { getUser, getRoutinesByUser, getActivities } from "../apiCalls";

const NewRoutine = ({token}) => {
    return <>
        <h2>Add New Routine </h2>
        <form onSubmit = {async (event) => {
            event.preventDefault();
            const newRoutine = await postRoutine(token, name, goal, true, setRoutines);
            console.log("new Routine", newRoutine);
                    
                    // if (newRoutine.error) alert(newRoutine.message);
                    // else{getRoutines(setRoutines);}
                
                
            }}>
            <input 
                    placeholder='Name*'
                    onChange={(event) => setName(event.target.value)} />
            <input 
                    placeholder='Goal*'
                    onChange={(event) => setGoal(event.target.value)} />
            <input type='submit' />
        </form>
        </>
}

const DeleteRoutine = ({token}) => {
    return  <button onClick = {(event) => { deleteRoutine(token, routine.id, setRoutines)}}> Delete Routine</button>
}

const EditRoutine = ({token}) => {
    return <form onSubmit = {(event) => {
        event.preventDefault();
        editRoutine(token, routine.id, name, goal, setRoutines);

    }}>
    <input 
        placeholder='Name*'
        onChange={(event) => setName(event.target.value)} />    
    <input 
        placeholder='Goal*'
        onChange={(event) => setGoal(event.target.value)} />
        <input type='submit' />
    </form>
}

const AddActivity = ({activities}) => {
    return <form onSubmit = {(event) => {
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
            onChange={(event) => setCount(event.target.value)} />
         <input 
            placeholder= 'Duration*'
            onChange={(event) => setDuration(event.target.value)} />
        <input type = 'submit' />
    </form>
}

const Activity = ({activity}) => {
    return <>
    <p><b> {activity.name} </b></p>
    <p><b>Description: </b>{activity.description}</p>
    <p><b>Duration: </b>{activity.duration}</p>
    <p><b>Count: </b>{activity.count}</p>
    </>
}

const DeleteActivity = ({token, activity}) => {
    return <button onClick = { () => {
        console.log(activity.routineActivityId);
        deleteRoutineActivity(token, activity.routineActivityId, setRoutines);
    }}>Remove Activity</button>
}

const EditRoutineActivity = ({token, activity}) => {
    return <form onSubmit = {(event) => {
        event.preventDefault();
        editRoutineActivity(token, activity.routineActivityId, count, duration, setRoutines);
    }}>
    <input 
        placeholder='Count*'
        onChange={(event) => setCount(event.target.value)} />
    <input 
        placeholder= 'Duration*'
        onChange={(event) => setDuration(event.target.value)} />
    <input type = 'submit' />
    </form>
}

const MyRoutines = ({token}) => {
    const [myRoutines, setMyRoutines] = useState([]);
    const [activities, setActivities] = useState([]);

    useEffect(async () => {
        const user = await getUser(token);
        setMyRoutines(await getRoutinesByUser(user.username, token));
        setActivities(await getActivities());
   
        

    }, [])
    return(<>
    <h1>My Routines</h1>
    <NewRoutine  token = {token}/>
    {myRoutines.map((routine, key) => {
        return(<div key = {key}>
            <h4><b>{routine.name}</b></h4>
            <p><b>Goal: </b>{routine.goal}</p>
            <p><b>Creator: </b>{routine.creatorName}</p>
            <DeleteRoutine token = {token}/>
            <h3>Edit Routine</h3>
            <EditRoutine token = {token} />
            <h3>Add Activity to Routine</h3>
            <AddActivity activities = {activities}/>
            <p><b>Activities: </b></p>
            {routine.activities.map((activity, key) => {
                return <div key = {key} >
                    <Activity activity = {activity} />
                    <DeleteActivity token = {token} activity = {activity}/>
                    <p><b>Edit Routine Activity</b></p>
                    <EditRoutineActivity token = {token} activity = {activity} />
                    </div>
            })}
        </div>
        
          
        )
    })}

    </>)

}

export default MyRoutines;