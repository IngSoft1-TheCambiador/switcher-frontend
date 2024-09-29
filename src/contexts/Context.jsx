import React, { useState, useEffect } from "react";

export const AppContext = React.createContext({});

const AppProvider = ({ children }) => {
  const [gameId, setGameId] = useState(0);
  const [playerName, setPlayerName] = useState("");
  const [gamesList, setGamesList] = useState([{ "gameName": "lala", "minPlayers": 2, "maxPlayers": 4 }]);
  const [fichas, setFichas] = useState(Array.from({ length: 36 }, (v, i) => ({
    id: i,
    color: ["blue", "red", "green", "yellow"][i % 4], // Alterno colores
  })));
  const [jugadores, setJugadores] = useState([
    {
      nombre: "Jugador 1",
      color: "blue",
      figuras: [
        { imagen: "/images/fig1.png" },
        { imagen: "/images/fig2.png" },
        { imagen: "/images/fig3.png" }
      ]
    },
    {
      nombre: "Jugador 2",
      color: "red",
      figuras: [
        { imagen: "/images/fig1.png" },
        { imagen: "/images/fig2.png" },
        { imagen: "/images/fig2.png" }
      ]
    },
    {
      nombre: "Jugador 3",
      color: "green",
      figuras: [
        { imagen: "/images/fig2.png" },
        { imagen: "/images/fig1.png" },
        { imagen: "/images/fig3.png" }
      ]
    },
  ]);
  const [jugadorActual, setJugadorActual] = useState({
    nombre: "Jasds",
    figuras: [
      { imagen: "/images/fig1.png" },
      { imagen: "/images/fig2.png" },
      { imagen: "/images/fig3.png" }
    ],
    movimientos: [
      { imagen: "/images/mov1.png" },
      { imagen: "/images/mov2.png" },
      { imagen: "/images/mov3.png" }
    ]
  });

  return (
    <AppContext.Provider
      value={{
        gameId,
        setGameId,
        playerName,
        setPlayerName,
        gamesList,
        setGamesList,
        fichas,
        setFichas,
        jugadores,
        setJugadores,
        jugadorActual,
        setJugadorActual
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
