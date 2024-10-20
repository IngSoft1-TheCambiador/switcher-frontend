import React, { useContext, useEffect, useState, useRef } from 'react';
import { AppContext } from '../App.jsx';
import { useLocation } from 'wouter';
import './CrearPartida.css';
import { PUT, httpRequest } from '../services/HTTPServices.jsx';

function CrearPartida() {
  const [tempGameName, setTempGameName] = useState('');
  const [min, setMin] = useState(2);
  const [max, setMax] = useState(4);
  const { playerName, socketId, handleNewPlayer } = useContext(AppContext);
  const [, navigate] = useLocation();

  async function createGame(minPlayers, maxPlayers) {
    const requestData = {
      "method": PUT,
      "service": `create_game/?socket_id=${socketId}&game_name=${tempGameName}&player_name=${playerName}&min_players=${minPlayers}&max_players=${maxPlayers}`
    };

    const response = await httpRequest(requestData);
    handleNewPlayer(response.json.player_id, response.json.game_id);
    navigate('/WaitRoom');
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const min_int = parseInt(min);
    const max_int = parseInt(max);

    if (/^[a-zA-Z0-9]{1,15}$/.test(tempGameName) &&
      min_int <= max_int && min_int >= 2 && max_int <= 4) {
      //setGame({ ...game, gameName: tempGameName });
      createGame(min_int, max_int);
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
      <h1>Crear partida</h1>
      <form onSubmit={handleSubmit}>
        <h3>Nombre</h3>
        <input
          value={tempGameName}
          onChange={e => setTempGameName(e.target.value)} />
        <div
          className="infoLabel-crearP"
          id="invalid-game-name" >
          Ingrese un nombre alfanumerico de hasta 15 caracteres
        </div>
        <h3>Máximo</h3>
        <input
          value={min}
          onChange={e => setMin(e.target.value)} />
        <h3>Mínimo</h3>
        <input
          value={max}
          onChange={e => setMax(e.target.value)} />
        <div
          className="infoLabel-crearP"
          id="invalid-range" >
          Ingrese 2, 3 o 4
        </div>
        <button
          className="button-yellow">
          Crear
        </button>
      </form>
    </div>
  );
}

export default CrearPartida;