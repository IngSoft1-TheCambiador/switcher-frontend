import React, { useContext } from "react";
import CartaFigura from "./CartaFigura";
import "./Jugador.css";
import { AppContext } from "../App.jsx";
import { CartaMovimientoAjena } from "./CartaMovimiento.jsx";


function Jugador({ playerNames, playerColors, playerShapes, playerMovements, currentPlayer }) {

  const { clientId } = useContext(AppContext);

  function parseColor(color) {
    if (color === "r") return "#EC1C24";
    else if (color === "g") return "#00A551";
    else if (color === "b") return "#00ADEE";
    else return "#FFF100";
  }

  const jugadores = Object.keys(playerNames).filter((id) => parseInt(id) !== clientId)
    .map((id) => (
      {
        nombre: playerNames[id],
        player_id: id,
        color: parseColor(playerColors[id]),
        figuras: playerShapes[id],
        movimientos: playerMovements[id],
      }
    ));

  return (
    <div className="jugadores">
      {jugadores.map((jugador, index) => (
        <div key={index} className="jugador" style={{ backgroundColor: jugador.color }} >
          {console.log("jugador: ", jugador.nombre, "id: ", jugador.player_id, "turno actual: ", currentPlayer)}
          <div className="name-bar">
            <h3>{jugador.nombre}</h3>
            {parseInt(currentPlayer) === parseInt(jugador.player_id) &&
              <img src="hourglass.svg" alt="hourglass" className="turn-symbol"/>
            }
          </div>
          <CartaFigura className={(currentPlayer === jugador.player_id) ? "current-turn" : ""} figuras={jugador.figuras} />
          <CartaMovimientoAjena movimientos={jugador.movimientos} show={[false, false, false]} />
        </div>
      ))}
    </div>
  );
}

export default Jugador;