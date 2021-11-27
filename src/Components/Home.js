import React, {useState, useEffect} from "react";
import { getUser } from "../apiCalls";

const Home = ({token}) => {
    const [username, setUsername] = useState('');

    useEffect(async () => {
        const result = await getUser(token);

        setUsername(result.username);
    }, [token])
    return (
        <h1>Welcome {username? username : 'Stranger'}</h1>
    )
}

export default Home;