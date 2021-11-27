import React, {useState, useEffect} from "react";
import { getRoutinesByUser } from "../apiCalls";

const CreatorPublicRoutines = ({match, token}) => {
    const [userRoutines, setUserRoutines] = useState([]);

    useEffect(async () => {
        const result = await getRoutinesByUser(match.params.username, token);
        setUserRoutines(result);
    }, [token])
    return (
        <>
        <h1>{match.params.username}'s routines</h1>
        {userRoutines.length?
            userRoutines.map((routine, idx) => {
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
                                    <h5>{activity.name}</h5>
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
            null
        }
        </>
    )
}

export default CreatorPublicRoutines;