import React, { useState, useEffect } from "react";

export const AppContext = React.createContext({});

export const AppProvider = ({ children }) => {
  const [game, setGame] = useState({
    gameId: 0,
    playerName: '',
    gameName: ''
  });
  const [ gamesList, setGamesList ] = useState([{"gameID" : 0, "gameName" : "lala", "minPlayers" : 2, "maxPlayers" : 4}]);

  return (
    <AppContext.Provider
      value={{ game, setGame, gamesList, setGamesList }} >
      {children}
    </AppContext.Provider>
  );
};