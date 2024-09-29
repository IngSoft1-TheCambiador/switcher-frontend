import React, { useContext, useEffect } from 'react';
import { AppContext } from '../contexts/Context';
import '../index.css';
import './GamesList.css';
import { GET, httpRequest } from '../services/HTTPServices.jsx';

const joinGame = () => {
  console.log("aaa");
};

function GameRow({ gameID, gameName, minPlayers, maxPlayers }) {
  return (
    <div onClick={joinGame}>
      <div>{gameName}</div>
      <div>{minPlayers}</div>
      <div>{maxPlayers}</div>
    </div>
  );
}

function GamesList() {
  const { gamesList, setGamesList } = useContext(AppContext);

  async function getGames() {

    const requestData = {
      "method": GET,
      "service": "list_games"
    };

    const response = await httpRequest(requestData);
    console.log("response: ", response.json.games_list);
    setGamesList(response.json.games_list);
  }

  useEffect(() => {
    getGames();
  }
    , []);

  return (
    <div className="container-General">
      <h2>EL SWITCHER</h2>
      <div className="container-GamesList">
        <div>
          <div>Partida</div>
          <div>Min</div>
          <div>Max</div>
        </div>
        {gamesList.map(({ gameID, game_name, min_players, max_players }) => <GameRow gameID={gameID} gameName={game_name} minPlayers={min_players} maxPlayers={max_players} />)}
        <div>
          <div>⬅️</div>
          <div>➡️</div>
        </div>
      </div>
    </div>
  );
}

export default GamesList;
