import React, {useState, useEffect} from "react";
import { getActivities, postActivity } from "../apiCalls";

const Activities = ({history, token, setSelectedActivity}) => {
    const [activities, setActivities] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [newActivity, setNewActivity] = useState('');

    useEffect(async () => {
        const result = await getActivities()
        setActivities(result);
    }, [newActivity])

    return (
        <>
            <h1>Activities</h1>
            {token?
                <>
                <h2>Add New Activity</h2>
                <form
                onSubmit={async (event) => {
                    event.preventDefault();
                    if (!name || !description) {
                        alert('Please fill out all required fields');
                        return;
                    }
                    const newlyCreatedActivity = await postActivity(token, name, description);
                    if (newlyCreatedActivity.error) alert(newlyCreatedActivity.message);
                    else {
                        setNewActivity(newlyCreatedActivity);
                        setName('');
                        setDescription('');
                    }

                }}>
                    <input 
                    placeholder='Name*'
                    value={name}
                    onChange={(event) => setName(event.target.value)} />
                    <input 
                    placeholder='Description*'
                    value={description}
                    onChange={(event) => setDescription(event.target.value)} />
                    <input type='submit' />
                </form>
                </>
                :
                null
            }
            {activities?
                activities.map((activity, idx) => {
                    return (<a 
                    href=""
                    key={idx}
                    onClick={() => {
                        setSelectedActivity(activity);
                        history.push(`/activities/${activity.id}`);
                    }}>
                    <h3>{activity.name}</h3>
                    <p>Description: {activity.description}</p>
                    </a>
                    )
                })
                :
                null
            }
        </>
    )
}

export default Activities;