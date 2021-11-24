const BaseUrl = "https://sleepy-thicket-94945.herokuapp.com/";

function Register(username, password)
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
        return result.token;
    })
    .catch(console.error);
}

function Login(username, password)
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

function getActivities()
{
    fetch(BaseUrl + 'api/activities', {
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

function postActivity(token, name, description)
{
    fetch(BaseUrl + 'api/activities', {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
        name,
        description
    })
    }).then(response => response.json())
    .then(result => {
        console.log(result);
        return result;
    })
    .catch(console.error);
}

function editActivity(token, activityId, name, description)
{
    fetch(BaseUrl + 'api/activities/' + activityId, {
    method: "PATCH",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
        name,
        description
    })
    }).then(response => response.json())
    .then(result => {
        console.log(result);
    })
    .catch(console.error);
}

function getRoutinesByActivity(activityId)
{
    fetch(BaseUrl + 'api/activities/'+ activityId + '/routines', {
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






