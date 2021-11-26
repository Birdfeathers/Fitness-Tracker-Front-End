import React, {useState, useEffect} from "react";
import { editActivity, getRoutinesByActivity } from "../apiCalls";

const SingleActivity = ({match}) => {
    const [routines, setRoutines] = useState('');

    useEffect(async () => {
        const result = await getRoutinesByActivity(match.params.activityId);
        setRoutines(result);
    }, [])
    return (
        <>
        <h1>Related Routines</h1>
        {routines.length?
            routines.map((routine, idx) => {
                return (
                    <div key={idx}>
                        <div id="activities-routine">
                            <h3>{routine.name}</h3>
                            <p><b>Creator: </b>{routine.creatorName}</p>
                            <p><b>Goal: </b>{routine.goal}</p>
                        </div>
                        {routine.activities.map((activity, idx) => {
                            return (
                                <div key={idx}>
                                    <h4>{activity.name}</h4>
                                    <p><b>Description: </b>{activity.description}</p>
                                    <p><b>Duration: </b>{activity.duration}</p>
                                    <p><b>Count: </b>{activity.count}</p>
                                </div>
                            )
                        })

                        }
                    </div>
                )
            })
            :
            <h3>No related routines</h3>
        }
        </>
    )
}

export default SingleActivity;