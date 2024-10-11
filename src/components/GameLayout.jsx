import React, { useContext, useState, useEffect } from "react";
import Tablero from "./Tablero";
import CartaFigura from "./CartaFigura";
import CartaMovimiento from "./CartaMovimiento";
import Jugador from "./Jugador";
import "./GameLayout.css";
import { AppContext } from "../App.jsx";
import { GET, httpRequest } from "../services/HTTPServices";



function GameLayout() {
  const { socketId, lastMessage } = useContext(AppContext);
  const [boardState, setBoardState] = useState([]);
  const [playerNames, setPlayerNames] = useState([]);
  const [playerColors, setPlayerColors] = useState({});
  const [playerFCards, setPlayerFCards] = useState({});
  const [playerMCards, setPlayerMCards] = useState({});


  useEffect(() => {
    getGameState();
  }, [lastMessage]);

  async function getGameState() {
    const requestData = {
      method: GET,
      service: `game_state?socket_id=${socketId}`,
    };

    const response = await httpRequest(requestData);
    setBoardState(response.json.board);
    setPlayerNames(response.json.player_names);
    setPlayerColors(response.json.player_colors);
  }

  const jugadorActual = {
    nombre: "Jasds",
    figuras: [{ id: 1 }, { id: 2 }, { id: 3 }],
    movimientos: [{ id: 1 }, { id: 2 }, { id: 3 }],
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
          <button className="leave-button">
            <img src="salir.png" alt="Abandonar Partida" className="button-icon" />
          </button>
        </div>
      </div>
      <div className="players">
        <Jugador playerNames={playerNames} playerColors={playerColors} />
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