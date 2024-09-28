import React, { useState, useEffect } from "react";

export const AppContext = React.createContext({});

const AppProvider = ({children}) => {
    const [ gameId, setGameId ] = useState(0);
    const [ playerName, setPlayerName ] = useState("");
    const [ gamesList, setGamesList ] = useState([{"gameName" : "lala", "minPlayers" : 2, "maxPlayers" : 4}]);

    return (
        <AppContext.Provider 
          value={{
            gameId,
            setGameId,
            playerName,
            setPlayerName,
            gamesList,
            setGamesList
          }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
