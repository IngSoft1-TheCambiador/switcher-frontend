import React, { useState } from "react";
import './WaitRoom.css'
import { useLocation } from 'wouter';

function WaitRoom({players_data}){
    const [, navigate] = useLocation();
    const [ready, setReady] = useState(false);

    // hardcodeado para testear
    const id = 23;
    const owner_id = 23;

    // hardcodeado para testear
    const game_data = {
        "min_players": 2,
        "max_players": 4,
    }

    function handleClick(){
        if (ready) {
            // placeholder
            navigate("/");
        }
    }

    function handleOnMouseEnter(){
        if ((game_data.min_players <= players_data.length) && (players_data.length <= game_data.max_players)) {
            setReady(true);
        } else {
            setReady(false);
        }
    }
    
    return(
    <div className="waitroom-layout">
        <div className="room-name">
            NOMBRE PARTIDA
            <div className="room-setting">de 3 a 4 jugadores</div>
        </div>
        <div className="players-layout">
            <h2>JUGADORES</h2>
            <div>
                {players_data.map((player_name, id) => (
                    <li key={id} className="player">
                        {player_name}
                    </li>
                ))}
            </div>
            {(id == owner_id) && 
                <button onMouseEnter={handleOnMouseEnter} onClick={handleClick} className={(ready) ? "can-start" : "cant-start"}>EMPEZAR PARTIDA</button>
            };
        </div>
    </div>
    )
}

export default WaitRoom;