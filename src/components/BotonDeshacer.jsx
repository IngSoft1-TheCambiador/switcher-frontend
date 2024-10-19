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
    <button className="undo-button" onClick={handleUndoMoves}>
      <img src="deshacer.png" alt="Deshacer Movimientos" className="button-icon" />
    </button>
  );
}

export default BotonDeshacer;