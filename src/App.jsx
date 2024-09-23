import React from "react";
import "./App.css";
import GameLayout from "./components/GameLayout";

const datos = Array.from({ length: 36 }, (v, i) => ({
  id: i,
  color: ["blue", "red", "green", "yellow"][i % 4], // Alterno colores
}));

function App() {
  return (
    <div className='app-container'>
      <GameLayout datos={datos}/>
    </div>
  );
}

export default App;
