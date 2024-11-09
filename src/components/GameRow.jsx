import React, { useContext, useState } from 'react';
import { AppContext } from '../App.jsx';
import { useLocation } from 'wouter';
import '../index.css';
import './GameRow.css';
import { POST, httpRequest } from '../services/HTTPServices.jsx';

function GameRow({ gameID, gameName, minPlayers, maxPlayers }) {
  const [, navigate] = useLocation();
  const { socketId, playerName, handleNewPlayer } = useContext(AppContext);
  const [password, setPassword] = useState('');

  const joinGame = async () => {
    const requestData = {
      "method": POST,
      "service": `join_game/?socket_id=${socketId}&game_id=${gameID}&player_name=${playerName}&password=${password}`
    };
    const response = await httpRequest(requestData);
    if (response.json.response_status == 0) {
      handleNewPlayer(response.json.player_id, gameID);
      navigate('/WaitRoom');
    } else {
      alert('Contraseña incorrecta o error al unirse a la partida');
    }
  };

  return (
    <div className='row-wrapper'>
      <div className="game-button" onClick={joinGame}>{gameName}</div>
      <div>{minPlayers}</div>
      <div>{maxPlayers}</div>
      <input
        type="password"
        placeholder="Contraseña (opcional)"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
    </div>
  );
}

export default GameRow;