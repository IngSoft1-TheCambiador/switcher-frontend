import React, { useContext, useState, useEffect } from "react";
import Tablero from "./Tablero";
import CartaFigura from "./CartaFigura";
import CartaMovimiento from "./CartaMovimiento";
import Jugador from "./Jugador";
import "./GameLayout.css";
import { useLocation } from 'wouter';
import { AppContext } from "../App.jsx";
import { GET, POST, httpRequest } from "../services/HTTPServices";



function GameLayout() {
  const { socketId, lastMessage, clientId, gameId } = useContext(AppContext);
  const [boardState, setBoardState] = useState([]);
  const [playerNames, setPlayerNames] = useState([]);
  const [playerColors, setPlayerColors] = useState({});
  const [playerFCards, setPlayerFCards] = useState({});
  const [playerMCards, setPlayerMCards] = useState({});
  const [, navigate] = useLocation(); 


  useEffect(() => {
    getGameState();
  }, [lastMessage]);

  async function getGameState() {
    const requestData = {
      method: GET,
      service: `game_state?socket_id=${socketId}`,
    };

    const response = await httpRequest(requestData);
    setBoardState(response.json.actual_board);
    setPlayerNames(response.json.player_names);
    setPlayerColors(response.json.player_colors);
    setPlayerFCards(response.json.player_f_hand);
    setPlayerMCards(response.json.player_m_cards);
    console.log(response.json.player_f_hand);
    console.log(response.json.player_m_cards);
  }

  async function leaveGame() {
    const requestData = {
        "method": POST,
        "service": `leave_game?game_id=${gameId}&player_name=${playerNames[clientId]}`,
    };
    const response = await httpRequest(requestData);
    if (response.ok) { 
      navigate("/ListaPartidas");
    } else {
      console.error("Error al abandonar la partida: ", response);
    }
  }


  const jugadorActual = {
    nombre: playerNames[clientId],
    figuras: playerFCards[clientId] || [],
    movimientos: playerMCards[clientId] || [],
  };
  const { figuras, movimientos } = jugadorActual;

  return (
    <div className="layout">
      <div className="board-side">
        <div className="bar">
          <CartaFigura figuras={figuras} />
        </div>
        <div style={{ justifySelf: "center", alignSelf: "center" }}>
          <Tablero boardState={boardState} />
        </div>
        <div className="bar bar-movements">
          <button className="turn-button">
            <img src="siguiente.png" alt="Pasar Turno" className="button-icon" />
          </button>
          <CartaMovimiento movimientos={movimientos} />
          <button className="leave-button" onClick={leaveGame}>
            <img src="salir.png" alt="Abandonar Partida" className="button-icon" />
          </button>
        </div>
      </div>
      <div className="players">
        <Jugador playerNames={playerNames} playerColors={playerColors} playerShapes={playerFCards} playerMovements={playerMCards}/>
      </div>

      {/*
        chat, si queres ponerlo, en el css en el grid template, en vez de "grid-template-columns: auto 25vw;" pone "grid-template-columns: auto 25vw 20vw;", el 20vw seria
        la 3er columna (correspondiente al chat)

        <div className="chat">
            chat
            <input type="text" placeholder="Type something">
            </input>
        </div>
      */}
    </div>
  );
}

export default GameLayout;
