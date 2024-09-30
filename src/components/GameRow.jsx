import React, { useContext } from 'react';
import { AppContext } from '../contexts/Context';
import { useLocation } from 'wouter';
import '../index.css';
import './GameRow.css';
import { POST, httpRequest } from '../services/HTTPServices.jsx';

function GameRow({ gameID, gameName, minPlayers, maxPlayers}) {
  const [, navigate] = useLocation();
  const { game, setGame } = useContext(AppContext);

  const handleResponse = (result) => {
    console.log("response:",result);
    if (result.json.error === undefined) {
      setGame({ ...game, playerId: result.json.player_id });
      setGame({ ...game, gameId: result.json.game_id });
      navigate('/Sala');
    }
  };

  const joinGame = async () => {
    const requestData = {
      "method": POST,
      "service": `join_game/?game_id=${gameID}&player_name=${game.playerName}`
    }; 
    await httpRequest(requestData).then(handleResponse);
  };
  
  return (
    <div>
      <div className="game-button" onClick={joinGame}>{gameName}</div>
      <div>{minPlayers}</div>
      <div>{maxPlayers}</div>
    </div>
  );
}

export default GameRow;