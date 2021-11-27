import React, {useState, useEffect} from "react";
import { getRoutines } from "../apiCalls";


const Routines = ({token, history}) => {
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
            <p>
                <b>Creator: </b>
                <a 
                href=''
                onClick={() => {
                    history.push(`/routines/${routine.creatorName}`)
                }}>
                    {routine.creatorName}
                </a>
            </p>
            <div><b>Activities: </b>{routine.activities.map((activity, key) => {
                return <div key = {key}>
                    <a 
                    href =""
                    onClick={() => {
                        history.push(`/activities/${activity.id}`);
                    }}>
                        <p><b>{activity.name}</b></p>
                    </a>
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