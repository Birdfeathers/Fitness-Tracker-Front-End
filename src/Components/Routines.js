import React, {useState, useEffect} from "react";
import { getRoutines } from "../apiCalls";


const Routines = ({ history}) => {
    const [routines, setRoutines] = useState([]);
    

    useEffect(async () => {
        setRoutines(await getRoutines());

    }, [])

    
    return (
    <>
        <h1 className = "title">Routines</h1>
        {routines.map((routine, key) => {return(
        <div key = {key} className = "outerBorder smallMargin">
            <div className = "titleBar" >
                <h4><b>{routine.name}</b></h4>
                <h4>
                Created By  
                <a 
                href=''
                onClick={() => {
                    history.push(`/routines/${routine.creatorName}`)
                }}>
                    {routine.creatorName}
                </a>
            </h4>
            </div>
            
            <p><b>Goal: </b>{routine.goal}</p>
            
            <h5><b>Activities:</b> </h5>
            {routine.activities.map((activity, key) => {
                return <div key = {key} className = "blackBorder smallMargin">
                    
                    <a href ="" onClick={() => {
                        history.push(`/activities/${activity.id}`);
                    }}>
                        <p><b>{activity.name}</b></p>
                    </a> 
                    <p><b>Description: </b>{activity.description}</p>
                    <p><b>Duration: </b>{activity.duration}</p>
                    <p><b>Count: </b>{activity.count}</p>
                </div>
            })}
        </div>)})}
    </>
    )
}

export default Routines;