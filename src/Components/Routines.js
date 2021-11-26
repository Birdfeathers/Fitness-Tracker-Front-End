import React, {useState, useEffect} from "react";
import { getRoutines } from "../apiCalls";

const Routines = () => {
    const [routines, setRoutines] = useState([]);
    getRoutines(setRoutines);
    return (
    <>
        <h1>Routines</h1>
        <h1>hello</h1>
    </>
    )
}

export default Routines;