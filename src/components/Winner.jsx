import React from 'react';
import "./Winner.css";
import { useLocation } from 'wouter';

// This component cannot have hooks
// because of the conditional rendering in GameLayout.jsx

function Winner({ winnerName }) {

  const [, navigate] = useLocation();

  return (
    <div className="container-winner" >
      <h1>
        ¡{winnerName} ganó la partida!
      </h1>
      <button className='return-button' onClick={() => {
        navigate("/ListaPartidas");
      }} >
        <img src="return.png" alt="Volver" className="button-icon" />
      </button>
    </div>
  );
}

export default Winner;
