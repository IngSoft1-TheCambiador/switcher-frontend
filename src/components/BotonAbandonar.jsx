import { POST, httpRequest } from "../services/HTTPServices";
import { AppContext } from "../App.jsx";
import React, { useContext } from "react";
import { useLocation } from 'wouter';


function BotonAbandonar() {

    const { gameId, clientId, socketId } = useContext(AppContext);
    const [, navigate] = useLocation();


    async function handleLeaveGame() {

        const requestData = {
            "method": POST,
            "service": `leave_game?socket_id=${socketId}&game_id=${gameId}&player_id=${clientId}`
        };
        const response = await httpRequest(requestData);
        if (response.ok) {
            navigate("/ListaPartidas");
        } else {
            console.error("Error al abandonar la partida: ", response);
        }
    }

    return (
        <button className="leave-button" onClick={handleLeaveGame}>
            <img src="salir.png" alt="Abandonar Partida" className="button-icon" />
        </button>
    );
}

export default BotonAbandonar;