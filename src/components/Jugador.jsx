import React, { useContext } from "react";
import CartaFigura from "./CartaFigura";
import "./Jugador.css";
import { AppContext } from "../contexts/Context";

function Jugador() {
  const {game, setGame} = useContext(AppContext);
  const jugadores  = game.jugadores;
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