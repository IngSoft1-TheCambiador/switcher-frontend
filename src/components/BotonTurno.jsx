import { PUT, httpRequest } from "../services/HTTPServices";
import { AppContext } from "../App.jsx";
import React, { useContext } from "react";


function BotonTurno() {

    const { gameId, clientId } = useContext(AppContext);

    async function handleTurnSkip() {
        const requestData = {
            method: PUT,
            service: `skip_turn?game_id=${gameId}&player_id=${clientId}`
        };

        await httpRequest(requestData);
    }

    return (
        <button className="turn-button" onClick={handleTurnSkip}>
            <img src="siguiente.png" alt="Pasar Turno" className="button-icon" />
        </button>
    );
}

export default BotonTurno;