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
  const [searchMin, setSearchMin] = useState("");
  const [searchMax, setSearchMax] = useState("");
  const [lastSearch, setLastSearch] = useState({ game_name: "", min: "", max: "" });

  useEffect(() => {
    getGames(page);
  }, [lastMessage]);

  async function getGames(
    page,
    game_name = lastSearch.game_name,
    min = lastSearch.min,
    max = lastSearch.max
  ) {

    if (page > 0) {
      const requestData = {
        "method": GET,
        "service": `search_games?page=${page}&text=${game_name}&min=${min}&max=${max}`
      };

      const response = await httpRequest(requestData);
      if (response.json.response_status == 0) {
        document.getElementById("invalid-search").style.display = 'none';
        if (page == 1 || response.json.games_list.length != 0) {
          setGames(response.json.games_list);
          setPage(page);
        }
        else {
          getGames(page - 1);
        }
      }
      else {
        document.getElementById("invalid-search").style.display = 'block';
      }
    }
  }

  const filterList = (e) => {
    e.preventDefault(); // Prevents page reload
    getGames(page, searchGame, searchMin, searchMax);
    setLastSearch({
      game_name: searchGame,
      min: searchMin,
      max: searchMax
    });
  };

  return (
    <div className="container-General">
      <div>
        <div className='h1-gamesList '>EL SWITCHER</div>
      </div>
      <div className="container-GamesList">
        <div>
          <div>Buscar partida</div>
          
        </div>
        <form onSubmit={filterList}>
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
          <button type="submit" style={{ display: 'none' }} aria-hidden="true" />
        </form>
        <div
          className="infoLabel-GamesList"
          id="invalid-search" >
          Datos de busqueda inválidos
        </div>
        {games.map(({ game_id, game_name, min_players, max_players }) =>
          <GameRow key={game_id} gameID={game_id} gameName={game_name}
            minPlayers={min_players} maxPlayers={max_players} />)}
        <div className='container-Botones'>
          <div onClick={() => getGames(page - 1)}>
            <img src="arrowL.png" alt="Abandonar Partida" class='arrow-img' />
          </div>
          <div onClick={() => getGames(page + 1)}>
            <img src="arrowR.png" alt="Abandonar Partida" class='arrow-img' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GamesList;
