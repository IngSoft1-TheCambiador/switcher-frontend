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

  const [playerName, setPlayerName] = useState();
  const [socketId, setSocketId] = useState(-1);
  const [gameId, setGameId] = useState(0);
  const [clientId, setClientId] = useState(180);

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
    if (socketId === -1 && lastJsonMessage !== null && lastJsonMessage.socketId !== null && lastJsonMessage.socketId !== undefined) {
      setSocketId(lastJsonMessage.socketId);
    }
  }, [lastJsonMessage]);

  function handleNewPlayer(clientId, gameId) {
    setClientId(clientId);
    setGameId(gameId);
  }

  return (
    <AppContext.Provider value={{ playerName, socketId, lastMessage, handleNewPlayer, clientId, gameId }}>
      <div className="app-container">
        <Route path="/">
          <Inicio onSubmit={(name) => setPlayerName(name)} />
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