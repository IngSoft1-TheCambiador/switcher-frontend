import React from 'react';
import "./Winner.css";

// This component cannot have hooks
// because of the conditional rendering in GameLayout.jsx

function Winner(winnerName, backToListaPartidas) {

  return (
    <div className="container-winner" >
      <h1>
        ¡{winnerName} ganó la partida!
      </h1>
      <button className='return-button' onClick={backToListaPartidas} >
        <img src="return.png" alt="Volver" className="button-icon" />
      </button>
    </div>
  );
}

export default Winner;
