import React, {useState, useEffect} from "react";

const CreatorPublicRoutines = ({match}) => {
    return (
        <h1>{match.params.username}</h1>
    )
}

export default CreatorPublicRoutines;