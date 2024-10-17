import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App.jsx';
import GameRow from './GameRow';
import '../index.css';
import './GamesList.css';
import { GET, httpRequest } from '../services/HTTPServices.jsx';

function GamesList() {
  const [games, setGames] = useState([]);
  const { lastMessage, clientId } = useContext(AppContext);
  const [page, setPage] = useState(1);

  useEffect(() => {
    console.log("WS: ", lastMessage.data);
    getGames(page);
  }, [lastMessage]);

  async function getGames(page) {

    if (page > 0) {
      const requestData = {
        "method": GET,
        "service": `list_games?player_id=${clientId}&page=${page}`
      };

      const response = await httpRequest(requestData);
      console.log("response: ", response.json.games_list);
      if(response.json.games_list.length != 0){
        setGames(response.json.games_list);
        setPage(page);
      }
    }
  }

  return (
    <div className="container-General">
      <h2>EL SWITCHER</h2>
      <div className="container-GamesList">
        <div>
          <div>Partida</div>
          <div>Min</div>
          <div>Max</div>
        </div>
        {games.map(({ game_id, game_name, min_players, max_players }) =>
          <GameRow key={game_id} gameID={game_id} gameName={game_name}
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
