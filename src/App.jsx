import React, { useState, useEffect } from 'react';
import './App.css';
import './index.css';
import Inicio from './components/Inicio';
import ListaPartidas from './components/ListaPartidas';
import WaitRoom from './components/WaitRoom';
import GamesList from './components/GamesList';
import GameLayout from './components/GameLayout';
import { Route } from "wouter";
import GameRow from './components/GameRow';
import Winner from './components/Winner';
import useWebSocket from 'react-use-websocket';
import { GET, PUT, httpRequest } from "./services/HTTPServices";

export const AppContext = React.createContext();

function App() {

  const [playerName, setPlayerName] = useState(() => {
    const savedName = sessionStorage.getItem("playerName");
    return savedName ? savedName : "";
  });

  const [socketId, setSocketId] = useState(-1);
  const [seconds, setSeconds] = useState(120);

  const [gameId, setGameId] = useState(() => {
    const saved = parseInt(sessionStorage.getItem("gameId"));
    return saved ? saved : -1;
  });

  const [clientId, setClientId] = useState(() => {
    const saved = parseInt(sessionStorage.getItem("clientId"));
    return saved ? saved : -1;
  });

  const socketUrl = "ws://localhost:8000/ws/connect";
  const { lastMessage, lastJsonMessage } = useWebSocket(
    socketUrl,
    {
      shouldReconnect: (closeEvent) => {
        true
      },

      retryOnError: true
    });

  useEffect(() => {

    const handleRelink = async (socketId) => {
      const requestData = {
        "method": PUT,
        "service": `relink_to_game?socket_id=${socketId}&game_id=${gameId}`
      };
      const response = await httpRequest(requestData);
    }

    const getTime = async () => {
      const requestData = {
        method: GET,
        service: `get_current_time?game_id=${gameId}`,
      };

      const response = await httpRequest(requestData);
      setSeconds(response.json.current_time);
    }

    if (lastJsonMessage !== null && lastJsonMessage.socketId !== null && lastJsonMessage.socketId !== undefined) {
      setSocketId(lastJsonMessage.socketId);
      if (sessionStorage.getItem("clientId") !== null && sessionStorage.getItem("gameId") !== null) {
        console.log("SHOULD RECONNECT")
        console.log(gameId);
        console.log(clientId);
        getTime();
        handleRelink(lastJsonMessage.socketId);
      }
    }
  }, [lastJsonMessage]);

  function handleNewPlayer(newClientId, newGameId) {
    sessionStorage.setItem("clientId", newClientId);
    sessionStorage.setItem("gameId", newGameId);
    setClientId(newClientId);
    setGameId(newGameId);
  }

  return (
    <AppContext.Provider value={{ playerName, socketId, lastMessage, handleNewPlayer, clientId, gameId, seconds, setSeconds }}>
      <div className="app-container">
        <Route path="/">
          <Inicio onSubmit={(name) => { setPlayerName(name); sessionStorage.setItem("playerName", name) }} />
        </Route>
        <Route path="/ListaPartidas">
          <ListaPartidas />
        </Route>
        <Route path="/WaitRoom">
          <WaitRoom />
        </Route>
        <Route path="/GameLayout">
          <GameLayout />
        </Route>
        <Route path="/GamesList">
          <GamesList />
        </Route>
        <Route path="/GameRow">
          <GameRow />
        </Route>
        <Route path="/Winner">
          <Winner />
        </Route>
      </div>
    </AppContext.Provider>
  );
}

export default App;