import React, { useContext } from "react";
import CartaFigura from "./CartaFigura";
import "./Jugador.css";
import { AppContext } from "../App.jsx";
import CartaMovimiento from "./CartaMovimiento.jsx";


function Jugador({ playerNames, playerColors, playerShapes, playerMovements }) {
  
  const { clientId } = useContext(AppContext);

  function parseColor(color) {
    if (color === "r") return "red";
    else if (color === "g") return "green";
    else if (color === "b") return "blue";
    else return "yellow";
  }

  const jugadores = Object.keys(playerNames).filter((id) => parseInt(id) !== clientId )
    .map((id) => (
      {
        nombre: playerNames[id],
        color: parseColor(playerColors[id]),
        figuras: playerShapes[id],
        //["h3", "h1", "h10"]
        movimientos: playerMovements[id],
        //["mov1", "mov2", "mov3"]
      }
    ));

  return (
    <div className="jugadores">
      {jugadores.map((jugador, index) => (
        <div key={index} className="jugador" style={{ backgroundColor: jugador.color }}>
          <h3>{jugador.nombre}</h3>
          <CartaFigura figuras={jugador.figuras} />
          <CartaMovimiento movimientos={jugador.movimientos} />
        </div>
      ))}
    </div>
  );
}

export default Jugador;