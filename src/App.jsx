import React from "react";
import "./App.css";
import GameLayout from "./components/GameLayout";

const datos = Array.from({ length: 36 }, (v, i) => ({
  id: i,
  color: ["blue", "red", "green", "yellow"][i % 4], // Alterno colores
}));

const jugadores = [
  {
    nombre: "lalala",
    figuras: [
      { imagen: "/images/fig1.png" },
      { imagen: "/images/fig2.png" },
      { imagen: "/images/fig3.png" },
    ],
  },
  {
    nombre: "zzzz",
    figuras: [
      { imagen: "/images/fig1.png" },
      { imagen: "/images/fig2.png" },
      { imagen: "/images/fig2.png" },
    ],
  },
  {
    nombre: "adsadsads",
    figuras: [
      { imagen: "/images/fig2.png" },
      { imagen: "/images/fig1.png" },
      { imagen: "/images/fig3.png" },
    ],
  },
];

const jugadorActual = {
  nombre: "Jasds",
  figuras: [
    { imagen: "/images/fig1.png" },
    { imagen: "/images/fig2.png" },
    { imagen: "/images/fig3.png" },
  ],
  movimientos: [
    { imagen: "/images/mov1.png" },
    { imagen: "/images/mov2.png" },
    { imagen: "/images/mov3.png" },
  ],
};

function App() {
  return (
    <div className="app-container">
      <GameLayout
        datos={datos}
        jugadores={jugadores}
        jugadorActual={jugadorActual}
      />
    </div>
  );
}

export default App;
