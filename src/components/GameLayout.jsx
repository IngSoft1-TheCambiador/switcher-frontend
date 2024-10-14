import React, { useContext, useState, useEffect } from "react";
import Tablero from "./Tablero";
import BotonTurno from "./BotonTurno.jsx";
import BotonAbandonar from "./BotonAbandonar.jsx";
import BotonDeshacer from "./BotonDeshacer.jsx";
import CartaFigura from "./CartaFigura";
import CartaMovimiento from "./CartaMovimiento";
import Jugador from "./Jugador";
import Winner from "./Winner";
import "./GameLayout.css";
import { useLocation } from "wouter";
import { AppContext } from "../App.jsx";
import { GET, POST, httpRequest } from "../services/HTTPServices";

function GameLayout() {
  const { socketId, lastMessage, clientId, gameId } = useContext(AppContext);
  const [winner, setWinner] = useState("");
  const [boardState, setBoardState] = useState([]);
  const [playerNames, setPlayerNames] = useState([]);
  const [playerColors, setPlayerColors] = useState({});
  const [playerFCards, setPlayerFCards] = useState({});
  const [playerMCards, setPlayerMCards] = useState({});
  const [, navigate] = useLocation();
  const [playerIds, setPlayerIds] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(-1);

  useEffect(() => {
    if (lastMessage.data.includes("GAME_ENDED")) {
      const splitMsg = lastMessage.data.split(" ");
      setWinner(splitMsg[1]);
    } /*else if (lastMessage.data.includes("mensaje_de_movs_que_deshicieron")) {
      logica para manejar el mensaje
      setBoardState();
    }*/ else {
      getGameState();
    }
  }, [lastMessage]);

  async function getGameState() {
    const requestData = {
      method: GET,
      service: `game_state?socket_id=${socketId}`,
    };

    const response = await httpRequest(requestData);
    if (response.json.player_names.length === 1) {
      console.log("QUEDA 1 JUGADOR");
      setWinner(response.json.player_names[0]);
    } else {
      setBoardState(response.json.actual_board);
      setPlayerNames(response.json.player_names);
      setPlayerColors(response.json.player_colors);
      setPlayerFCards(response.json.player_f_hand);
      setPlayerMCards(response.json.player_m_cards);
      setPlayerIds(response.json.player_ids);
      setCurrentPlayer(response.json.current_player);
      console.log("CURRENT PLAYER: ", response.json.current_player);
    }
  }

  const jugadorActual = {
    nombre: playerNames[clientId],
    figuras: playerFCards[clientId] || [],
    movimientos: playerMCards[clientId] || [],
  };
  const { figuras, movimientos } = jugadorActual;

  if (winner != "") {
    console.log("winner: ", winner);
    return <Winner winnerName={winner} />;
  }

  return (
    <div className="layout">
      <div className="board-side">
        <div className="bar">
          <CartaFigura figuras={figuras} />
          <div className="turn-symbol-container">
            {currentPlayer === clientId && (
              <img
                src="hourglass.svg"
                alt="hourglass"
                className="turn-symbol"
              />
            )}
          </div>
        </div>
        <div style={{ justifySelf: "center", alignSelf: "center" }}>
          <Tablero boardState={boardState} />
        </div>
        <div className="bar bar-movements">
          <BotonTurno />
          <CartaMovimiento movimientos={movimientos} shown={true} />
          <BotonAbandonar />
          <BotonDeshacer setBoardState={setBoardState} />
        </div>
      </div>
      <div className="players">
        <Jugador
          playerNames={playerNames}
          playerColors={playerColors}
          playerShapes={playerFCards}
          playerMovements={playerMCards}
          currentPlayer={currentPlayer}
        />
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