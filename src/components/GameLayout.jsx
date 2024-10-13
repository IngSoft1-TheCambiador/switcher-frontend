import React, { useContext, useState, useEffect } from "react";
import Tablero from "./Tablero";
import BotonTurno from "./BotonTurno.jsx";
import BotonAbandonar from "./BotonAbandonar.jsx";
import CartaFigura from "./CartaFigura";
import CartaMovimiento, {calculatePositions} from "./CartaMovimiento";
import Jugador from "./Jugador";
import Winner from "./Winner";
import "./GameLayout.css";
import { useLocation } from 'wouter';
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
  const [selectedMov, setSelectedMov] = useState(null);
  const [selectedCell, setSelectedCell] = useState({});
  const [validPos, setValidPos] = useState([]);

  setSelectedCell
  useEffect(() => {
    if (lastMessage.data.includes("GAME_ENDED")) {
      const splitMsg = lastMessage.data.split(' ');
      setWinner(splitMsg[1]);
    }
    else {
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
    }
    else {
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

  async function makePartialMove(x,y) {
    const requestData = {
      method: POST,
      service: `partial_move?game_id=${gameId}&a=${selectedCell.x}&b=${selectedCell.y}&x=${x}&y=${y}`,
    };

    const response = await httpRequest(requestData);
    setBoardState(response.json.actual_board);
    setSelectedMov(null);
    setSelectedCell({});
    setValidPos([]);
  }

  function selectMov(mov,i) {
    console.log(i==selectedMov ? null : i);
    i==selectedMov ? setSelectedMov(null) : setSelectedMov(i);
  };

  function selectCell(x,y) {
    console.log("inside selectCell");
    if (selectedCell.x != undefined){
      console.log("inside if");
      console.log("pos: ", [x,y]);
      console.log("includes?: ", validPos.some(p => p[0]==x && p[1]==y));
      if (selectedCell.x==x && selectedCell.y==y){
        console.log("deseleccionada")
        setSelectedCell({});
      }
      else if (validPos.some(p => p[0]==x && p[1]==y)){
        makePartialMove(x,y);
      }
    } else if (selectedMov != null) {
      console.log("inside else");
      setSelectedCell({x:x, y:y});
      console.log("x: ",x);
      console.log("y: ",y);
      setValidPos(calculatePositions(movimientos[selectedMov],x,y));
      console.log(calculatePositions(movimientos[selectedMov],x,y));
    }
  }



  if (winner != "") {
    console.log("winner: ", winner);
    return (<Winner winnerName = {winner} />);
  };

  return (
    <div className="layout">
      <div className="board-side">
        <div className="bar">
          <CartaFigura figuras={figuras} />
          <div className="turn-symbol-container">
            {(currentPlayer === clientId) &&
              <img src="hourglass.svg" alt="hourglass" className="turn-symbol"/>
            }
          </div>
        </div>
        <div style={{ justifySelf: "center", alignSelf: "center" }} >
          <Tablero boardState={boardState} setSelectedCell={(x,y)=>selectCell(x,y)} />
        </div>
        <div className="bar bar-movements">
          <BotonTurno />
          <CartaMovimiento movimientos={movimientos} shown={true} setSelectedMov={(mov,i)=>selectMov(mov,i)} />
          <BotonAbandonar />
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
