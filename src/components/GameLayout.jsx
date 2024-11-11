import React, { useContext, useState, useEffect } from "react";
import Tablero from "./Tablero";
import BotonTurno from "./BotonTurno.jsx";
import BotonAbandonar from "./BotonAbandonar.jsx";
import BotonDeshacer from "./BotonDeshacer.jsx";
import { CartaFigura } from "./CartaFigura";
import { CartaMovimientoPropia, calculatePositions } from "./CartaMovimiento";
import CartasRestantes from "./CartasRestantes.jsx";
import Jugador from "./Jugador";
import Winner from "./Winner";
import Chat from "./Chat.jsx";
import "./GameLayout.css";
import { useLocation } from 'wouter';
import { AppContext } from "../App.jsx";
import { GET, POST, PUT, httpRequest } from "../services/HTTPServices";
import Timer from "./Timer.jsx";

function GameLayout() {
  const { socketId, lastMessage, clientId, gameId, seconds, setSeconds } = useContext(AppContext);
  const [winner, setWinner] = useState(() => {
    const saved = sessionStorage.getItem("winner");
    return saved ? saved : "";
  });
  const [boardState, setBoardState] = useState("");
  const [playerNames, setPlayerNames] = useState([]);
  const [playerColors, setPlayerColors] = useState({});
  const [playerFCards_id, setPlayerFCards_id] = useState({});
  const [playerFCards_type, setPlayerFCards_type] = useState({});
  const [playerFCards_blocked, setPlayerFCards_blocked] = useState({});
  const [playersCantFCards, setPlayersCantFCards] = useState({});
  const [initialFiguresCount, setInitialFiguresCount] = useState({});
  const [playerMCards, setPlayerMCards] = useState({});
  const [playersUsedM, setPlayersUsedM] = useState({});
  const [, navigate] = useLocation();
  const [playerIds, setPlayerIds] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(() => {
    const savedPlayer = parseInt(sessionStorage.getItem("currentPlayer"));
    return savedPlayer ? savedPlayer : -1;
  });
  const [selectedMov, setSelectedMov] = useState(null);
  const [selectedCell, setSelectedCell] = useState({});
  const [validPos, setValidPos] = useState([]);
  const [usedMoves, setUsedMoves] = useState(() => {
    const saved = sessionStorage.getItem("usedMoves");
    console.log("LOS MOVIMIENTOS SE GUARDAN ASI: ", saved);
    return saved ? saved.split(',').map((s) => { return !(s === 'false') }) : [false, false, false];
  });
  const [cellOpacity, setCellOpacity] = useState(Array(6).fill().map(() => Array(6).fill(false)));
  const [highlightedCells, setHighlightedCells] = useState([]);
  const [selectedFCard, setSelectedFCard] = useState({});
  const [forbiddenColor, setForbiddenColor] = useState("");

  async function onFocus() {
    const requestData = {
      method: GET,
      service: `get_current_time?game_id=${gameId}`,
    };

    const response = await httpRequest(requestData);
    setSeconds(response.json.current_time);
  };

  useEffect(() => {
    window.addEventListener("focus", onFocus);
  }, []);

  useEffect(() => {
    if (lastMessage && lastMessage.data) {
      if (lastMessage.data.includes("GAME_ENDED")) {
        const splitMsg = lastMessage.data.split(' ');
        const name = sessionStorage.getItem("playerName");
        sessionStorage.clear();
        sessionStorage.setItem("playerName", name);
        setWinner(splitMsg[1]);
        sessionStorage.setItem("winner", splitMsg[1]);
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

    if (response.json && response.json.error) {
      console.log("ERRRO EL ID DEL SOCKET NO ESTA EN LA LISTA");
    } else {
      if (response.json && response.json.player_names && response.json.player_names.length === 1) {
        console.log("QUEDA 1 JUGADOR");
        const name = sessionStorage.getItem("playerName");
        sessionStorage.clear();
        sessionStorage.setItem("playerName", name);
        setWinner(response.json.player_names[0]);
        sessionStorage.setItem("winner", response.json.player_names[0]);
      } else if (response.json) {

        if (response.json.current_player !== undefined && currentPlayer !== response.json.current_player) {
          console.log("REINICIANDO TURNO");
          console.log("CURRENTP BACK ", response.json.current_player);
          console.log("CURRENTP STORAGE", currentPlayer)
          setSeconds(120);
          setSelectedMov(null);
          setSelectedCell({});
          setSelectedFCard({});
          validPos.map(pos => updateCellOpacity(pos[0], pos[1], false));
          setValidPos([]);
          resetUsedMoves();
        }
        if (response.json.actual_board) {
          setBoardState(response.json.actual_board);
          console.log("Board state updated from server:", response.json.actual_board);
        }
        setPlayerNames(response.json.player_names || []);
        setPlayerColors(response.json.player_colors || {});
        const playerCantFCards = Object.fromEntries(
          Object.entries(response.json.player_f_cards || {}).map(([key, value]) => [
            key,
            value.length,
          ])
        );
        setPlayersCantFCards(playerCantFCards);
        if (Object.keys(initialFiguresCount).length === 0) {
          setInitialFiguresCount(playerCantFCards);
        }
        setPlayerFCards_id(response.json.player_f_hand_ids || {});
        setPlayerFCards_type(response.json.player_f_hand || {});
        setPlayerFCards_blocked(response.json.player_f_hand_blocked || {});
        setPlayerMCards(response.json.player_m_cards || {});
        setPlayerIds(response.json.player_ids || []);
        setCurrentPlayer(response.json.current_player || -1);
        sessionStorage.setItem("currentPlayer", response.json.current_player || -1);
        setHighlightedCells(response.json.highlighted_squares || []);
        if (Object.keys(playersUsedM).length === 0) {
          setPlayersUsedM(
            Object.fromEntries(
              Object.entries(response.json.player_m_cards || {}).map(([key, value]) => [
                key,
                value.map(() => false)
              ])
            )
          );
        }
        setForbiddenColor(response.json.forbidden_color || "");
      }
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
    if (response.json.actual_board) {
      setBoardState(response.json.actual_board);
      console.log("Board state updated after partial move:", response.json.actual_board);
    }

    // hide the card
    var usedM = usedMoves;
    usedM[selectedMov] = true;
    setUsedMoves(usedM);
    sessionStorage.setItem("usedMoves", usedM.toString());
    setSelectedMov(null);
    setSelectedCell({});
    setValidPos([]);
  }

  function selectMov(mov, i) {
    validPos.map(pos => updateCellOpacity(pos[0], pos[1], false));
    if (currentPlayer == clientId && !usedMoves[i]) {
      if (i == selectedMov || selectedFCard.player_id != undefined) {
        setSelectedCell({});
        setSelectedMov(null);
      } else {
        setSelectedMov(i);
      }
    }
  };

  function selectFigure(player_id, i) {
    if (currentPlayer == clientId) {
      if (i === selectedFCard.index || selectedMov != null) {
        setSelectedFCard({});
      } else {
        setSelectedFCard({ player_id: player_id, index: i });
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
      service: `claim_figure?game_id=${gameId}&player_id=${clientId}&fig_id=${figuras[selectedFCard.index]}&used_movs=${moves_to_remove}&x=${x}&y=${y}`,
    }

    const response = await httpRequest(requestData);

    if (response.json.response_status != 0) {
      console.log(response.json.message);
    }
    else {
      if (response.json.true_board) {
        setBoardState(response.json.true_board);
        console.log("Board state updated after claiming figure:", response.json.true_board);
      }
      setUsedMoves([false, false, false]);
      sessionStorage.setItem("usedMoves", [false, false, false].toString());
    }

    setSelectedFCard({});
    setSelectedCell({});
  }

  async function blockFigure(x, y) {

    // get the usedMoves str code for the endpoint to use
    const moves_to_remove = [];

    for (let i = 0; i < usedMoves.length; i++) {
      if (usedMoves[i]) {
        moves_to_remove.push(movimientos[i]);
      }
    }

    const requestData = {
      method: PUT,
      service: `block_figure?game_id=${gameId}&player_id=${clientId}&fig_id=${playerFCards_id[selectedFCard.player_id][selectedFCard.index]}&used_movs=${moves_to_remove}&x=${x}&y=${y}`,
    }

    const response = await httpRequest(requestData);

    if (response.json.response_status != 0) {
      console.log(response.json.message);
    }
    else {
      setBoardState(response.json.true_board);
      setUsedMoves([false, false, false]);
    }

    setSelectedFCard({});
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
    } else if (selectedFCard.player_id != undefined) {
      if (selectedFCard.player_id == clientId) {
        claimFigure(x, y);
      } else {
        blockFigure(x, y);
      }
    }
  }

  const resetPlayersUsedMoves = () => {
    setUsedMoves([false, false, false]);
    sessionStorage.setItem("usedMoves", [false, false, false].toString());
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
    if (response.ok && response.json.true_board) {
      setBoardState(response.json.true_board);
      console.log("Board state updated after undoing moves:", response.json.true_board);
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
          <CartaFigura FCardsType={playerFCards_type[clientId] || []}
            selectedFCard={selectedFCard.player_id == clientId ? selectedFCard.index : null}
            setSelectedFCard={(i) => selectFigure(clientId, i)}
            currentPlayer={currentPlayer} FCardsBlocked={playerFCards_blocked[clientId]} />
          <Timer seconds={seconds} setSeconds={setSeconds}></Timer>
        </div>
        <div style={{ justifySelf: "center", alignSelf: "center" }} >
          <Tablero boardState={boardState} setSelectedCell={(x, y) => selectCell(x, y)}
            cellOpacity={cellOpacity} highlightedCells={highlightedCells} forbiddenColor={forbiddenColor} />
        </div>
        <div className="bar bar-movements">
          <div className="button-container">
            <BotonTurno resetUsedMoves={resetUsedMoves} setSelectedMov={setSelectedMov}
              setSelectedCell={setSelectedCell} setValidPos={setValidPos}
              setSelectedFCard={setSelectedFCard} validPos={validPos} updateCellOpacity={updateCellOpacity} />

            {(currentPlayer === clientId) &&
              <BotonDeshacer setBoardState={setBoardState} />}
          </div>
          <CartaMovimientoPropia movimientos={movimientos} selectedMov={selectedMov}
            setSelectedMov={(mov, i) => selectMov(mov, i)} used={usedMoves} currentPlayer={currentPlayer} />
          <BotonAbandonar resetUsedMoves={resetUsedMoves} />
        </div>
      </div>
      <div className="players">
        <Jugador playerNames={playerNames} playerColors={playerColors}
          playerShapes={playerFCards_type} playerMovements={playerMCards} playersUsedMovs={playersUsedM}
          currentPlayer={currentPlayer} playerShapeCount={playersCantFCards} initialFiguresCount={initialFiguresCount}
          selectedFCard={selectedFCard} setSelectedFCard={(player_id, i) => selectFigure(player_id, i)}
          FCardsBlocked={playerFCards_blocked} />
      </div>

      <div className="chat">
        <Chat />
      </div>

    </div>
  );
}

export default GameLayout;