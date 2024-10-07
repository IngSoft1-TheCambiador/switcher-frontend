import React, { useContext } from "react";
import CartaFigura from "./CartaFigura";
import "./Jugador.css";

function Jugador() {
  const jugadores  = [
    {
      nombre: "Jugador 1",
      color: "blue",
      figuras: [{ id: 2 }, { id: 3 }, { id: 3 }],
    },
    {
      nombre: "Jugador 2",
      color: "red",
      figuras: [{ id: 1 }, { id: 2 }, { id: 2 }],
    },
    {
      nombre: "Jugador 3",
      color: "green",
      figuras: [{ id: 2 }, { id: 1 }, { id: 24 }],
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