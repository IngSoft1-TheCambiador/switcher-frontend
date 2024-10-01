import React, { useState, useEffect } from "react";

export const AppContext = React.createContext({});

export const AppProvider = ({ children }) => {

  const ejemplo_jugadores = [
    {
      nombre: "Jugador 1",
      color: "blue",
      figuras: [
        { imagen: "/images/fig02.svg" },
        { imagen: "/images/fig03.svg" },
        { imagen: "/images/fig03.svg" }
      ]
    },
    {
      nombre: "Jugador 2",
      color: "red",
      figuras: [
        { imagen: "/images/fig01.svg" },
        { imagen: "/images/fig02.svg" },
        { imagen: "/images/fig02.svg" }
      ]
    },
    {
      nombre: "Jugador 3",
      color: "green",
      figuras: [
        { imagen: "/images/fig02.svg" },
        { imagen: "/images/fig01.svg" },
        { imagen: "/images/fig03.svg" }
      ]
    },
  ];

  const ejemplo_jugadorActual = {
    nombre: "Jasds",
    figuras: [
      { imagen: "/images/fig01.svg" },
      { imagen: "/images/fig02.svg" },
      { imagen: "/images/fig03.svg" }
    ],
    movimientos: [
      { imagen: "/images/mov1.svg" },
      { imagen: "/images/mov2.svg" },
      { imagen: "/images/mov3.svg" }
    ]
  };

  const [game, setGame] = useState({
    playerId: null,
    playerName: '',
<<<<<<< HEAD
    gameName: '',
    gamesList: [{ "gameName": "lala", "minPlayers": 2, "maxPlayers": 4 }],
    fichas: Array.from({ length: 36 }, (v, i) => ({ id: i, color: ["blue", "red", "green", "yellow"][i % 4] })),
    jugadores: ejemplo_jugadores,
    jugadorActual: ejemplo_jugadorActual,

  });

  return (
    <AppContext.Provider value={{ game, setGame }} >
=======
    gameId: null,
    gameName: '',
    gamesList: [],
    ownerId: null,
    playersList: []
  });

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
  
  const [ gameId, setGameId ] = useState(null);

  return (
    <AppContext.Provider
      value={{ game, setGame, lastMessage, readyState, gameId, setGameId }} >
>>>>>>> origin/Entrega-1
      {children}
    </AppContext.Provider>
  );
};