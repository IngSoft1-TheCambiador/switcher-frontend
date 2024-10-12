import React, { useContext } from 'react';
import { AppContext } from '../App.jsx';
import { useLocation } from 'wouter';
import '../index.css';
import './GameRow.css';
import { POST, httpRequest } from '../services/HTTPServices.jsx';

function GameRow({ gameID, gameName, minPlayers, maxPlayers }) {
  const [, navigate] = useLocation();
  const { socketId, playerName, handleNewPlayer } = useContext(AppContext);

  const handleResponse = (response) => {
    console.log("result: ", response);
    console.log(response);
    if (response.json.error === undefined) {
      handleNewPlayer(response.json.player_id, gameID);
      navigate('/WaitRoom');
    }
  };

  const joinGame = async () => {
    const requestData = {
      "method": POST,
      "service": `join_game/?socket_id=${socketId}&game_id=${gameID}&player_name=${playerName}`
    };
    await httpRequest(requestData).then(handleResponse);
  };

  // async function joinGame_request () {
  //   const requestData = {
  //     "method": POST,
  //     "service": `join_game/?game_id=${gameID}&player_name=${game.playerName}`
  //   }; 

  //   const response = await httpRequest(requestData);
  //   console.log("response: ", response.json.game_id);
  //   return response;
  // }

  // const joinGame = () => {
  //   const response = joinGame_request();
  //   console.log(response)
  //   setGame({ ...game, playerId: response.player_id });
  //   setGame({ ...game, gameId: response.game_id });
  //   navigate('/WaitRoom');
  // };

  return (
    <div>
      <div className="game-button" onClick={joinGame}>{gameName}</div>
      <div>{minPlayers}</div>
      <div>{maxPlayers}</div>
    </div>
  );
}

export default GameRow;