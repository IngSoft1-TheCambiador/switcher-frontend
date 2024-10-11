import React, { useContext, useState, useEffect } from "react";
import Tablero from "./Tablero";
import CartaFigura from "./CartaFigura";
import CartaMovimiento from "./CartaMovimiento";
import Jugador from "./Jugador";
import "./GameLayout.css";
import { AppContext } from "../App.jsx";
import { GET, httpRequest } from "../services/HTTPServices";



function GameLayout() {
  const { socketId, lastMessage, clientId } = useContext(AppContext);
  const [boardState, setBoardState] = useState([]);
  const [playerNames, setPlayerNames] = useState([]);
  const [playerColors, setPlayerColors] = useState({});
  const [playerFCards, setPlayerFCards] = useState({});
  const [playerMCards, setPlayerMCards] = useState({});
  const [playerIds, setPlayerIds] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(-1);


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
    setPlayerIds(response.json.player_ids);
    setCurrentPlayer(response.json.current_player);
    console.log(response.json.player_f_hand);
    console.log(response.json.player_m_cards);
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
          <div className="turn-symbol-container">
            {(currentPlayer === clientId) && 
              <img src="A.svg" alt="ola" className="turn-symbol"/>
            }
          </div>
        </div>
        <div style={{ justifySelf: "center", alignSelf: "center" }} className={(currentPlayer === clientId) ? "current-turn" : ""}>
          <Tablero boardState={boardState} />
        </div>
        <div className="bar bar-movements">
          <button className="turn-button">
            <img src="siguiente.png" alt="Pasar Turno" className="button-icon" />
          </button>
          <CartaMovimiento movimientos={movimientos} />
          <button className="leave-button">
            <img src="salir.png" alt="Abandonar Partida" className="button-icon" />
          </button>
        </div>
      </div>
      <div className="players">
        <Jugador playerNames={playerNames} playerColors={playerColors} playerShapes={playerFCards} playerMovements={playerMCards} currentPlayer={currentPlayer} />
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
