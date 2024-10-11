import React, { useState, useContext, useEffect } from "react";
import Ficha from "./Ficha";
import "./Tablero.css";
import { AppContext } from "../App.jsx";
import { GET, httpRequest } from "../services/HTTPServices";


const BOARD_SIZE = 6;

function Tablero() {
  const { socketId, lastMessage } = useContext(AppContext);
  const [fichas, setFichas] = useState([]);

  useEffect(() => {
    getGameState();
  }, [lastMessage]);

  async function getGameState() {
    const requestData = {
      method: GET,
      service: `game_state?socket_id=${socketId}`,
    };

    const response = await httpRequest(requestData);

    if (response.json.board !== undefined) {
      const board = response.json.board;
      const newFichas = [];

      for (let i = 0; i < board.length; i++) {
        const color = board[i];
        const x = Math.floor(i / BOARD_SIZE);
        const y = i % BOARD_SIZE;
        newFichas.push({ id: i, color: color, x: x, y: y });
      }

      setFichas(newFichas);
    }
  }

  return (
    <div className="tablero">
      {fichas.map(({ id, x, y, color }) => (
        <Ficha key={id} id={id} x={x} y={y} color={color} />
      ))}
    </div>
  );
}

export default Tablero;

