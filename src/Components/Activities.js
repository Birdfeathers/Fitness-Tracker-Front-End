import React, {useState, useEffect} from "react";
import { getActivities } from "../apiCalls";

const Activities = ({token}) => {
    const [activities, setActivities] = useState([]);

    useEffect(async () => {
        const result = await getActivities()
        setActivities(result);
    }, [])

    return (
        <>
            <h1>Activities</h1>
            {activities?
                activities.map((activity) => {
                    return (<div>
                    <h3>{activity.name}</h3>
                    <p>Description: {activity.description}</p>
                    </div>
                    )
                })
                :
                null
            }
        </>
    )
}

export default Activities;