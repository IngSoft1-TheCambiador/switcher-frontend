import React, { useContext, useEffect, useState } from 'react';
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
  const [page, setPage] = useState(1);

  async function getGames(page) {

    if (page > 0) {
      const requestData = {
        "method": GET,
        "service": `list_games?page=${page}`
      };

      const response = await httpRequest(requestData);
      console.log("response: ", response.json.games_list);
      setGamesList(response.json.games_list);
      setPage(page);
    }
  }

  useEffect(() => {
    getGames(page);
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
        <div className='container-Botones'>
          <button className='left' onClick={() => getGames(page - 1)}>⬅️</button>
          <button className='right' onClick={() => getGames(page + 1)}>➡️</button>
        </div>
      </div>
    </div>
  );
}

export default GamesList;
