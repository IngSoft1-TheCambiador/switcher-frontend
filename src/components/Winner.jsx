import React, { useContext } from 'react';
import { useLocation } from 'wouter';
import { GameContext } from './GameLayout.jsx';
import "./Winner.css";

function Winner() {
  const [, navigate] = useLocation();
  // const { winner } = useContext(GameContext);
  const winner = "Pedro";

  return (
    <div className="container-winner" >
      <h1>
        ¡{winner} ganó la partida!
      </h1>
      <button className='return-button'>
        <img src="return.png" alt="Volver" className="button-icon" />
      </button>
    </div>
  );
}

export default Winner;
