import React, { useContext } from "react";
import Tablero from "./Tablero";
import CartaFigura from "./CartaFigura";
import CartaMovimiento from "./CartaMovimiento";
import Jugador from "./Jugador";
import "./GameLayout.css";
import { AppContext } from "../contexts/Context";

function GameLayout() {

  const { jugadorActual } = useContext(AppContext);
  const { figuras, movimientos } = jugadorActual; //Medio raro esto, tendria que ver como manejarlo mejor pero no se me ocurre
  return (
    <div className="layout">
      <div className="board-side">
        <div className="bar">
          <CartaFigura figuras={figuras} />
        </div>
        <div style={{ justifySelf: "center", alignSelf: "center" }}>
          <Tablero />
        </div>
        <div className="bar">
          <CartaMovimiento movimientos={movimientos} />
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
