import React, { useState, useContext, useEffect } from "react";
import Ficha from "./Ficha";
import "./Tablero.css";
import { AppContext } from "../App.jsx";
import { GET, httpRequest } from "../services/HTTPServices";


const BOARD_SIZE = 6;

function Tablero({ boardState, setSelectedCell }) {
  const fichas = [];

  for (let i = 0; i < boardState.length; i++) {
    const color = boardState[i];
    const x = Math.floor(i / BOARD_SIZE);
    const y = i % BOARD_SIZE;
    fichas.push({ id: i, color: color, x: x, y: y });
  }

  return (
    <div className="tablero">
      {fichas.map(({ id, x, y, color }) => (
        <Ficha key={id} id={id} x={x} y={y} color={color} setSelectedCell={setSelectedCell} />
      ))}
    </div>
  );
}

export default Tablero;

