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
      <button className='button-return' onClick={() => {
        const name = sessionStorage.getItem("playerName");
        sessionStorage.clear();
        sessionStorage.setItem("playerName", name);
        navigate("/ListaPartidas");
      }} >
        Volver
      </button>
    </div>
  );
}

export default Winner;
