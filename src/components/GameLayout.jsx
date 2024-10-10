import React, { useContext } from "react";
import Tablero from "./Tablero";
import CartaFigura from "./CartaFigura";
import CartaMovimiento from "./CartaMovimiento";
import Jugador from "./Jugador";
import "./GameLayout.css";

function GameLayout() {
  const jugadorActual = {
    nombre: "Jasds",
    figuras: ["h1", "h8", "s2"],
    movimientos: ["mov3", "mov7", "mov1"],
  };
  const { figuras, movimientos } = jugadorActual;

  return (
    <div className="layout">
      <div className="board-side">
        <div className="bar">
          <CartaFigura figuras={figuras} />
        </div>
        <div style={{ justifySelf: "center", alignSelf: "center" }}>
          <Tablero />
        </div>
        <div className="bar bar-movements">
          <button className="turn-button">
            <img src="siguiente.png" alt="Pasar Turno" className="button-icon" />
          </button>
          <CartaMovimiento movimientos={movimientos} />
          <button className="leave-button">
            <img src="salir.png" alt="Abandonar Partida" className="button-icon" /> 
          </button>
        </div>
      </div>
      <div className="players">
        <Jugador />
      </div>

      {/*
        chat, si queres ponerlo, en el css en el grid template, en vez de "grid-template-columns: auto 25vw;" pone "grid-template-columns: auto 25vw 20vw;", el 20vw seria
        la 3er columna (correspondiente al chat)

        <div className="chat">
            chat
            <input type="text" placeholder="Type something">
            </input>
        </div>
      */}
    </div>
  );
}

export default GameLayout;