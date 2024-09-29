import React, { useState, useEffect } from "react";

export const AppContext = React.createContext({});

export const AppProvider = ({children}) => {
    const [game, setGame] = useState ({
        gameId: 0,
        playerName: '',
        gameName: '',
        gamesList:
        [{"gameName" : "lala", "minPlayers" : 2, "maxPlayers" : 4},
         {"gameName" : "bbbbbbbbbbbbb", "minPlayers" : 4, "maxPlayers" : 4},
         {"gameName" : "lala", "minPlayers" : 2, "maxPlayers" : 4},
         {"gameName" : "bbbbbbbbbbbbb", "minPlayers" : 4, "maxPlayers" : 4},
         {"gameName" : "lala", "minPlayers" : 2, "maxPlayers" : 4},
         {"gameName" : "bbbbbbbbbbbbb", "minPlayers" : 4, "maxPlayers" : 4},
         {"gameName" : "lala", "minPlayers" : 2, "maxPlayers" : 4},
         {"gameName" : "bbbbbbbbbbbbb", "minPlayers" : 4, "maxPlayers" : 4},
        ],
    });

    return (
      <AppContext.Provider 
        value={{ game, setGame }} >
          {children}
      </AppContext.Provider>
  );
};