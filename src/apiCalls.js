const BaseUrl = "https://fitnesstrac-kr.herokuapp.com/";

async function register(username, password, setToken)
{
    try {
        const response = await fetch(BaseUrl + 'api/users/register', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password
        })
        })
        const result = await response.json();
        console.log(result);
        if (result.error) {
            alert(result.message);
            return result;
        }
        setToken(result.token);
        localStorage.setItem('token', result.token)
        return result;
    } catch (error) {
        console.error(error);
    }
}

async function login(username, password, setToken)
{
    try {
        const response = await fetch(BaseUrl + 'api/users/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password
        })
        })
        const result = await response.json();
        console.log(result);
        if (result.error) {
            alert(result.message);
            return result;
        }

        setToken(result.token);
        localStorage.setItem('token', result.token);
        return result;
    } catch (error) {
        console.error(error);
    }
}

async function getUser(token)
{
    try {
        const response = await fetch(BaseUrl + 'api/users/me', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        })
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
    }
}

async function getRoutinesByUser(username, token)
{
    const headers = {};
    if (token) {
        headers['Content-Type'] = 'application/json';
        headers.Authorization = `Bearer ${token}`;
    }
    else {
        headers['Content-Type'] = 'application/json';
    }
    try{
        const response = await fetch(BaseUrl + 'api/users/'+ username + '/routines', {
        headers,
        })
        const result = await response.json();
        console.log(result);
        if (result.message === "Sorry, no routines found for that username.") {
            return [];
        }
        return result;
    } catch(error) {
        console.error(error);
    }
   
   
}

async function getActivities()
{
    try {
        const response = await fetch(BaseUrl + 'api/activities', {
        headers: {
            'Content-Type': 'application/json',
        },
        })
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
    }
}

async function postActivity(token, name, description)
{
    try {
        const response = await fetch(BaseUrl + 'api/activities', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            name,
            description
        })
        })
        const result = await response.json();
        console.log(result)
        return result;
    } catch (error) {
        console.error(error);
    }
}

async function editActivity(token, activityId, name, description)
{
    try {
        const response = await fetch(BaseUrl + 'api/activities/' + activityId, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            name,
            description
        })
        })
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}

async function getRoutinesByActivity(activityId)
{
    try {
        const response = await fetch(BaseUrl + 'api/activities/'+ activityId + '/routines', {
        headers: {
            'Content-Type': 'application/json',
        },
        })
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
    }
}

async function getRoutines()
{   try {
        const response = await fetch(BaseUrl + 'api/routines', {
        headers: {
            'Content-Type': 'application/json',
        },
        })
            const result = await response.json();
            console.log(result);
            return result;
    } catch (error) {
        console.error(error);
    }
}

async function postRoutine(token, name, goal, isPublic)
{   
    try {
        const response = await fetch(BaseUrl+ 'api/routines', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            name,
            goal,
            isPublic
        })
        })
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
    }
}

async function editRoutine(token, routineId, name, goal)
{
    try {
        const response = await fetch(BaseUrl + 'api/routines/' + routineId, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            name,
            goal
        })
        })
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
    }
}

async function deleteRoutine(token, routineId)
{
    try {
        const response = await fetch(BaseUrl + 'api/routines/' + routineId, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        })
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
    }
}

async function attachActivity(routineId, activityId, count, duration)
{
    try {
        const response = await fetch(BaseUrl + 'api/routines/'+ routineId + '/activities', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            activityId,
            count, 
            duration
        })
        })
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
    }
}

async function editRoutineActivity(token, routineActivityId, count, duration)
{
    try {
        const response = await fetch(BaseUrl + 'api/routine_activities/' + routineActivityId, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            count,
            duration
        })
        })
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
    }
}

async function deleteRoutineActivity(token, routineActivityId)
{
    try {
        const response = await fetch(BaseUrl + 'api/routine_activities/'+ routineActivityId, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
        })
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
    }
}

export {register,
        login, 
        getUser, 
        getRoutinesByUser, 
        getActivities, 
        postActivity, 
        editActivity, 
        getRoutinesByActivity, 
        getRoutines, 
        postRoutine, 
        editRoutine,
        deleteRoutine, 
        attachActivity,
        editRoutineActivity, 
        deleteRoutineActivity};





