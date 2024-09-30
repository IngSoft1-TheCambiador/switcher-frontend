import React, { useContext, useState } from 'react';
import { AppContext } from '../contexts/Context';
import { useLocation } from 'wouter';
import './CrearPartida.css';
import { PUT, httpRequest } from '../services/HTTPServices.jsx';

function CrearPartida() {
  const [tempGameName, setTempGameName] = useState('');
  const [min, setMin] = useState(2);
  const [max, setMax] = useState(4);
  const { game, setGame } = useContext(AppContext);
  const [, navigate] = useLocation();

  const handleResponse = (result) => {
    console.log("response:",result);
    if (result.json.game_id !== undefined) {
      navigate('/Sala');
    }
  };

  async function createGame(gameName, playerName, minPlayers, maxPlayers) {
    const requestData = {
      "method": PUT,
      "service": `create_game/?game_name=${gameName}&player_name=${playerName}&min_players=${minPlayers}&max_players=${maxPlayers}`
    };
    console.log(requestData);
    await httpRequest(requestData).then(handleResponse);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const min_int = parseInt(min);
    const max_int = parseInt(max);

    if (/^[a-zA-Z0-9]{1,15}$/.test(tempGameName) &&
      min_int <= max_int && min_int >= 2 && max_int <= 4) {
      setGame({ ...game, gameName: tempGameName });
      createGame(tempGameName, game.playerName, min_int, max_int);
    }

    // Invalid name: display a help message
    else {
      if (tempGameName != "") {
        document.getElementById("invalid-game-name").style.display = 'block';
      }
      if (min != "" && max != "" &&
        ((isNaN(min) || isNaN(max)) || !(min_int <= max_int && min_int >= 2 && max_int <= 4))) {
        document.getElementById("invalid-range").style.display = 'block';
      }
    }
  };

  return (
    <div className="container-crearP">
      <h2>Crear Partida</h2>
      <form onSubmit={handleSubmit}>
        <h3>Nombre de la partida</h3>
        <input
          placeholder='Nombre'
          value={tempGameName}
          onChange={e => setTempGameName(e.target.value)} />
        <div
          className="infoLabel-crearP"
          id="invalid-game-name" >
          Ingrese un nombre alfanumerico de hasta 15 caracteres
        </div>
        <h3>Rango de jugadores</h3>
        <input
          placeholder='Mínimo'
          value={min}
          onChange={e => setMin(e.target.value)} />
        <input
          placeholder='Máximo'
          value={max}
          onChange={e => setMax(e.target.value)} />
        <div
          className="infoLabel-crearP"
          id="invalid-range" >
          Ingrese 2, 3 o 4
        </div>
        <button
          className="button">
          Continuar
        </button>
      </form>
    </div>
  );
}

export default CrearPartida;