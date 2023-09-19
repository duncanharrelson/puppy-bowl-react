import { useState, useEffect } from "react";
import { fetchAllPlayers } from "../api"

const AllPlayers = () => {
    const [players, setPlayers] = useState([]);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useState("");

    useEffect(() => {
        async function getAllPlayers() {
            const response = await fetchAllPlayers();
            if (response.success) {
                setPlayers(response.data.players);
            } else {
                setError(response.error.message);
            }
        }
        getAllPlayers();
    }, []);

    const playersToDisplay = searchParams
        ? players.filter((player) => 
            player.name.toLowerCase().includes(searchParams)
            ) 
        : players;

    return (
        <>
            <div>
                <label>
                    Search {" "}
                    <input 
                    type="text"
                    placeholder="search"
                    onChange={(e) => setSearchParams(e.target.value.toLowerCase())} 
                    />
                </label>
            </div>

            {playersToDisplay.map((player) => {
                return <h3 key={player.id}>{player.name}</h3>
            })}
        </>
    )
}

export default AllPlayers