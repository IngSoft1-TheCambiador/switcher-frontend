import React, { useContext, useState } from 'react';
import { AppContext } from '../contexts/Context';
import '../index.css';
import './GamesList.css';

function GameRow({ gameName, minPlayers, maxPlayers }) {
  return (
    <div>
      <div>{gameName}</div>
      <div>{minPlayers}</div>
      <div>{maxPlayers}</div>
    </div>

  );
}

function GamesList() {
  const { game } = useContext(AppContext);
  const games = game.gamesList;

  return (
    <div className="container-General">
      <h2>EL SWITCHER</h2>
      <div className="container-GamesList">
        <div>
          <div>Partida</div>
          <div>Min</div>
          <div>Max</div>
        </div>
          { games.map( (game) => <GameRow key={game.gameName} {...game} />) }
        <div>
          <div>⬅️</div>
          <div>➡️</div>
        </div>
      </div>
    </div>
  );
}

export default GamesList;
