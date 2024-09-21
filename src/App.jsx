import React from "react";
import Tablero from "./components/Tablero";
import "./index.css";

const datos = Array.from({ length: 36 }, (v, i) => ({
  id: i,
  color: ["bg-blue-500", "bg-red-500", "bg-green-500", "bg-yellow-500"][i % 4], // Alterno colores
}));

function App() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Tablero datos={datos} />
    </div>
  );
}

export default App;
