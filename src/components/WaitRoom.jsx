import React, { useContext, useState, useEffect } from "react";
import './WaitRoom.css'
import { useLocation } from 'wouter';
import { AppContext } from "../App.jsx";
import { GET, POST, PUT, httpRequest } from '../services/HTTPServices.jsx';

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
        if (lastMessage && lastMessage.data.includes("GAME CANCELLED BY OWNER") && ownerId !== clientId){
            const name = sessionStorage.getItem("playerName");
            sessionStorage.clear();
            sessionStorage.setItem("playerName", name);
            navigate("/ListaPartidas");
        } else {
            getGameState();
        }
    }, [lastMessage]);

    async function getGameState() {
        const requestData = {
            "method": GET,
            "service": `game_state?socket_id=${socketId}`
        };

        const response = await httpRequest(requestData);
        if (response.json.response_status == 0) {
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

    async function leaveGame() {
        const requestData = {
            "method": POST,
            "service": `leave_game?socket_id=${socketId}&game_id=${gameId}&player_id=${clientId}`
        };
        const response = await httpRequest(requestData);
        if (response.json.message.startsWith("Succesfully removed player")) {
            //const name = sessionStorage.getItem("playerName");
            //sessionStorage.clear();
            //sessionStorage.setItem("playerName", name);
            navigate("/ListaPartidas");
        }
    }

    async function startGame() {
        const requestData = {
            "method": PUT,
            "service": `start_game?game_id=${gameId}`
        };
        const response = await httpRequest(requestData);
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
                <h2>Jugadores</h2>
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
                <button className="leave-waitroom" onClick={leaveGame}>
                    <img src="salir.png" alt="Abandonar Partida" className="leave-waitroom-img"/>
                </button>
            </div>
        </div>
    )
}

export default WaitRoom;