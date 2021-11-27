import React, {useState, useEffect} from "react";
import { getUser, getRoutinesByUser } from "../apiCalls";

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

const MyRoutines = ({token}) => {
    const [myRoutines, setMyRoutines] = useState([]);
    const [user, setUser] = useState({});

    useEffect(async () => {
        // getUser(token, setUser);
        

    }, [])
    return(<>
    <h1>My Routines</h1>
    <NewRoutine  token = {token}/>

    </>)

}

export default MyRoutines;