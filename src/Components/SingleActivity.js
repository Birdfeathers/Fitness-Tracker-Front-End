import React, {useState, useEffect} from "react";
import { editActivity, getRoutinesByActivity, getActivities } from "../apiCalls";

const SingleActivity = ({match, token}) => {
    const [routines, setRoutines] = useState('');
    const [activity, setActivity] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [editedActivity, setEditedActivity] = useState('');

    useEffect(async () => {
        const activities = await getActivities();
        const filteredActivity = activities.filter((activity) => parseInt(match.params.activityId) === activity.id);
        setActivity(filteredActivity[0]);

        setName(filteredActivity[0].name);
        setDescription(filteredActivity[0].description);

        const result = await getRoutinesByActivity(match.params.activityId);
        setRoutines(result);
    }, [editedActivity])
    return (
        <>
        <div>
            <h1>{activity.name}</h1>
            <p><b>Name: </b>{activity.name}</p>
            <p><b>Description: </b>{activity.description}</p>
        </div>
        <div>
            <h3>Edit Activity</h3>
            <form
            onSubmit={async (event) => {
                event.preventDefault();

                const result = await editActivity(token, match.params.activityId, name, description);
                if (result.error) alert(result.message);
                setEditedActivity(result);
            }}>
                <input
                placeholder='name'
                value={name}
                onChange={(event) => {
                    setName(event.target.value);
                }} />
                <input
                placeholder='description'
                value={description}
                onChange={(event) => {
                    setDescription(event.target.value);
                }} />
                <input type='submit' />
            </form>
        </div>
        <h2>Related Routines</h2>
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
            <h3>No related routines</h3>
        }
        </>
    )
}

export default SingleActivity;