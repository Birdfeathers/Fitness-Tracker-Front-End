const BaseUrl = "http://fitnesstrac-kr.herokuapp.com/";

async function register(username, password, setToken)
{
    fetch(BaseUrl + 'api/users/register', {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        username,
        password
    })
    }).then(response => response.json())
    .then(result => {
        console.log(result);
        setToken(result.token);
        localStorage.setItem('token', result.token)
        return result;
    })
    .catch(console.error);
}

async function login(username, password, setToken)
{
    fetch(BaseUrl + 'api/users/login', {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        username,
        password
    })
    }).then(response => response.json())
    .then(result => {
        console.log(result);
        setToken(result.token);
        localStorage.setItem('token', result.token);
        return result.token;
    })
    .catch(console.error);
}

function getUser(token)
{
    fetch(BaseUrl + 'api/users/me', {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    },
    }).then(response => response.json())
    .then(result => {
        console.log(result);
        return result;
    })
    .catch(console.error);
}

function getRoutinesByUser(user, token)
{
    fetch(BaseUrl + 'api/users/'+ user + '/routines', {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    },
    }).then(response => response.json())
    .then(result => {
        console.log(result);
        return result;
    })
    .catch(console.error);
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

function getRoutines()
{
    fetch(BaseUrl + 'api/routines', {
    headers: {
        'Content-Type': 'application/json',
    },
    }).then(response => response.json())
    .then(result => {
        console.log(result);
        return result;
    })
    .catch(console.error);
}

function postRoutine(token, name, goal, isPublic)
{
    fetch(BaseUrl+ 'api/routines', {
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
    }).then(response => response.json())
    .then(result => {
        console.log(result);
        return result;
    })
    .catch(console.error);
}

function deleteRoutine(token, routineId)
{
    fetch(BaseUrl + 'api/routines/' + routineId, {
    method: "DELETE",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    },
    }).then(response => response.json())
    .then(result => {
        console.log(result);
        return result;
    })
    .catch(console.error);
}

function attachActivity(routineId, activityId, count, duration)
{
    fetch(BaseUrl + 'api/routines/'+ routineId + '/activities', {
    method: "POST",
    body: JSON.stringify({
        activityId,
        count, 
        duration
    })
    }).then(response => response.json())
    .then(result => {
        console.log(result);
        return result;
    })
    .catch(console.error);
}

function editRoutineActivity(token, routineActivityId, count, duration)
{
    fetch(BaseUrl + 'api/routine_activities/' + routineActivityId, {
    method: "PATCH",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
        count,
        duration
    })
    }).then(response => response.json())
    .then(result => {
        console.log(result);
        return result;
    })
    .catch(console.error);
}

function deleteRoutineActivity(token, routineActivityId)
{
    fetch(BaseUrl + 'routine_activities/'+ routineActivityId, {
    method: "DELETE",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
    }).then(response => response.json())
    .then(result => {
        console.log(result);
        return result;
    })
    .catch(console.error);
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
        deleteRoutine, 
        attachActivity,
        editRoutineActivity, 
        deleteRoutineActivity};





