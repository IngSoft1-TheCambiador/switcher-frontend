import React, { useContext, useState, useEffect } from "react";
import './WaitRoom.css'
import { useLocation } from 'wouter';
import { AppContext } from "../App.jsx";
import { GET, httpRequest } from '../services/HTTPServices.jsx';

function WaitRoom() {
    const [, navigate] = useLocation();
    const { lastMessage, socketId, clientId } = useContext(AppContext);
    const [ownerId, setOwnerId] = useState(0);
    const [playerNames, setPlayerNames] = useState([]);
    const [ready, setReady] = useState(false);
    const [maxPlayers, setMaxPlayers] = useState(0);
    const [minPlayers, setMinPlayers] = useState(0);
    const [name, setName] = useState('');

    useEffect(() => {
        console.log("MENSAJE WS: ", lastMessage);
        getGameState();
    }, [lastMessage]);

    async function getGameState() {
        const requestData = {
            "method": GET,
            "service": `game_state?socket_id=${socketId}`
        };

        const response = await httpRequest(requestData);
        console.log("PLAYER JOIN", response);
        console.log(response.json.player_names);
        if (response.json.player_names !== undefined) {
            console.log("OWNER_ID: ", response.json.owner_id);
            console.log("CLIENT_ID: ", clientId);
            setOwnerId(response.json.owner_id);
            setPlayerNames(response.json.player_names);
            setMaxPlayers(response.json.max_players);
            setMinPlayers(response.json.min_players);
            setName(response.json.name);
        }
    }

    function handleClick() {
        if (ready) {
            // placeholder
            navigate("/");
        }
    }

    function handleOnMouseEnter() {
        if ((minPlayers <= playerNames.length) && (playerNames.length <= maxPlayers)) {
            setReady(true);
        } else {
            setReady(false);
        }
    }

    return (
        <div className="waitroom-layout">
            <div className="room-name">
                {name}
                <div className="room-setting">
                    {(minPlayers === maxPlayers) ? `partida de ${maxPlayers} jugadores` : `partida de ${minPlayers} a ${maxPlayers} jugadores`}
                </div>
            </div>
            <div className="players-layout">
                <h2>JUGADORES</h2>
                <div>
                    {playerNames.map((player_name) => (
                        <li className="player">
                            {player_name}
                        </li>
                    ))}
                </div>
                {(clientId === ownerId) &&
                    <button onMouseEnter={handleOnMouseEnter} onClick={handleClick} className={(ready) ? "can-start" : "cant-start"}>EMPEZAR PARTIDA</button>
                }
            </div>
        </div>
    )
}

export default WaitRoom;