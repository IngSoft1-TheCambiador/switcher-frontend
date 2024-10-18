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
  const [searchGame, setSearchGame] = useState("");
  const [searchMin, setSearchMin] = useState(0);
  const [searchMax, setSearchMax] = useState(0);

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
      if(page == 1 || response.json.games_list.length != 0){
        setGames(response.json.games_list);
        setPage(page);
      }
      else {
        getGames(page-1);
      }
    }
  }

  return (
    <div className="container-General">
      <div className='h1-gamesList '>EL SWITCHER</div>
      <div className="container-GamesList">
        <div>
          <div>Partida</div>
          <div>Min</div>
          <div>Max</div>
        </div>
        <form onSubmit={(e) => console.log("submited: ", searchGame)}>
          <input
            placeholder='Nombre'
            value={searchGame}
            onChange={e => setSearchGame(e.target.value)} />
          <input
            placeholder='Min'
            value={searchMin}
            onChange={e => setSearchMin(e.target.value)} />
          <input
            placeholder='Max'
            value={searchMax}
            onChange={e => setSearchMax(e.target.value)} />
        </form>
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
