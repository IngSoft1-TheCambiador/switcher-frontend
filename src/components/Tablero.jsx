import React, { useState, useContext, useEffect } from "react";
import Ficha from "./Ficha";
import "./Tablero.css";


const BOARD_SIZE = 6;

function Tablero({ boardState, setSelectedCell, cellOpacity, highlightedCells, forbiddenColor }) {
  const fichas = [];

  for (let i = 0; i < boardState.length; i++) {
    const color = boardState[i];
    const x = Math.floor(i / BOARD_SIZE);
    const y = i % BOARD_SIZE;
    fichas.push({ id: i, color: color, x: x, y: y, isHighlighted: highlightedCells[i] });
  }

  return (
    <div className="tablero">
      {fichas.map(({ id, x, y, color, isHighlighted }) => (
        <Ficha key={id} id={id} x={x} y={y} color={color} setSelectedCell={setSelectedCell} cellOpacity={cellOpacity} isHighlighted = {isHighlighted} forbiddenColor={forbiddenColor} />
      ))}
    </div>
  );
}

export default Tablero;