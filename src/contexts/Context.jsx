import React, { useState, useEffect } from "react";
import useWebSocket, { ReadyState } from 'react-use-websocket';

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
    socketId: null,
    gameId: 0,
    playerName: '',
    gameName: '',
    gamesList: [{ "gameName": "lala", "minPlayers": 2, "maxPlayers": 4 }],
    fichas: Array.from({ length: 36 }, (v, i) => ({ id: i, color: ["blue", "red", "green", "yellow"][i % 4] })),
    jugadores: ejemplo_jugadores,
    jugadorActual: ejemplo_jugadorActual,

  });

  const socketUrl = "ws://localhost:8000/ws/connect";
  const { sendMessage, lastMessage, readyState, lastJsonMessage } = useWebSocket(socketUrl);

  return (
    <AppContext.Provider value={{ game, setGame, lastMessage, readyState, lastJsonMessage  }} >
      {children}
    </AppContext.Provider>
  );
};