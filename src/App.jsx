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

export const AppContext = React.createContext();

function App() {

  const [playerName, setPlayerName] = useState(() => {
    const savedName = sessionStorage.getItem("playerName");
    return savedName ? savedName : "";
  });

  const [socketId, setSocketId] = useState(-1);

  const [gameId, setGameId] = useState(sessionStorage.getItem("gameId"));

  const [clientId, setClientId] = useState(sessionStorage.getItem("clientId"));

  const socketUrl = "ws://localhost:8000/ws/connect";
  const { lastMessage, lastJsonMessage } = useWebSocket(
    socketUrl,
    {
      shouldReconnect: (closeEvent) => {
        true
      },
      onOpen: () => {
        if (sessionStorage.getItem("clientId") !== null && sessionStorage.getItem("gameId") !== null) {
          console.log("SHOULD RECONNECT")
          console.log(gameId);
          console.log(clientId);
        }
      },
      retryOnError: true
    });

  useEffect(() => {
    if (socketId === -1 && lastJsonMessage !== null && lastJsonMessage.socketId !== null && lastJsonMessage.socketId !== undefined) {
      setSocketId(lastJsonMessage.socketId);
    }
  }, [lastJsonMessage]);

  function handleNewPlayer(newClientId, newGameId) {
    sessionStorage.setItem("clientId", newClientId);
    sessionStorage.setItem("gameId", newGameId);
    setClientId(newClientId);
    setGameId(newGameId);
  }

  return (
    <AppContext.Provider value={{ playerName, socketId, lastMessage, handleNewPlayer, clientId, gameId }}>
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