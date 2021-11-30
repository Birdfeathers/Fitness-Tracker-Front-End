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
        <h1 className = "title" >{match.params.username}'s Routines</h1>
        {userRoutines.length?
            userRoutines.map((routine, idx) => {
                return (
                    <div key={idx}>
                        <div id="activities-routine" className = "outerBorder smallMargin">
                            <div className = "titleBar">
                                <h4><b>{routine.name}</b></h4>
                                <p><b>Creator: </b>{routine.creatorName}</p>
                            </div>
                            <p><b>Goal: </b>{routine.goal}</p>
                        </div>
                        {routine.activities.map((activity, idx) => {
                            return (
                                <div key={idx} className =  "blackBorder smallMargin">
                                    <div className = "titleBar">
                                    <h5>{activity.name}</h5>
                                    </div>
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