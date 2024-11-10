import React, { useContext } from "react";
import { CartaFiguraAjena } from "./CartaFigura";
import "./Jugador.css";
import { AppContext } from "../App.jsx";
import { CartaMovimientoAjena } from "./CartaMovimiento.jsx";
import CartasRestantes from "./CartasRestantes.jsx";


function Jugador({
  playerNames, playerColors, playerShapes, playerMovements, playersUsedMovs, playerShapeCount,
  currentPlayer, selectedFCard, setSelectedFCard, FCardsBlocked
}) {

  const { clientId } = useContext(AppContext);

  function parseColor(color) {
    if (color === "r") return "#ff5757";
    else if (color === "g") return "#41d867";
    else if (color === "b") return "#38b6ff";
    else return "#f8cf31";
  }

  const jugadores = Object.keys(playerNames).filter((id) => parseInt(id) !== clientId)
    .map((id) => (
      {
        nombre: playerNames[id],
        player_id: id,
        color: parseColor(playerColors[id]),
        figuras: playerShapes[id],
        fig_bloqueadas: FCardsBlocked[id],
        movimientos: playerMovements[id],
        movUsados: playersUsedMovs[id],
        cantFiguras: playerShapeCount[id],
      }
    ));

  return (
    <div className="jugadores">
      {jugadores.map((jugador, index) => (
        <div key={index} className={parseInt(currentPlayer) === parseInt(jugador.player_id) ? "jugador-actual jugador" : "jugador"} style={{ backgroundColor: jugador.color }} >
          <div className="name-bar">
            <h3>{jugador.nombre} </h3>
          </div>
          <CartaFiguraAjena FCardsType={jugador.figuras} cantFiguras={jugador.cantFiguras}
            selectedFCard={selectedFCard.player_id == jugador.player_id ? selectedFCard.index : null}
            setSelectedFCard={(i) => setSelectedFCard(jugador.player_id, i)}
            FCardsBlocked={jugador.fig_bloqueadas} />
          <CartaMovimientoAjena movimientos={jugador.movimientos} show={jugador.movUsados} />
        </div>
      ))}
    </div>
  );
}

export default Jugador;