import React, { useState, useEffect } from "react";
import useWebSocket, { ReadyState } from 'react-use-websocket';

export const AppContext = React.createContext({});

export const AppProvider = ({ children }) => {

  const socketUrl = "ws://localhost:8000/ws/connect"

  const [game, setGame] = useState({
    gameId: 0,
    playerName: '',
    gameName: ''
  });
  const [ gamesList, setGamesList ] = useState([{"gameName" : "lala", "minPlayers" : 2, "maxPlayers" : 4}]);
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  return (
    <AppContext.Provider
      value={{ game, setGame, gamesList, setGamesList, lastMessage, readyState }} >
      {children}
    </AppContext.Provider>
  );
};
