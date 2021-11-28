import React, {useState, useEffect} from "react";
import { getUser, getRoutinesByUser, getActivities, postRoutine, deleteRoutine, editRoutine, attachActivity, deleteRoutineActivity, editRoutineActivity} from "../apiCalls";


const NewRoutine = ({token, setMyRoutines, username}) => {
    const [name, setName] = useState("");
    const [goal, setGoal] = useState("");

    return <>
        <h2>Add New Routine </h2>
        <form onSubmit = {async (event) => {
            event.preventDefault();
            const newRoutine = await postRoutine(token, name, goal, true);
                    
            if (newRoutine.error) alert(newRoutine.message);
            else{setMyRoutines(await getRoutinesByUser(username, token));}
                
                
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

const DeleteRoutine = ({token, routine, setMyRoutines, username}) => {
    return  <button onClick = {async () => { 
            const deletedRoutine = await deleteRoutine(token, routine.id);
            if (deletedRoutine.error) alert(deletedRoutine.message);
            else{setMyRoutines(await getRoutinesByUser(username, token));}
        }
    }> Delete Routine</button>
}

const EditRoutine = ({token, routine, setMyRoutines, username}) => {
    const [name, setName] = useState("");
    const [goal, setGoal] = useState("");
    return <form onSubmit = {async (event) => {
        event.preventDefault();
        const editedRoutine = await editRoutine(token, routine.id, name, goal);
        if (editedRoutine.error) alert(editedRoutine.message);
        else{setMyRoutines(await getRoutinesByUser(username, token));}

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

const AddActivity = ({token, activities, routine, setMyRoutines, username}) => {
    const [count, setCount] = useState("");
    const [duration, setDuration] = useState("");
    const [activityId, setActivityId] = useState("");

    return <form onSubmit = {async (event) => {
        event.preventDefault();
        const activity = attachActivity(routine.id, activityId, count, duration);
        if (activity.error) alert(activity.message);
        else{setMyRoutines(await getRoutinesByUser(username, token));}
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
    <p><b>Description: </b>{activity.description}</p>
    <p><b>Duration: </b>{activity.duration}</p>
    <p><b>Count: </b>{activity.count}</p>
    </>
}

const RemoveActivity = ({token, activity, setMyRoutines, username}) => {
    return <button onClick = { async () => {
        const deletedRoutineActivity = await deleteRoutineActivity(token, activity.routineActivityId);
        if (deletedRoutineActivity.error) alert(deletedRoutineActivity.message);
        else{setMyRoutines(await getRoutinesByUser(username, token));}
    }}>Remove Activity</button>
}

const EditRoutineActivity = ({token, activity, setMyRoutines, username}) => {
    const [count, setCount] = useState("");
    const [duration, setDuration] = useState("");

    return <form onSubmit = {async (event) => {
        event.preventDefault();
        const editedRoutineActivity = await editRoutineActivity(token, activity.routineActivityId, count, duration);
        if (editedRoutineActivity.error) alert(editedRoutineActivity.message);
        else{setMyRoutines(await getRoutinesByUser(username, token));}
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
    const [user, setUser] = useState({});

    useEffect(async () => {
        const userTemp = await getUser(token);
        setMyRoutines(await getRoutinesByUser(userTemp.username, token));
        setActivities(await getActivities());
        setUser(userTemp);
   
        

    }, [])
    return(<>
    <h1>My Routines</h1>
    <NewRoutine  token = {token} setMyRoutines = {setMyRoutines} username = {user.username}/>
    {myRoutines.map((routine, key) => {
        return(<div key = {key} className = "blackBorder smallMargin">
            <div className = "titleBar">
                <h2><b>{routine.name}</b></h2>
                <DeleteRoutine token = {token} routine = {routine} setMyRoutines = {setMyRoutines} username = {user.username}/>
            </div>
            <p><b>Goal: </b>{routine.goal}</p>
            <p><b>Creator: </b>{routine.creatorName}</p>
            <div className = "blackBorder">
                <h3>Edit Routine</h3>
                <EditRoutine token = {token} routine = {routine} setMyRoutines = {setMyRoutines} username = {user.username} />
            </div>
            <h3><b>Routine Activities: </b></h3>
            {routine.activities.map((activity, key) => {
                return <div key = {key} className = "blackBorder smallMargin">
                    <div className = "titleBar">
                        <h5><b>{activity.name}</b></h5>
                        <RemoveActivity token = {token} activity = {activity} setMyRoutines = {setMyRoutines} username = {user.username}/>
                    </div>
                    <Activity activity = {activity} />
                    <div className = "blackBorder">
                        <h4><b>Edit Routine Activity</b></h4>
                        <EditRoutineActivity token = {token} activity = {activity} setMyRoutines = {setMyRoutines} username = {user.username}/>
                    </div>
                    </div>
            })}
            <div className = "blackBorder">
                <h3>Add Activity to Routine</h3>
                <AddActivity token = {token} activities = {activities} routine = {routine} setMyRoutines = {setMyRoutines} username = {user.username}/>
            </div>
        </div>
        
          
        )
    })}

    </>)

}

export default MyRoutines;