import React, { useState, useEffect } from 'react';
import './App.css';
import './index.css';
import Inicio from './components/Inicio';
import ListaPartidas from './components/ListaPartidas';
import WaitRoom from './components/WaitRoom';
import GamesList from './components/GamesList';
import CrearPartida from './components/CrearPartida';
import GameLayout from './components/GameLayout';
import { Route } from "wouter";
import GameRow from './components/GameRow';
import useWebSocket from 'react-use-websocket';

export const AppContext = React.createContext();

function App() {

  const [playerName, setPlayerName] = useState();
  const [socketId, setSocketId] = useState(0);
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
    if (lastJsonMessage !== null && lastJsonMessage.socketId !== null && lastJsonMessage.socketId !== undefined) {
      setSocketId(lastJsonMessage.socketId);
    }
  }, [lastJsonMessage]);

  function handleNewPlayer(id) {
    setClientId(id);
  }

  return (
    <AppContext.Provider value={{ playerName, socketId, lastMessage, handleNewPlayer, clientId }}>
      <div className="app-container">
        <Route path="/">
          <Inicio onSubmit={(name) => setPlayerName(name)} />
        </Route>
        <Route path="/ListaPartidas">
          <ListaPartidas />
        </Route>
        <Route path="/Sala">
          <WaitRoom />
        </Route>
        <Route path="/GamesLayout">
          <GameLayout />
        </Route>
        <Route path="/CrearPartida">
          <CrearPartida />
        </Route>
        <Route path="/GamesList">
          <GamesList />
        </Route>
        <Route path="/GameRow">
          <GameRow />
        </Route>
      </div>
    </AppContext.Provider>
  );
}

export default App;