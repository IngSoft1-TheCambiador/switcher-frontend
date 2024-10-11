import React, { useContext, useState, useEffect } from "react";
import './WaitRoom.css'
import { useLocation } from 'wouter';
import { AppContext } from "../App.jsx";
import { GET, PUT, httpRequest } from '../services/HTTPServices.jsx';

function WaitRoom() {
    const [, navigate] = useLocation();
    const { lastMessage, socketId, clientId, gameId } = useContext(AppContext);
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
        if (response.json.player_names !== undefined) {
            console.log("OWNER_ID: ", response.json.owner_id);
            console.log("CLIENT_ID: ", clientId);
            console.log("TIPO DE DATOS: ", typeof (response.json.player_names));
            setOwnerId(response.json.owner_id);
            setPlayerNames(response.json.player_names);
            setMaxPlayers(response.json.max_players);
            setMinPlayers(response.json.min_players);
            setName(response.json.name);
            if (response.json.initialized) {
                navigate("/GameLayout");
            }
        }
    }

    async function startGame() {
        const requestData = {
            "method": PUT,
            "service": `start_game?game_id=${gameId}`
        };
        const response = await httpRequest(requestData);
        console.log("message: ", response.json.message);
    }

    function handleClick() {
        if (ready) {
            // placeholder
            startGame();
            navigate("/GameLayout");
        }
    }

    function handleOnMouseEnter() {
        if ((minPlayers <= Object.values(playerNames).length) && (Object.values(playerNames).length <= maxPlayers)) {
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
                    {Object.entries(playerNames).map(([id, player_name]) => (
                        <li className="player" key={id}>
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