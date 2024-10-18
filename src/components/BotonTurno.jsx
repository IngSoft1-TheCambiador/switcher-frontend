import { PUT, httpRequest } from "../services/HTTPServices";
import { AppContext } from "../App.jsx";
import React, { useContext } from "react";


function BotonTurno({ resetUsedMoves, setSelectedMov, setSelectedCell, setValidPos, setSelectedFCard, validPos, updateCellOpacity }) {

    const { gameId, clientId } = useContext(AppContext);

    async function handleTurnSkip() {
        const requestData = {
            method: PUT,
            service: `skip_turn?game_id=${gameId}&player_id=${clientId}`
        };

        await httpRequest(requestData);
        setSelectedMov(null);
        setSelectedCell({});
        setSelectedFCard(null);
        validPos.map(pos => updateCellOpacity(pos[0],pos[1],false));
        setValidPos([]);
        resetUsedMoves();
    }

    return (
        <button className="turn-button" onClick={handleTurnSkip}>
            <img src="siguiente.png" alt="Pasar Turno" className="button-icon" />
        </button>
    );
}

export default BotonTurno;