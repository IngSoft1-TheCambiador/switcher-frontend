import React, { useState, useEffect } from "react";

export const AppContext = React.createContext({});

export const AppProvider = ({ children }) => {
  const [game, setGame] = useState({
    playerId: null,
    playerName: '',
    gameId: null,
    gameName: '',
    gamesList: [],
    lastMessage: ''
  });

  return (
    <AppContext.Provider
      value={{ game, setGame }} >
      {children}
    </AppContext.Provider>
  );
};