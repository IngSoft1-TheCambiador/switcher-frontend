// src/components/BotonDeshacer.jsx
import { POST, httpRequest } from "../services/HTTPServices";
import { AppContext } from "../App.jsx";
import React, { useContext } from "react";

function BotonDeshacer({ setBoardState }) {
  const { gameId } = useContext(AppContext);

  async function handleUndoMoves() {
    const requestData = {
      method: POST,
      service: `undo_moves?game_id=${gameId}`,
    };

    const response = await httpRequest(requestData);
    if (response.ok) {
      setBoardState(response.json.true_board);
    } else {
      console.error("Error al deshacer movimientos:", response);
    }
  }

  return (
    <button className="boton-deshacer" onClick={handleUndoMoves}>
      Deshacer Movimientos
    </button>
  );
}

export default BotonDeshacer;