import React, { useContext } from 'react';
import { AppContext } from '../App.jsx';
import { useLocation } from 'wouter';
import '../index.css';
import './GameRow.css';
import { POST, httpRequest } from '../services/HTTPServices.jsx';

function GameRow({ gameID, gameName, minPlayers, maxPlayers }) {
  const [, navigate] = useLocation();
  const { socketId, playerName, handleNewPlayer } = useContext(AppContext);

  const joinGame = async () => {
    const requestData = {
      "method": POST,
      "service": `join_game/?socket_id=${socketId}&game_id=${gameID}&player_name=${playerName}`
    };
    const response = await httpRequest(requestData);
    if (response.json.response_status == 0) {
      handleNewPlayer(response.json.player_id, gameID);
      navigate('/WaitRoom');
    }
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