import React from "react";
import CartaFigura from "./CartaFigura";
import "./Jugador.css";

function Jugador({ jugadores }) {
  return (
    <div className="jugadores">
      {jugadores.map((jugador, index) => (
        <div key={index} className="jugador">
          <h3>{jugador.nombre}</h3>
          <CartaFigura figuras={jugador.figuras} />
        </div>
      ))}
    </div>
  );
}

export default Jugador;
