import React, { useContext } from "react";
import CartaFigura from "./CartaFigura";
import "./Jugador.css";

function Jugador() {
  const jugadores  = [
    {
      nombre: "Jugador 1",
      color: "blue",
      figuras: ["s6", "h18", "s2", "s3"],
    },
    {
      nombre: "Jugador 2",
      color: "red",
      figuras: ["s3", "s3"],
    },
    {
      nombre: "Jugador 3",
      color: "green",
      figuras: ["s6", "h10", "s2"],
    },
  ];
  return (
    <div className="jugadores">
      {jugadores.map((jugador, index) => (
        <div key={index} className="jugador" style={{ backgroundColor: jugador.color }}>
          <h3>{jugador.nombre}</h3>
          <CartaFigura figuras={jugador.figuras} />
        </div>
      ))}
    </div>
  );
}

export default Jugador;