import React from "react";
import Ficha from "./Ficha";
import "./Tablero.css";

function Tablero({ datos }) {
  return (
    <div className="tablero">
      {datos.map(({ id, x, y, color }) => (
        <Ficha key={id} id={id} x={x} y={y} color={color} />
      ))}
    </div>
  );
}

export default Tablero;
