import React, { useContext } from "react";
import Ficha from "./Ficha";
import "./Tablero.css";

function Tablero() {
  const fichas = Array.from({ length: 36 }, (v, i) => ({
    id: i,
    color: ["blue", "red", "green", "yellow"][i % 4],
  }));

  return (
    <div className="tablero">
      {fichas.map(({ id, x, y }) => (
        <Ficha key={id} id={id} x={x} y={y} />
      ))}
    </div>
  );
}

export default Tablero;
