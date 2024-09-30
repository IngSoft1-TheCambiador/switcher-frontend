import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../contexts/Context';
import GameRow from './GameRow';
import '../index.css';
import './GamesList.css';
import { GET, httpRequest } from '../services/HTTPServices.jsx';

function GamesList() {
  const { game, setGame, lastMessage } = useContext(AppContext);
  const [page, setPage] = useState(1);

  const handleResponse = (result) => {
    console.log("response:",result);
    if(result.json.games_list.length > 0){
      setGame({ ...game, gamesList: result.json.games_list });
      setPage(page);
    }
  };

  async function getGames(page) {
    if (page > 0) {
      const requestData = {
        "method": GET,
        "service": `list_games?page=${page}`
      };
      await httpRequest(requestData).then(handleResponse);
    }
  };

  useEffect(() => {
      getGames(page);
    }
  , [lastMessage]);

  return (
    <div className="container-General">
      <h2>EL SWITCHER</h2>
      <div className="container-GamesList">
        <div>
          <div>Partida</div>
          <div>Min</div>
          <div>Max</div>
        </div>
        {game.gamesList.map(({ game_id, game_name, min_players, max_players}) =>
          <GameRow gameID={game_id} gameName={game_name}
                   minPlayers={min_players} maxPlayers={max_players} />)}
        <div className='container-Botones'>
          <div onClick={() => getGames(page - 1)}>⬅️</div>
          <div onClick={() => getGames(page + 1)}>➡️</div>
        </div>
      </div>
    </div>
  );
}

export default GamesList;
