import React, { useState, useEffect } from "react";
import useWebSocket, { ReadyState } from 'react-use-websocket';

export const AppContext = React.createContext({});

export const AppProvider = ({ children }) => {

  const socketUrl = "ws://localhost:8000/ws/connect"

  const [game, setGame] = useState({
    playerId: null,
    playerName: '',
    gameId: null,
    gameName: '',
    gamesList: []
  });

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  return (
    <AppContext.Provider
      value={{ game, setGame, lastMessage, readyState }} >
      {children}
    </AppContext.Provider>
  );
};