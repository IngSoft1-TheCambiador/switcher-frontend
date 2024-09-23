import React from "react";
import Tablero from "./components/Tablero";
import "./index.css";

const datos = Array.from({ length: 36 }, (v, i) => ({
  id: i,
  color: ["blue", "red", "green", "yellow"][i % 4], // Alterno colores
}));
function App() {
  return (
    <div className>
      <Tablero datos={datos} />
    </div>
  );
}

export default App;
