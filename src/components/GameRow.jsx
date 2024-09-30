import React, { useContext } from 'react';
import { AppContext } from '../contexts/Context';
import { useLocation } from 'wouter';
import '../index.css';
import './GameRow.css';
import { POST, httpRequest } from '../services/HTTPServices.jsx';

function GameRow({ gameID, gameName, minPlayers, maxPlayers}) {
    const [, navigate] = useLocation();
    const { game, setGame } = useContext(AppContext);
  
    async function joinGame_request () {
      const requestData = {
        "method": POST,
        "service": `join_game/?game_id=${gameID}&player_name=${game.playerName}`
      }; 
    
      const response = await httpRequest(requestData);
      console.log("response: ", response.json.game_id);
      return response;
    }
    
    const joinGame = () => {
      const response = joinGame_request();
      setGame({ ...game, playerId: response.player_id });
      setGame({ ...game, gameId: response.game_id });
      navigate('/Sala');
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