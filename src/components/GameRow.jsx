import React, { useContext, useState } from 'react';
import { AppContext } from '../App.jsx';
import { useLocation } from 'wouter';
import '../index.css';
import './GameRow.css';
import { POST, httpRequest } from '../services/HTTPServices.jsx';

function GameRow({ gameID, gameName, minPlayers, maxPlayers, isPrivate }) {
  const [, navigate] = useLocation();
  const { socketId, playerName, handleNewPlayer } = useContext(AppContext);
  const [password, setPassword] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const joinGame = async () => {
    const requestData = {
      "method": POST,
      "service": `join_game/?socket_id=${socketId}&game_id=${gameID}&player_name=${playerName}&password=${password}`
    };
    const response = await httpRequest(requestData);
    if (response.json.response_status == 0) {
      handleNewPlayer(response.json.player_id, gameID);
      navigate('/WaitRoom');
    } else {
      alert('Contraseña incorrecta o error al unirse a la partida');
    }
  };

  const handleJoinClick = () => {
    if (isPrivate) {
      setShowPopup(true);
    } else {
      joinGame();
    }
  };

  const handlePopupSubmit = (e) => {
    e.preventDefault();
    setShowPopup(false);
    joinGame();
  };

  return (
    <div className='row-wrapper'>
      <div className="game-button" onClick={handleJoinClick}>
        {gameName}
      </div>
      {/*isPrivate && <div className="private-indicator">P</div> Falta mostrar de alguna forma que es privada*/}
      <div>{minPlayers}</div>
      <div>{maxPlayers}</div>
      {showPopup && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Ingrese la contraseña</h2>
            <form onSubmit={handlePopupSubmit}>
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button type="submit">Unirse</button>
              <button type="button" onClick={() => setShowPopup(false)}>Cancelar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default GameRow;