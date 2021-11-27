import React, {useState, useEffect} from "react";
import { getRoutines } from "../apiCalls";


const Routines = ({token}) => {
    const [routines, setRoutines] = useState([]);
    

    useEffect(async () => {
        setRoutines(await getRoutines());

    }, [])

    
    return (
    <>
        <h1>Routines</h1>
        {routines.map((routine, key) => {return(
        <div key = {key}>
            <h4><b>{routine.name}</b></h4>
            <p><b>Goal: </b>{routine.goal}</p>
            <p><b>Creator: </b>{routine.creatorName}</p>
            <div><b>Activities: </b>{routine.activities.map((activity, key) => {
                return <div key = {key}>
                    <p><b>{activity.name}</b></p>
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