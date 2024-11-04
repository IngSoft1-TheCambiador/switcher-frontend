import React, { useContext, useState, useEffect } from "react";
import Tablero from "./Tablero";
import BotonTurno from "./BotonTurno.jsx";
import BotonAbandonar from "./BotonAbandonar.jsx";
import BotonDeshacer from "./BotonDeshacer.jsx";
import { CartaFiguraPropia } from "./CartaFigura";
import { CartaMovimientoPropia, calculatePositions } from "./CartaMovimiento";
import CartasRestantes from "./CartasRestantes.jsx";
import Jugador from "./Jugador";
import Winner from "./Winner";
import "./GameLayout.css";
import { useLocation } from 'wouter';
import { AppContext } from "../App.jsx";
import { GET, POST, PUT, httpRequest } from "../services/HTTPServices";



function GameLayout() {
  const { socketId, lastMessage, clientId, gameId } = useContext(AppContext);
  const [winner, setWinner] = useState("");
  const [boardState, setBoardState] = useState([]);
  const [playerNames, setPlayerNames] = useState([]);
  const [playerColors, setPlayerColors] = useState({});
  const [playerFCards_id, setPlayerFCards_id] = useState({});
  const [playerFCards_type, setPlayerFCards_type] = useState({});
  const [playersCantFCards, setPlayersCantFCards] = useState({});
  const [initialFiguresCount, setInitialFiguresCount] = useState({});
  const [playerMCards, setPlayerMCards] = useState({});
  const [playersUsedM, setPlayersUsedM] = useState({});
  const [, navigate] = useLocation();
  const [playerIds, setPlayerIds] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(-1);
  const [selectedMov, setSelectedMov] = useState(null);
  const [selectedCell, setSelectedCell] = useState({});
  const [validPos, setValidPos] = useState([]);
  const [usedMoves, setUsedMoves] = useState([false, false, false]);
  const [cellOpacity, setCellOpacity] = useState(Array(6).fill().map(() => Array(6).fill(false)));
  const [highlightedCells, setHighlightedCells] = useState([]);
  const [selectedFCard, setSelectedFCard] = useState(null);
  const [forbiddenColor, setForbiddenColor] = useState("");

  useEffect(() => {
    if (lastMessage.data.includes("GAME_ENDED")) {
      const splitMsg = lastMessage.data.split(' ');
      setWinner(splitMsg[1]);
    } else if (lastMessage.data.includes("PARTIAL_MOVE")) {
      const params = lastMessage.data.split(" ");
      setMoves(params[1], params[2]);
      getGameState();
    } else if (lastMessage.data.includes("PARTIAL MOVES WERE DISCARDED")) {
      getGameState();
      resetPlayersUsedMoves();
    } else {
      getGameState();
    }
  }, [lastMessage]);

  function setMoves(player_id, card_id) {
    var usedM = playersUsedM;
    usedM[player_id][card_id] = true;
    setPlayersUsedM(usedM);
  }

  async function getGameState() {
    const requestData = {
      method: GET,
      service: `game_state?socket_id=${socketId}`,
    };

    const response = await httpRequest(requestData);

    if (response.json.player_names.length === 1) {
      console.log("QUEDA 1 JUGADOR");
      setWinner(response.json.player_names[0]);
    }
    else {
      setBoardState(response.json.actual_board);
      setPlayerNames(response.json.player_names);
      setPlayerColors(response.json.player_colors);
      const playerCantFCards = Object.fromEntries(
        Object.entries(response.json.player_f_cards).map(([key, value]) => [
          key,
          value.length,
        ])
      );
      setPlayersCantFCards(playerCantFCards);
      if (Object.keys(initialFiguresCount).length === 0) {
        setInitialFiguresCount(playerCantFCards);
      }
      setPlayerFCards_id(response.json.player_f_hand_ids);
      setPlayerFCards_type(response.json.player_f_hand);
      setPlayerMCards(response.json.player_m_cards);
      setPlayerIds(response.json.player_ids);
      setCurrentPlayer(response.json.current_player);
      setHighlightedCells(response.json.highlighted_squares);
      if (Object.keys(playersUsedM).length === 0) {
        setPlayersUsedM(
          Object.fromEntries(
            Object.entries(response.json.player_m_cards).map(([key, value]) => [
              key,
              value.map(() => false)
            ])
          )
        );
      }
      setForbiddenColor(response.json.forbidden_color);
      console.log("CURRENT PLAYER: ", response.json.current_player);
    }
  }

  const jugadorActual = {
    nombre: playerNames[clientId],
    figuras: playerFCards_id[clientId] || [],
    movimientos: playerMCards[clientId] || [],
    cantFiguras: playersCantFCards[clientId] || 0,
  };
  const { figuras, movimientos, cantFiguras } = jugadorActual;

  async function makePartialMove(x, y) {
    const requestData = {
      method: POST,
      service: `partial_move?game_id=${gameId}&player_id=${clientId}&mov=${selectedMov}&a=${selectedCell.x}&b=${selectedCell.y}&x=${x}&y=${y}`,
    };

    const response = await httpRequest(requestData);
    setBoardState(response.json.actual_board);

    // hide the card
    var usedM = usedMoves;
    usedM[selectedMov] = true;
    setUsedMoves(usedM);

    setSelectedMov(null);
    setSelectedCell({});
    setValidPos([]);
  }

  function selectMov(mov, i) {
    validPos.map(pos => updateCellOpacity(pos[0], pos[1], false));
    if (currentPlayer == clientId && !usedMoves[i]) {
      if (i == selectedMov || selectedFCard != null) {
        setSelectedCell({});
        setSelectedMov(null);
      } else {
        setSelectedMov(i);
      }
    }
  };

  function selectFigure(i) {
    if (currentPlayer == clientId) {
      if (i === selectedFCard || selectedMov != null) {
        setSelectedFCard(null);
      } else {
        setSelectedFCard(i);
      }
    }
  }

  async function claimFigure(x, y) {

    // get the usedMoves str code for the endpoint to use
    const moves_to_remove = [];

    for (let i = 0; i < usedMoves.length; i++) {
      if (usedMoves[i]) {
        moves_to_remove.push(movimientos[i]);
      }
    }

    const requestData = {
      method: PUT,
      service: `claim_figure?game_id=${gameId}&player_id=${clientId}&fig_id=${figuras[selectedFCard]}&used_movs=${moves_to_remove}&x=${x}&y=${y}`,
    }

    const response = await httpRequest(requestData);

    if (response.json.response_status != 0){
      console.log(response.json.message);
    }
    else {
      setBoardState(response.json.true_board);
      setUsedMoves([false, false, false]);
    }



    setSelectedFCard(null);
    setSelectedCell({});
  }

  const updateCellOpacity = (row, col, value) => {
    setCellOpacity(prevOpacity => {
      const newOpacity = prevOpacity.map(row => [...row]);
      newOpacity[row][col] = value;
      return newOpacity;
    });
  };

  useEffect(() => {
    validPos.map(pos => updateCellOpacity(pos[0], pos[1], true));
  }, [validPos]);

  function selectCell(x, y) {
    if (selectedCell.x != undefined) {
      if (selectedCell.x == x && selectedCell.y == y) {
        validPos.map(pos => updateCellOpacity(pos[0], pos[1], false));
        setSelectedCell({});
      }
      else if (validPos.some(p => p[0] == x && p[1] == y)) {
        validPos.map(pos => updateCellOpacity(pos[0], pos[1], false));
        makePartialMove(x, y);
      }
    } else if (selectedMov != null) {
      setSelectedCell({ x: x, y: y });
      setValidPos(calculatePositions(movimientos[selectedMov], x, y));
    } else if (selectedFCard != null && clientId === currentPlayer) {
      claimFigure(x, y);
    }
  }


  const resetPlayersUsedMoves = () => {
    setUsedMoves([false, false, false]);

    setPlayersUsedM(prevState => {
      const newState = { ...prevState };
      Object.keys(newState).forEach(playerId => {
        newState[playerId] = newState[playerId].map(() => false);
      });
      return newState;
    });
  };

  async function resetUsedMoves() {
    const requestData = {
      method: POST,
      service: `undo_moves?game_id=${gameId}`,
    };

    const response = await httpRequest(requestData);
    if (response.ok) {
      setBoardState(response.json.true_board);
    } else {
      console.error("Error al deshacer movimientos:", response);
    }

  };


  if (winner != "") {
    return (<Winner winnerName={winner} />);
  };

  return (
    <div className="layout">
      <div className="board-side">
        <div className="bar">
          <CartasRestantes cantidad={cantFiguras} />

          <CartaFiguraPropia FCardsType={playerFCards_type[clientId] || []} selectedFCard={selectedFCard} setSelectedFCard={(i) => selectFigure(i)} />
          <div className="turn-symbol-container">
            {(currentPlayer === clientId) &&
              <img src="hourglass.svg" alt="hourglass" className="turn-symbol" />
            }
          </div>
        </div>
        <div style={{ justifySelf: "center", alignSelf: "center" }} >
          <Tablero boardState={boardState} setSelectedCell={(x, y) => selectCell(x, y)} cellOpacity={cellOpacity} highlightedCells={highlightedCells} forbiddenColor={forbiddenColor} />
        </div>
        <div className="bar bar-movements">
          <div className="button-container">
            <BotonTurno resetUsedMoves={resetUsedMoves} setSelectedMov={setSelectedMov} setSelectedCell={setSelectedCell} setValidPos={setValidPos}
              setSelectedFCard={setSelectedFCard} validPos={validPos} updateCellOpacity={updateCellOpacity} />

            {(currentPlayer === clientId) &&
              <BotonDeshacer setBoardState={setBoardState} />}
          </div>
          <CartaMovimientoPropia movimientos={movimientos} selectedMov={selectedMov} setSelectedMov={(mov, i) => selectMov(mov, i)} used={usedMoves} />
          <BotonAbandonar resetUsedMoves={resetUsedMoves} />
        </div>
      </div>
      <div className="players">
        <Jugador playerNames={playerNames} playerColors={playerColors} playerShapes={playerFCards_type} playerMovements={playerMCards} playersUsedMovs={playersUsedM} currentPlayer={currentPlayer} playerShapeCount={playersCantFCards} initialFiguresCount={initialFiguresCount} />
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
