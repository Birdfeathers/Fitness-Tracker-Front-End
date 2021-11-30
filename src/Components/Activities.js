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
            <h1 className='title'>Activities</h1>
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
                    <div className="row">
                        <div className="col">
                            <input 
                            className="form-control"
                            placeholder='Name*'
                            value={name}
                            onChange={(event) => setName(event.target.value)} />
                        </div>
                        <div className="col">
                        <input 
                        className="form-control"
                        placeholder='Description*'
                        value={description}
                        onChange={(event) => setDescription(event.target.value)} />
                        </div>
                        <div className="col">
                            <input className="btn btn-primary" type='submit' />
                        </div>
                    </div>
                </form>
                </>
                :
                null
            }
            <div className="list-group">
                {activities?
                    activities.map((activity, idx) => {
                        return (<a 
                        id='activity'
                        className="list-group-item list-group-item-action flex-column align-items-start"
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
            </div>
        </>
    )
}

export default Activities;