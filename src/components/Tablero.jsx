import React, { useContext } from "react";
import Ficha from "./Ficha";
import "./Tablero.css";
import { AppContext } from "../contexts/Context";

function Tablero() {
  const { game } = useContext(AppContext);
  const fichas = game.fichas;

  return (
    <div className="tablero">
      {fichas.map(({ id, x, y }) => (
        <Ficha key={id} id={id} x={x} y={y} />
      ))}
    </div>
  );
}

export default Tablero;
